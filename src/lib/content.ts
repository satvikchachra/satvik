import type { ExperienceItem } from './experience';
import type { Project } from './projects';

export const HOME_CONTENT = {
  heroTitle: 'satvik chachra',
  heroSubtitle: 'builds ai coding agents, full-stack software & infrastructure',
  sectionWins: 'selected wins',
  viewProjects: 'view projects',
  sectionExperience: 'experience',
  sectionBlog: 'recent blogs',
  viewAllPosts: 'all posts',
  wins: [
    ['2K+ users daily', 'Built AI coding agent at Atlassian'],
    ['1 Million+ users', 'B2C SaaS products shipped at AppyHigh'],
    ['~95% shared code', 'VS Code + JetBrains plugin for AI Coding Agent'],
    ['60s → 500ms', 'ML prediction API latency reduction'],
  ] as const,
} as const;

export const ABOUT_CONTENT = {
  heroTitle: 'satvik chachra',
  introParagraph1: '**AI-native full stack engineer**, __4+ years of experience__.',
  introParagraph2:
    'Building **AI coding agents**, developer tooling, and the infrastructure that makes them production-ready.',
  introParagraph3:
    "I write about AI systems, platform engineering, and things I'm learning across computer science, mathematics, and machine learning.",
  sectionExperience: 'experience',
  sectionStack: 'tech stack',
  sectionEducation: 'education',
  sectionAwards: 'awards / recognition',
  stack: [
    {
      category: 'AI / ML',
      items: ['AI Agents', 'LLMs', 'RAG (learning)', 'Tecton', 'MLOps', 'MCP', 'ACP'],
    },
    {
      category: 'Languages',
      items: ['JavaScript', 'TypeScript', 'Python', 'Rust (learning)'],
    },
    {
      category: 'Frontend',
      items: ['ReactJS', 'NextJS', 'Redux', 'HTML', 'CSS'],
    },
    {
      category: 'Backend',
      items: ['NodeJS', 'FastAPI', 'Flask', 'Redis', 'Firebase', 'Socket.IO'],
    },
    {
      category: 'Cloud / Infra',
      items: ['AWS S3', 'CI/CD', 'Docker'],
    },
    {
      category: 'Tools / APIs',
      items: ['VS Code APIs', 'JetBrains APIs', 'AI SDK', 'Stripe', 'Material UI'],
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
        "For __building ScannerGo's__ **Redux architecture**, Socket-based **real-time file conversions** and custom browser PDF viewing experience.",
      viewUrl:
        'https://github.com/satvikchachra/profile/blob/463aeb1d2ba5208a094842824d0cab7650f56b91/talentStarsAward.jpg',
    },
  ] as const,
} as const;

export const CONTACT_CONTENT = {
  heroTitle: 'get in touch',
  introParagraph:
    "Open to conversations about AI systems, developer tooling, something you're building, or a good engineering problem.",
  responseTime: 'usually responds within 48 hours.',
  links: [
    {
      id: 'contact-github',
      href: 'https://github.com/satvikchachra',
      label: 'github',
      handle: 'satvikchachra',
      description: 'code, projects, contributions',
    },
    {
      id: 'contact-twitter',
      href: 'https://twitter.com/satvikchachra',
      label: 'twitter / x',
      handle: 'satvikchachra',
      description: 'thoughts, hot takes, building in public',
    },
    {
      id: 'contact-linkedin',
      href: 'https://linkedin.com/in/satvikchachra',
      label: 'linkedin',
      handle: 'satvikchachra',
      description: 'professional updates',
    },
    {
      id: 'contact-email',
      href: 'mailto:consultwithsatvik@gmail.com',
      label: 'email',
      handle: 'consultwithsatvik@gmail.com',
      description: 'best for longer conversations',
    },
  ] as const,
} as const;

export const PROJECTS_CONTENT = {
  heroTitle: 'projects',
  heroSubtitle: 'AI systems, platform infrastructure, and developer tools.',
  noProjectsFound: 'no projects found.',
  activeLabel: 'active',
} as const;

export const EXPERIENCE_DATA: readonly ExperienceItem[] = [
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
];

export const PROJECTS_DATA: Project[] = [
  {
    slug: 'ai-coding-agent',
    title: 'AI Coding Agent',
    company: 'Atlassian',
    description:
      'AI-native editor and chat experience for VS Code and JetBrains — built for **2K+ engineers** daily, with **~95% shared** cross-platform code.',
    bullets: [
      '__Led end-to-end development__ of the **AI-native Editor and Chat Experience**, including persistent conversation editors, attachments, @mentions, slash commands, image paste/upload, drag-and-drop, and keyboard-first interactions.',
      'Improved AI coding agent response quality by introducing **compile-time IDE diagnostics** as an iterative feedback loop and designing XML-based high-signal context for prompts.',
      'Built **context providers** powering the agent workflow: @Files & Folders, @Commit, @Branch, @Rules, @Docs, @Linter Errors, @Recent Changes, and @Past Chats.',
      'Extended agent capabilities through **MCP integration** (infra + UX), enabling users to connect MCP servers, discover tools, and safely interact with third-party systems.',
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
      '__Led a team of **5 engineers**__ to deliver the platform end-to-end across frontend, backend, infrastructure, and deployment workflows.',
      'Built **AI-powered image editing** capabilities including Background Remover, Object Replacer, and AI Avatar generation workflows.',
      'Designed secure media upload pipelines using **AWS S3** for scalable image processing and storage.',
      'Integrated **Stripe** for secure payments, enabling subscription management, checkout flows, and seamless transaction handling across the platform.',
      'Implemented **Firebase One-Tap Google Authentication** and optimized image editing workflows via async processing, state management improvements, and reduced UI latency.',
    ],
    tags: ['NextJS', 'ReactJS', 'TypeScript', 'Firebase', 'StripeJS', 'AWS S3'],
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
      '__Led a team of **3 engineers**__ to build and ship core document management and PDF tooling features.',
      'Built real-time file upload and conversion workflows using **Socket APIs**.',
      'Built **Redux based Architecture** for the cloud storage platform, powering file uploads/downloads, CRUD operations, nested folder trees, and storage management workflows.',
      'Developed a **custom PDF viewer** enabling in-browser document viewing and interaction.',
      'Integrated **CAPTCHA-based bot protection** to reduce abuse and malicious traffic.',
    ],
    tags: ['ReactJS', 'NextJS', 'Redux', 'Socket.IO', 'Material UI'],
    liveUrl: 'https://scannergo.net/',
    featured: true,
    status: 'archived',
    year: 2022,
  },
];
