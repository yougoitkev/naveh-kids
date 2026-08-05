import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const current = images[active] ?? images[0] ?? "";

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative aspect-square overflow-hidden rounded-3xl bg-secondary"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          setOrigin(`${x}% ${y}%`);
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={current}
            alt={name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ transformOrigin: origin }}
            className={cn(
              "h-full w-full object-cover transition-transform duration-500 ease-out",
              zoom ? "scale-[1.7]" : "scale-100",
            )}
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={image + index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1}`}
              className={cn(
                "h-20 w-20 overflow-hidden rounded-xl border-2 bg-secondary transition-colors",
                index === active ? "border-accent" : "border-transparent hover:border-border",
              )}
            >
              <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
