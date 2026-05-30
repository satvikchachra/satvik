# Satvik Chachra - Personal Website & Blog

Welcome to the source code for my personal website and blog. This project serves as my portfolio, a place to share my experiences, and a platform for writing technical articles.

## 🚀 Features

- **MDX Powered Blog**: Write rich, interactive articles using Markdown and React components.
- **Modern UI**: Clean, responsive design built with Tailwind CSS.
- **Dark Mode**: Built-in theme switcher supporting light, dark, and system preferences.
- **SEO Optimized**: Fully optimized for search engines and LLM crawlers with structured data (JSON-LD) and `llms.txt`.
- **High Performance**: Built on Next.js App Router with React Server Components.
- **Robust Testing**: Comprehensive test suite using Vitest for unit/integration testing and Playwright for E2E testing.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Content**: [MDX](https://mdxjs.com/)
- **Testing**: [Vitest](https://vitest.dev/) & [Playwright](https://playwright.dev/)

## 💻 Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/satvikchachra/satvik.git
   cd satvik
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Writing Blog Posts

This project uses a custom scaffold utility to ensure a scalable and consistent architecture for blog posts.

**NEVER create blog files manually.** To create a new post, run:

```bash
npm run new-post "Your Blog Title"
```

This script will:

1. Generate a unique hash ID for your post.
2. Create `src/content/blog/<hash>.mdx` and `src/content/blog/<hash>.json`.
3. Set up the necessary frontmatter and SEO configurations.
4. Provide instructions on where to place your cover and OpenGraph images.

## 🧪 Testing and Validation

We maintain a strict quality standard using automated tests and linting.

- **Run all validations** (format, typecheck, lint, build):
  ```bash
  npm run validate
  ```
- **Run Unit Tests**:
  ```bash
  npm run test:unit
  ```
- **Run E2E Tests**:
  ```bash
  npm run test:e2e
  ```
- **Run all checks** (Validation + Tests):
  ```bash
  npm run validate:all
  ```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
