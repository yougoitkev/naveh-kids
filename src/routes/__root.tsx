import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider, useCart } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";
import { brand, categories, logo } from "@/data/catalog";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function CartLink() {
  const { count } = useCart();
  return (
    <Link to="/cart" className="relative inline-flex items-center gap-2 text-sm">
      Basket
      <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-xs text-primary-foreground">
        {count}
      </span>
    </Link>
  );
}

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Our story" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="bg-primary py-2 text-center text-xs tracking-wide text-primary-foreground">
          Free delivery across India on orders above ₹7,000
        </div>
        <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
          <div className="container-page flex h-20 items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="NAVEH Kids — crafted for every little blessing"
                width={160}
                height={140}
                className="h-12 w-auto mix-blend-multiply"
              />
              <span className="sr-only">NAVEH Kids</span>
            </Link>
            <nav className="hidden items-center gap-7 text-sm md:flex">
              {NAV.map((item) => (
                <Link key={item.to} to={item.to} className="link-underline">
                  {item.label}
                </Link>
              ))}
            </nav>
            <CartLink />
          </div>
          <nav className="flex items-center justify-center gap-6 border-t border-border py-2 text-xs md:hidden">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="link-underline">
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main>
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <footer className="mt-24 border-t border-border bg-secondary/50 py-14">
          <div className="container-page grid gap-10 text-sm md:grid-cols-4">
            <div>
              <img
                src={logo}
                alt="NAVEH Kids"
                width={160}
                height={140}
                loading="lazy"
                className="h-16 w-auto mix-blend-multiply"
              />
              <p className="mt-4 text-muted-foreground">{brand.tagline}.</p>
            </div>
            <div>
              <p className="eyebrow">Shop</p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      to="/category/$slug"
                      params={{ slug: category.slug }}
                      className="link-underline"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Information</p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>
                  <Link to="/about" className="link-underline">
                    Our story
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="link-underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/policies" className="link-underline">
                    Shipping, returns & privacy
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="link-underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow">Workshop</p>
              <p className="mt-4 text-muted-foreground">{brand.address}</p>
              <p className="mt-3 text-muted-foreground">{brand.hours}</p>
              <p className="mt-3">
                <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="link-underline">
                  {brand.phone}
                </a>
              </p>
            </div>
          </div>
          <div className="container-page mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} NAVEH Kids · A Philip Wood Designers family workshop.
          </div>
        </footer>
        <Toaster position="bottom-right" />
      </CartProvider>
    </QueryClientProvider>
  );
}

