export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-24"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="max-w-xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Social links — abbreviated t3 style */}
        <nav aria-label="Social links">
          <ul className="flex items-center gap-4" role="list">
            {[
              { href: "https://github.com/satvikchachra", label: "gh" },
              { href: "https://twitter.com/satvikchachra", label: "x" },
              { href: "https://linkedin.com/in/satvikchachra", label: "li" },
              { href: "mailto:hello@example.com", label: "mail" },
            ].map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  aria-label={label}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="text-xs tracking-wide link-subtle"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p
          className="text-xs tracking-wide"
          style={{ color: "var(--text-subtle)" }}
        >
          © {year}
        </p>
      </div>
    </footer>
  );
}
