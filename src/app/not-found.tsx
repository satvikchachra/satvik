import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p
        className="font-mono text-8xl font-bold mb-4"
        style={{ color: "var(--accent)", opacity: 0.2 }}
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>
        Page not found
      </h1>
      <p className="text-sm mb-8 max-w-sm" style={{ color: "var(--text-muted)" }}>
        Whatever you were looking for doesn&apos;t exist here. Might have moved,
        might never have existed.
      </p>
      <Link
        href="/"
        id="not-found-home-link"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90"
        style={{ background: "var(--accent)", color: "var(--bg)" }}
      >
        Back home
      </Link>
    </div>
  );
}
