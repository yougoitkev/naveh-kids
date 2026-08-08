/**
 * Payment gateway seam. The real implementation will connect with Razorpay to
 * validate a user's order.
 */
export const paymentsVerification = {
  provider: "razorpay" as const,
  async verifyPaymentIntent(_orderId: string): Promise<never> {
    throw new Error("Razorpay is not connected yet. Configure the backend payment endpoint.");
  },
};

The following TypeScript/TSX code should be converted to clean, working JavaScript/JSX code without any type definitions, interfaces or generic parameters:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/** Thin fetch wrapper */
async function request(path, init) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
        ...init,
    });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return (await response.json());
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function listProducts() {
    await delay(120);
    return products;
}
```

Note that this code is not complete as the other functions do not have proper implementations in JavaScript. Also, it does not include any import statements or JSX syntax. In a real application, these would be replaced with their respective imports and JSX elements respectively.

Also note that while TypeScript can provide type checking at compile time, JavaScript uses loose typing where variables can hold values of different types without causing errors until runtime. Therefore, the above code is simplified to allow direct execution in JavaScript environment. If you intend to use this in a TypeScript project, please ensure all imports and exports are properly managed so that your code compiles smoothly.