<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:css-architecture-rules -->
# CSS Architecture Rules — NEVER violate these

## Rule 1: No inline `style` props for theme tokens

This codebase uses Tailwind v4 with `@theme inline` in `src/app/globals.css`. All CSS custom properties are mapped to Tailwind color tokens. **Always use Tailwind utility classes — never `style={{ }}`** for any value that has a Tailwind equivalent.

| ❌ Never write | ✅ Always write instead |
|---|---|
| `style={{ color: "var(--text)" }}` | `className="text-text"` |
| `style={{ color: "var(--text-muted)" }}` | `className="text-text-muted"` |
| `style={{ color: "var(--text-subtle)" }}` | `className="text-text-subtle"` |
| `style={{ color: "var(--accent)" }}` | `className="text-accent"` |
| `style={{ color: "var(--green)" }}` | `className="text-green"` |
| `style={{ background: "var(--surface)" }}` | `className="bg-surface"` |
| `style={{ background: "var(--bg)" }}` | `className="bg-bg"` |
| `style={{ borderTop: "1px solid var(--border-subtle)" }}` | `className="border-t border-border-subtle"` |
| `style={{ borderBottom: "1px solid var(--border-subtle)" }}` | `className="border-b border-border-subtle"` |
| `style={{ alignItems: "flex-start" }}` | `className="items-start"` |
| `style={{ paddingLeft: "1rem" }}` | `className="pl-4"` |

The only legitimate uses of `style={{ }}` are for **dynamic, JS-computed values** with no static Tailwind equivalent (e.g. `animationDelay: `${n * 40}ms``).

**Important:** When using `text-accent` inside a `.prose` context, use `text-accent!` (Tailwind important modifier) because `.prose a { color: inherit }` has higher specificity and will override it.

## Rule 2: No JavaScript mouse event handlers for hover states

**Never use `onMouseEnter` / `onMouseLeave` to change styles.** This is 2015-era React. Use CSS instead.

| ❌ Never write | ✅ Always write instead |
|---|---|
| `onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; }}` | `className="hover:text-text"` |
| `onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}` | `className="hover:bg-transparent"` |
| JS-toggled `style.background` on hover | `className="hover:bg-surface"` |

For elements whose style depends on an **active/selected state** (e.g. navbar links), use conditional Tailwind classes based on the state variable:

```tsx
// ✅ Correct pattern — active state via conditional classes
className={`text-xs transition-colors duration-200 hover:text-text ${
  active ? "text-text" : "text-text-muted"
}`}
```

Reasons to never use JS mouse handlers:
- Breaks on keyboard and touch devices (no `mouseover` event)
- Creates unnecessary JS overhead and bundle size
- Defeats SSR hydration benefits
- Makes components unreadable

<!-- END:css-architecture-rules -->
