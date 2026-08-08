function Link({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <a href={to}>
      <span>{children}</span>
    </a>
  );
} You can convert the given TypeScript/TSX code into JavaScript/JSX by removing all type definitions, interfaces, type annotations and generic parameters. However, we cannot remove the specific React components (such as `Link` or `FooterColumn`) because they are part of the React ecosystem.

Here is a cleaned-up version of your code that removes all TypeScript type declarations:

```javascript
import { Link } from "@tanstack/react-router";
import { categories } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-sm font-semibold text-accent-foreground">
              K
            </span>
            <span className="font-display text-lg">Kaaru Woodcraft</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Handcrafted wooden toys, ride-ons and furniture made in Karnataka from responsibly
            sourced Indian hardwood.
          </p>
        </div>

        <FooterColumn title="Shop">
          {categories.slice(0, 5).map((category) => (
            <Link key={category.slug} to={`/category/${category.slug}`}>
              {category.name}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Company">
          <Link to="/about">About us</Link>
          <Link to="/custom-orders">Custom orders</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </FooterColumn>

        <FooterColumn title="Visit">
          <span>The Workshop, 14 Mill Road</span>
          <span>Bengaluru, Karnataka 560001</span>
          <span>+91 98450 11223</span>
          <span>hello@kaaruwoodcraft.in</span>
        </FooterColumn>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Kaaru Woodcraft. Made by hand in India.</span>
          <span>Shipping across India · 30-day returns · Toy-safe finishes</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="eyebrow">{title}</h3>
      <div className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function Link({ to, children }) {
  return (
    <a href={to}>
      {children}
    </a>
  );
}
```

The `FooterColumn`, `Link` components remain the same.

Keep in mind that you still need to use JSX syntax instead of TSX and it's important to note that React does not support generic parameters or type declarations like TypeScript. Therefore, when removing these features from your code, make sure to replace them with their JavaScript equivalents.