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
    // Inline code — only style backtick code, not fenced code blocks.
    // rehype-pretty-code adds data-language to <code> inside <pre>;
    // skip our styling in that case so Shiki's token colors survive.
    code: ({ children, ...props }) => {
      const isBlock = "data-language" in props;
      if (isBlock) return <code {...props}>{children}</code>;
      return (
        <code
          {...props}
          className="font-mono text-[0.84em] bg-surface text-accent px-[0.45em] py-[0.15em] rounded-[4px] border border-border"
        >
          {children}
        </code>
      );
    },
    // Pass pre through untouched so rehype-pretty-code keeps full control.
    pre: ({ children, ...props }) => <pre {...props}>{children}</pre>,
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
