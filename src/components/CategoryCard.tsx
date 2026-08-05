import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
  index?: number;
  tall?: boolean;
}

export function CategoryCard({ category, index = 0, tall = false }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: Math.min(index, 5) * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/category/$slug"
        params={{ slug: category.slug }}
        className="group relative block overflow-hidden rounded-3xl bg-secondary"
      >
        <div className={tall ? "aspect-[3/4]" : "aspect-[4/3]"}>
          <img
            src={category.image}
            alt={category.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent p-5 pt-16">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-display text-xl text-primary-foreground">
                {category.name}
              </h3>
              <p className="mt-0.5 truncate text-sm text-primary-foreground/80">
                {category.tagline}
              </p>
            </div>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-background/90 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:translate-x-1">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
