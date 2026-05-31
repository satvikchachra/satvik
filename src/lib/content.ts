import type { ExperienceItem } from './experience';
import type { Project } from './projects';

export const HOME_CONTENT = {
  heroTitle: 'satvik chachra',
  heroSubtitle: 'builds ai coding agents, full-stack software & infrastructure',
  ctaWork: 'projects',
  ctaAbout: 'about me',
  ctaContact: 'get in touch',
  sectionWins: 'impactful work',
  viewProjects: 'view projects',
  sectionBlog: 'recent blogs',
  viewAllPosts: 'all posts',
  wins: [
    {
      text: 'Built the core __AI coding agent__ at Atlassian, actively used by',
      highlight: '2K+ engineers daily',
    },
    {
      text: 'Architected __cross-platform IDE plugin__ for the AI Coding Agent with',
      highlight: '~95% shared code',
    },
    {
      text: 'Optimized __ML prediction APIs__, reducing latency from',
      highlight: '60s to 500ms',
    },
    {
      text: 'Shipped __Generative AI__ and __Cloud Storage Platforms__ at AppyHigh, reaching',
      highlight: '1 Million+ users',
    },
  ] as const,
} as const;

export const ABOUT_CONTENT = {
  heroTitle: 'satvik chachra',
  introParagraph1: '**AI-native full stack engineer**, __4+ years of experience__.',
  introParagraph2:
    'Building **AI coding agents**, full-stack software, and the infrastructure that makes them production-ready.',
  sectionExperience: 'experience',
  sectionStack: 'tech stack',
  sectionEducation: 'education',
  sectionAwards: 'awards / recognition',
  wins: [
    ['2K+ Daily Active Users', 'Built Core AI Coding Agent at Atlassian'],
    [
      '~95% Shared Code',
      'Architected Cross-Platform VS Code & JetBrains Plugin for AI Coding Agent',
    ],
    ['60s → 500ms', 'Optimized ML Prediction API Latency'],
    ['1 Million+ Users', 'Shipped Generative AI and Cloud Storage Platforms at AppyHigh'],
  ] as const,
  stack: [
    {
      category: 'AI / ML',
      items: [
        'AI Agents',
        'Agentic Systems',
        'LLM Applications',
        'RAG (learning)',
        'MLOps',
        'Model Context Protocol (MCP)',
        'Agent Client Protocol (ACP)',
      ],
    },
    {
      category: 'Languages',
      items: ['JavaScript', 'TypeScript', 'Python', 'Rust (learning)'],
    },
    {
      category: 'Frontend',
      items: ['React', 'NextJS', 'Redux', 'Tanstack', 'Tailwind CSS', 'HTML', 'CSS'],
    },
    {
      category: 'Backend',
      items: ['NodeJS', 'MongoDB', 'WebSockets', 'FastAPI', 'Flask', 'Redis', 'Firebase'],
    },
    {
      category: 'Cloud / Infra',
      items: ['CI/CD', 'Bitbucket Pipelines', 'GitHub Actions', 'Docker', 'Vercel'],
    },
    {
      category: 'Tools / APIs',
      items: ['Vitest', 'Playwright', 'VS Code APIs', 'JetBrains APIs', 'Tecton', 'Stripe', 'Git'],
    },
  ] as const,
  education: [
    {
      year: '2018 – 2022',
      school: 'Chitkara University',
      schoolUrl: 'https://www.chitkara.edu.in/',
      degree: 'Bachelor of Engineering, Computer Science',
      description: 'CGPA: **9.83 / 10**',
    },
    {
      year: '2018',
      school: 'CBSE Board',
      degree: 'Senior Secondary Examination (12th)',
      description: 'Percentage: **92.8%**',
    },
  ] as const,
  awards: [
    {
      title: 'Brainiac Award',
      date: 'Feb ’23',
      description:
        "For building PhotAI's **Image Background Remover Tool**, __writing client-side canvas algorithm__ — combining original images with B&W API masks and pixel manipulation.",
      viewUrl:
        'https://github.com/satvikchachra/profile/blob/463aeb1d2ba5208a094842824d0cab7650f56b91/brainiacAward.jpg',
    },
    {
      title: 'Letter of Appreciation',
      date: 'Jan ’23',
      description:
        'For __driving **3x improvement** in performance__, and improving core Web Vitals like LCP, INP, and CLS, by code-splitting, caching, etc. Got recognition from startup founders',
      viewUrl:
        'https://github.com/satvikchachra/profile/blob/463aeb1d2ba5208a094842824d0cab7650f56b91/letterOfAppreciation.jpg',
    },
    {
      title: 'Talent Star Award',
      date: 'Sep ’22',
      description:
        "For __building ScannerGo's__ **Redux architecture**, Cloud-Based Storage, Socket-based **real-time file conversions** and custom browser PDF viewing experience.",
      viewUrl:
        'https://github.com/satvikchachra/profile/blob/463aeb1d2ba5208a094842824d0cab7650f56b91/talentStarsAward.jpg',
    },
  ] as const,
} as const;

