export interface ExperienceItem {
  readonly year: string;
  readonly company: string;
  readonly companyUrl: string;
  readonly role: string;
  readonly description: string;
}

export const EXPERIENCE: readonly ExperienceItem[] = [
  {
    year: '2025 – now',
    company: 'Atlassian',
    companyUrl: 'https://www.atlassian.com/',
    role: 'SDE 2 — AI Foundations',
    description:
      'Building **AI coding agents**, developer tooling, infrastructure, and intelligent systems used by **2K+ engineers** daily. __Led end-to-end development__ of an AI-native editor and chat experience across VS Code and JetBrains with **~95% shared code**.',
  },
  {
    year: '2024 – 2025',
    company: 'Atlassian',
    companyUrl: 'https://www.atlassian.com/',
    role: 'SDE 1 — Dev Infra',
    description:
      'Worked on **ML-driven** Predictive Test Case Selection System for CI/CD pipelines. __Drove a **~99% improvement** in p95 prediction API latency (**60s → 500ms**)__ through Tecton feature store integration, Redis caching, and FastAPI migration.',
  },
  {
    year: '2022 – 2023',
    company: 'AppyHigh',
    companyUrl: 'https://www.appyhigh.com/',
    role: 'SDE 1 — Full Stack',
    description:
      'Built **AI-powered Image Editing** and Generation Platform (PhotAI) and a **Cloud-based Storage System** and document conversion service (ScannerGo). __Led small engineering teams__ and shipped products to **1M+ users**.',
  },
] as const;
