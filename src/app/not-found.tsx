import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div
        className="text-8xl font-bold mb-6 tracking-tight text-text-subtle opacity-[0.15]"
        aria-hidden="true"
      >
        404
      </div>
      <h1
        className="text-lg mb-3 tracking-tight text-text"
      >
        page not found
      </h1>
      <p
        className="text-sm mb-10 max-w-xs leading-relaxed text-text-muted"
      >
        whatever you were looking for doesn&apos;t exist here. might have
        moved, might never have existed.
      </p>
      <Link
        href="/"
        id="not-found-home-link"
        className="text-sm link-subtle"
      >
        ← go home
      </Link>
    </div>
  );
}
