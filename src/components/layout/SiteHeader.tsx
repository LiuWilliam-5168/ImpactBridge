import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, UserRound, X } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const audiences = [
  { to: "/communities", label: "For Communities", blurb: "Get clean water for your community" },
  { to: "/ngos", label: "For NGOs", blurb: "Fund vetted, community-led projects" },
  { to: "/companies", label: "For Companies", blurb: "Sponsor projects, get ESG reporting" },
  { to: "/volunteers", label: "For Volunteers", blurb: "Contribute your skills on the ground" },
] as const;

const primaryNav = [
  { to: "/projects", label: "Projects" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link to="/" aria-label="ImpactBridge home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            to="/projects"
            className="text-sm text-muted-foreground transition-colors hover:text-ink"
            activeProps={{ className: "text-ink font-medium" }}
          >
            Projects
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground outline-none transition-colors hover:text-ink data-[state=open]:text-ink">
              Who it's for
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {audiences.map((a) => (
                <DropdownMenuItem key={a.to} asChild>
                  <Link to={a.to} className="flex cursor-pointer flex-col items-start gap-0.5">
                    <span className="text-sm font-medium text-ink">{a.label}</span>
                    <span className="text-xs text-muted-foreground">{a.blurb}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-ink"
            activeProps={{ className: "text-ink font-medium" }}
          >
            How it works
          </Link>
          <Link
            to="/about"
            className="text-sm text-muted-foreground transition-colors hover:text-ink"
            activeProps={{ className: "text-ink font-medium" }}
          >
            About
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild size="sm" className="rounded-full px-4">
            <Link to="/communities">Get involved</Link>
          </Button>
          <Link
            to="/community"
            aria-label="Your profile"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-ink"
          >
            <UserRound className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            <Link
              to="/projects"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-ink"
              activeProps={{ className: "text-ink font-medium" }}
            >
              Projects
            </Link>

            <p className="px-2 pb-1 pt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
              Who it's for
            </p>
            {audiences.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-ink"
                activeProps={{ className: "text-ink font-medium" }}
              >
                {a.label}
              </Link>
            ))}

            <div className="my-1 border-t border-border" />
            {primaryNav
              .filter((item) => item.to !== "/projects")
              .map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-ink"
                  activeProps={{ className: "text-ink font-medium" }}
                >
                  {item.label}
                </Link>
              ))}

            <Button asChild className="mt-3 rounded-full">
              <Link to="/communities" onClick={() => setOpen(false)}>
                Get involved
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
