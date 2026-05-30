import { describe, it, expect } from 'vitest';
import * as ALL_CONTENT from './content';
import fs from 'fs';
import path from 'path';

describe('Content Lock', () => {
  it('matches the static content snapshot to protect against unintended AI edits', () => {
    // If an AI agent modifies the strings in content.ts without updating the snapshot,
    // this test will fail, preventing the changes from being deployed to production.
    // To approve changes, run: npm run test -- -u
    expect(ALL_CONTENT).toMatchSnapshot();
  });

  it('matches the blog posts snapshot to protect against unintended AI edits', () => {
    const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');

    if (!fs.existsSync(blogDir)) return;

    const files = fs.readdirSync(blogDir).sort();
    const blogContent: Record<string, string> = {};

    for (const file of files) {
      if (file.endsWith('.mdx') || file.endsWith('.json')) {
        const filePath = path.join(blogDir, file);
        blogContent[file] = fs.readFileSync(filePath, 'utf-8');
      }
    }

    // To approve changes to blog posts, run: npm run test -- -u
    expect(blogContent).toMatchSnapshot();
  });
});
