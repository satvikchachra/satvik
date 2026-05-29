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
        className="font-mono text-[0.84em] bg-surface text-accent px-[0.45em] py-[0.15em] rounded-[4px] border border-border"
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
            <>
              <span className="sr-only"> (opens in new tab)</span>
              <span aria-hidden="true" className="text-[0.75em] ml-[2px]">
                ↗
              </span>
            </>
          )}
        </a>
      );
    },
    ...components,
  };
}
