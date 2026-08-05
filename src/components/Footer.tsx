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
            <Link
              key={category.slug}
              to="/category/$slug"
              params={{ slug: category.slug }}
              className="link-underline w-fit"
            >
              {category.name}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Company">
          <Link to="/about" className="link-underline w-fit">
            About us
          </Link>
          <Link to="/custom-orders" className="link-underline w-fit">
            Custom orders
          </Link>
          <Link to="/faq" className="link-underline w-fit">
            FAQ
          </Link>
          <Link to="/contact" className="link-underline w-fit">
            Contact
          </Link>
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

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="eyebrow">{title}</h3>
      <div className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
