import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/custom-orders", label: "Custom Orders" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled || mobileOpen
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="container-page">
        <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:h-20 md:grid-cols-[auto_1fr_auto]">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-sm font-semibold text-accent-foreground">
              K
            </span>
            <span className="truncate font-display text-lg font-medium tracking-tight">
              Kaaru<span className="text-muted-foreground"> Woodcraft</span>
            </span>
          </Link>

          <nav className="hidden items-center justify-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-1">
            <Link
              to="/shop"
              aria-label="Search products"

              className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
            >
              <Search className="h-[1.15rem] w-[1.15rem]" />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Cart, ${count} items`}
              className="relative grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
            >
              <ShoppingBag className="h-[1.15rem] w-[1.15rem]" />
              {count > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[0.6rem] font-semibold text-accent-foreground">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="container-page flex flex-col py-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                >
                  <Link
                    to={link.to}
                    className="block border-b border-border/60 py-4 font-display text-xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}