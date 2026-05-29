import type { MDXComponents } from "mdx/types";

/**
 * Global MDX component overrides.
 * Required by @next/mdx for App Router.
 * Also used by the blog [slug] renderer.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children, ...props }) => (
      <h1 {...props} className="text-text">
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 {...props} className="text-text">
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 {...props} className="text-text">
        {children}
      </h3>
    ),
    // Callout blockquote
    blockquote: ({ children, ...props }) => (
      <blockquote {...props}>
        {children}
      </blockquote>
    ),
    // Inline code
    code: ({ children, ...props }) => (
      <code
        {...props}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.84em",
          background: "var(--surface)",
          color: "var(--accent)",
          padding: "0.15em 0.45em",
          borderRadius: "4px",
          border: "1px solid var(--border)",
        }}
      >
        {children}
      </code>
    ),
    // External links open in new tab
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          {...props}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={`text-accent! ${(props as { className?: string }).className ?? ""}`}
        >
          {children}
          {isExternal && (
            <span aria-label=" (opens in new tab)" style={{ fontSize: "0.75em", marginLeft: "2px" }}>
              ↗
            </span>
          )}
        </a>
      );
    },
    ...components,
  };
}
