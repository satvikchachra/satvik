import { describe, it, expect, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import RootLayout from './layout';

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: 'font-geist-sans' }),
  Geist_Mono: () => ({ variable: 'font-geist-mono' }),
}));

vi.mock('@/components/layout/navbar', () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
}));

vi.mock('@/components/layout/footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock('@/components/theme-provider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

describe('RootLayout', () => {
  it('renders JSON-LD structured data script and it is parseable', () => {
    const html = renderToStaticMarkup(
      <RootLayout>
        <div>Test Children</div>
      </RootLayout>,
    );

    const scriptMatch = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/);
    expect(scriptMatch).not.toBeNull();

    const jsonLd = JSON.parse(scriptMatch![1]);
    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(jsonLd['@type']).toBe('Person');
    expect(jsonLd.name).toBe('Satvik Chachra');
  });
});
