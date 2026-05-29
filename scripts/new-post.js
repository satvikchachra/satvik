/* eslint-disable */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Generate an 8-character alphanumeric hash
const hash = crypto.randomBytes(4).toString('hex');

const titleArgs = process.argv.slice(2);
const title = titleArgs.length > 0 ? titleArgs.join(' ') : 'New Blog Post';

// Generate a simple slug from the title (lowercase, replace spaces with hyphens, remove non-alphanumeric)
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-');

const date = new Date().toISOString().split('T')[0];

const mdxContent = `# ${title}

Write your content here...
`;

const jsonContent = {
  title: title,
  description: 'A brief description of the post...',
  date: date,
  slug: slug,
  tags: ['Engineering'],
  image: `/images/blog/${hash}/cover.png`,
  ogImage: `/og/blog/${hash}.png`,
};

const contentDir = path.join(process.cwd(), 'src', 'content', 'blog');

if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

const mdxPath = path.join(contentDir, `${hash}.mdx`);
const jsonPath = path.join(contentDir, `${hash}.json`);

fs.writeFileSync(mdxPath, mdxContent, 'utf8');
fs.writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2), 'utf8');

console.log(`\n✅ Created new blog post with ID: ${hash}`);
console.log(`📄 MDX:  src/content/blog/${hash}.mdx`);
console.log(`🗂️  JSON: src/content/blog/${hash}.json`);
console.log(`\nDon't forget to add your images:`);
console.log(`🖼️  UI Cover:     public/images/blog/${hash}/cover.png`);
console.log(`📱 Social Share: public/og/blog/${hash}.png\n`);
