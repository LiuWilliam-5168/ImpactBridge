import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-muted-foreground">
            Clean water. Human connection. Real impact.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link to="/projects" className="hover:text-ink">
            Projects
          </Link>
          <Link to="/communities" className="hover:text-ink">
            For Communities
          </Link>
          <Link to="/ngos" className="hover:text-ink">
            For NGOs
          </Link>
          <Link to="/companies" className="hover:text-ink">
            For Companies
          </Link>
          <Link to="/volunteers" className="hover:text-ink">
            For Volunteers
          </Link>
          <Link to="/about" className="hover:text-ink">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
