import os
import urllib.request
import json
import sys

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "qwen2.5-coder:7b"
TARGET_DIR = "./src"

def convert_code(code_content):
    prompt = (
        "Convert this TypeScript/TSX code to clean, working JavaScript/JSX code. "
        "Remove all TypeScript type annotations, interfaces, types, and generic parameters. "
        "Keep all React logic, hooks, and imports completely intact. "
        "Return ONLY the raw converted code with no markdown formatting blocks (like ```) or explanations.\n\n"
        f"{code_content}"
    )
    
    data = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False,
        "options": {
            "num_ctx": 8192,
            "temperature": 0.1
        }
    }
    
    req = urllib.request.Request(
        OLLAMA_URL,
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    try:
        # 120-second timeout per file, which is plenty for the fast 7B model
        with urllib.request.urlopen(req, timeout=120) as response:
            res = json.loads(response.read().decode('utf-8'))
            text = res.get("response", "").strip()
            if text.startswith("```"):
                text = text.split("\n", 1)[1]
            if text.endswith("```"):
                text = text.rsplit("```", 1)[0]
            return text.strip()
    except Exception as e:
        print(f"  [Error] Failed: {e}")
        return None

def main():
    if not os.path.exists(TARGET_DIR):
        print(f"Directory {TARGET_DIR} not found!")
        return

    print(f"🚀 Starting automated TS->JS conversion with {MODEL_NAME}...\n")
    
    files_to_convert = []
    for root, _, files in os.walk(TARGET_DIR):
        for file in files:
            if ".gen." in file or file.endswith(('.d.ts', '.config.ts')):
                continue
            if file.endswith(('.ts', '.tsx')):
                files_to_convert.append(os.path.join(root, file))

    total = len(files_to_convert)
    print(f"Found {total} TypeScript files to convert.\n")

    for i, old_path in enumerate(files_to_convert, 1):
        file_name = os.path.basename(old_path)
        
        if old_path.endswith('.tsx'):
            new_path = old_path[:-4] + '.jsx'
        else:
            new_path = old_path[:-3] + '.js'

        print(f"[{i}/{total}] Converting {file_name}...")
        sys.stdout.flush()

        with open(old_path, 'r', encoding='utf-8') as f:
            content = f.read()

        converted = convert_code(content)
        
        if converted:
            with open(new_path, 'w', encoding='utf-8') as f:
                f.write(converted)
            os.remove(old_path)
            print(f"  ✅ Converted successfully.")
        else:
            print(f"  ❌ Skipped (failed to convert).")
        sys.stdout.flush()

    print("\n✨ All done! Your codebase is fully converted to JavaScript.")

if __name__ == "__main__":
    main()