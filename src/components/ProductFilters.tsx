import { Search } from "lucide-react";
import { categories } from "@/data/catalog";
import { formatINR } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FilterState {
  query: string;
  categories: string[];
  maxPrice: number;
  inStockOnly: boolean;
}

interface ProductFiltersProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  priceCeiling: number;
}

export function ProductFilters({ value, onChange, priceCeiling }: ProductFiltersProps) {
  const toggleCategory = (slug: string) => {
    onChange({
      ...value,
      categories: value.categories.includes(slug)
        ? value.categories.filter((c) => c !== slug)
        : [...value.categories, slug],
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Label htmlFor="product-search" className="eyebrow">
          Search
        </Label>
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="product-search"
            value={value.query}
            onChange={(event) => onChange({ ...value, query: event.target.value })}
            placeholder="Rocking horse, scooter…"
            className="h-11 rounded-full bg-card pl-10"
          />
        </div>
      </div>

      <div>
        <p className="eyebrow">Category</p>
        <div className="mt-3 flex flex-col gap-2.5">
          {categories.map((category) => (
            <label
              key={category.slug}
              className={cn(
                "flex cursor-pointer items-center gap-3 text-sm transition-colors",
                value.categories.includes(category.slug)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Checkbox
                checked={value.categories.includes(category.slug)}
                onCheckedChange={() => toggleCategory(category.slug)}
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow">Max price</p>
        <Slider
          className="mt-5"
          value={[value.maxPrice]}
          min={1000}
          max={priceCeiling}
          step={500}
          onValueChange={([next]) => onChange({ ...value, maxPrice: next ?? priceCeiling })}
        />
        <p className="mt-3 text-sm text-muted-foreground">Up to {formatINR(value.maxPrice)}</p>
      </div>

      <div>
        <p className="eyebrow">Availability</p>
        <label className="mt-3 flex cursor-pointer items-center gap-3 text-sm text-muted-foreground">
          <Checkbox
            checked={value.inStockOnly}
            onCheckedChange={(checked) => onChange({ ...value, inStockOnly: checked === true })}
          />
          In stock only
        </label>
      </div>

      <Button
        variant="ghost"
        className="w-fit rounded-full px-0 text-sm text-muted-foreground hover:bg-transparent hover:text-foreground"
        onClick={() =>
          onChange({ query: "", categories: [], maxPrice: priceCeiling, inStockOnly: false })
        }
      >
        Clear all filters
      </Button>
    </div>
  );
}