export const EMAIL_ADDRESS = 'consultwithsatvik@gmail.com';

export const SOCIAL_LINKS = {
  github: 'https://github.com/satvikchachra',
  x: 'https://x.com/satvikchachra',
  linkedin: 'https://linkedin.com/in/satvikchachra',
} as const;

export const CONTACT_CONTENT = {
  heroTitle: 'get in touch',
  introParagraph:
    "Open to conversations about AI systems, developer tooling, something you're building, or a good engineering problem.",
  responseTime: 'usually responds within 48 hours.',
  links: [
    {
      id: 'contact-github',
      href: SOCIAL_LINKS.github,
      label: 'github',
      handle: 'satvikchachra',
      description: 'code, projects, contributions',
    },
    {
      id: 'contact-x',
      href: SOCIAL_LINKS.x,
      label: 'x (twitter)',
      handle: 'satvikchachra',
      description: 'thoughts, hot takes, building in public',
    },
    {
      id: 'contact-linkedin',
      href: SOCIAL_LINKS.linkedin,
      label: 'linkedin',
      handle: 'satvikchachra',
      description: 'professional updates',
    },
    {
      id: 'contact-email',
      href: `mailto:${EMAIL_ADDRESS}`,
      label: 'email',
      handle: EMAIL_ADDRESS,
      description: 'best for longer conversations',
    },
  ] as const,
} as const;

export const PROJECTS_CONTENT = {
  heroTitle: 'projects',
  heroSubtitle: 'AI agents, full-stack software, platform infrastructure, and developer tooling',
  noProjectsFound: 'no projects found.',
  activeLabel: 'active',
} as const;

export const BLOG_CONTENT = {
  heroTitle: 'blog',
  heroSubtitle:
    'I write about things I am learning across Machine Learning, Aritifical Intelligence, Computer Science, Distributed Systems, Mathematics, and Physics.',
  noPostsFound: 'posts are on their way.',
  noPostsFoundFallback: 'no posts found.',
  dropInSoon: 'drop in again soon.',
} as const;

export const NOT_FOUND_CONTENT = {
  title: '404 — Page Not Found',
  heading: 'page not found',
  description:
    "whatever you were looking for doesn't exist here. might have moved, might never have existed.",
  goHome: '← go home',
} as const;

export const FOOTER_CONTENT = {
  license: 'MIT License',
} as const;

export const EXPERIENCE_DATA: readonly ExperienceItem[] = [
  {
    year: '2025 – now',
    company: 'Atlassian',
    companyUrl: 'https://www.atlassian.com/',
    role: 'SDE 2 — AI Foundations',
    description:
      'Building **AI coding agents**, full-stack software, developer tooling and infrastructure used by **2K+ engineers** daily. __Led end-to-end development__ of MCP Integration into AI Coding Agent, AI-native Editor and Agentic Chat experience across VS Code and JetBrains with **~95% shared code**.',
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
      'Built **AI-powered Image Editing** and Generation Platform (PhotAI) and a **Cloud-based Storage** and document conversion platform (ScannerGo). __Led small engineering teams__ and shipped products to **1M+ users**.',
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    slug: 'ai-coding-agent',
    title: 'AI Coding Agent',
    company: 'Atlassian',
    description:
      'Built Core AI Coding Agent, Editor and Agentic Chat experience for VSCode and JetBrains — used by **2K+ engineers** daily, with **~95% shared** cross-platform code.',
    bullets: [
      '__Architected and delivered **MCP integration**__ for the Coding Agent, building frontend and backend infrastructure for server onboarding, tool discovery, permission management, and agent-driven execution of external tools.',
      '__Led end-to-end development__ of the **AI-native Editor and Agentic Chat Experience** for the agent, including editor, tool calls, streaming, attachments, @mentions, slash commands, image paste/upload, drag-and-drop, and keyboard-first interactions.',
      'Improved AI coding agent response quality by introducing **compile-time IDE diagnostics** as an iterative feedback loop and designing XML-based high-signal context for prompts.',
      'Built **context providers** powering the AI agent workflow: @Files & Folders, @Commit, @Branch, @Rules, @Docs, @Linter Errors, @Recent Changes, and @Past Chats.',
      '__Contributed to a cross-IDE platform architecture__ enabling **~95% shared code** between VS Code and JetBrains, significantly reducing duplication and increasing shipping velocity.',
      'Built extension and agent **settings infrastructure** end-to-end, including persistence, real-time synchronization, permissions/approval systems, and extensibility surfaces.',
    ],
    tags: [
      'TypeScript',
      'ReactJS',
      'NodeJS',
      'VS Code APIs',
      'JetBrains APIs',
      'AI SDK',
      'MCP',
      'ACP',
    ],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    status: 'active',
    year: 2025,
  },
  {
    slug: 'predictive-test-case-selection',
    title: 'Predictive Test Case Selection',
    company: 'Atlassian',
    description:
      '**ML-driven system** predicting which tests should run per code change in local and CI/CD pipelines, using changed files and historical failure signals.',
    bullets: [
      '__Shipped infra which used **ML models**__ to predict which Unit, Integration, and VR tests should execute for a given code change across local and CI pipelines.',
      'Reduced test execution volume and improved **developer feedback loops**, resulting in faster build times, improved productivity, and lower infrastructure costs.',
      '__Drove a **~99% improvement** in p95 prediction API latency (60s → 500ms)__ by implementing Tecton feature store integration and Redis caching alongside FastAPI migration.',
      'Integrated Tecton as an **online/offline feature store** to ensure training-serving consistency, enable low-latency feature retrieval, and reduce feature drift in real-time predictions.',
      '__Contributed to **MLOps infrastructure automation**__ across the ML lifecycle: data ingestion, validation, labeling/splitting, training, retraining, testing, deployment, and serving.',
    ],
    tags: ['Python', 'FastAPI', 'Redis', 'Tecton', 'CI/CD', 'MLOps'],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    status: 'archived',
    year: 2024,
  },
  {
    slug: 'photai',
    title: 'PhotAI',
    company: 'AppyHigh',
    description:
      '**AI-powered image editing** and generation platform with background removal, object replacement, and AI avatar generation. Reached **700K+ users**.',
    bullets: [
      '__Led a team of **5 engineers**__ to build the frontend platform, owning complete architecture, AI feature integration, performance optimization, SEO, CI/CD pipelines, and production deployments',
      'Built **AI-powered image editing** capabilities including Background Remover, Object Replacer, and AI Avatar generation workflows.',
      'Integrated **Stripe** for secure payments, enabling subscription management, checkout flows, and seamless transaction handling across the platform.',
      'Implemented **Firebase One-Tap Google Authentication** and optimized image editing workflows via async processing, state management improvements, and reduced UI latency.',
    ],
    tags: ['NextJS', 'React', 'TypeScript', 'Firebase', 'StripeJS'],
    liveUrl: 'https://www.phot.ai/',
    featured: true,
    status: 'archived',
    year: 2023,
  },
  {
    slug: 'scannergo',
    title: 'ScannerGo',
    company: 'AppyHigh',
    description:
      '**Cloud-based storage** and PDF toolkit platform with real-time file conversion, custom PDF viewer, and document management. Reached **500K+ users**.',
    bullets: [
      '__Led a team of **3 engineers**__ and built the frontend platform for Cloud Storage and Document Conversion',
      'Built **Redux based Architecture** for the cloud storage platform, powering file uploads/downloads, CRUD operations, nested folder trees, and storage management workflows.',
      'Built real-time file upload and conversion workflows using **Socket APIs**.',
      'Developed a **custom PDF viewer** enabling in-browser document viewing and interaction.',
      'Integrated **CAPTCHA-based bot protection** and reduced abuse and malicious traffic and improved security',
    ],
    tags: ['React', 'NextJS', 'Redux', 'WebSockets', 'Material UI'],
    liveUrl: 'https://scannergo.net/',
    featured: true,
    status: 'archived',
    year: 2022,
  },
];
