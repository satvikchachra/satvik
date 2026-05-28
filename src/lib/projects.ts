export interface Project {
  slug: string;
  title: string;
  company?: string;
  description: string;
  bullets: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: "active" | "archived" | "wip";
  year: number;
}

export const PROJECTS: Project[] = [
  {
    slug: "ai-coding-agent",
    title: "AI Coding Agent",
    company: "Atlassian",
    description:
      "AI-native editor and chat experience for VS Code and JetBrains — built for **2K+ engineers** daily, with **~95% shared** cross-platform code.",
    bullets: [
      "__Led end-to-end development__ of the AI-native editor and chat experience, including persistent conversation editors, attachments, @mentions, slash commands, image paste/upload, drag-and-drop, and keyboard-first interactions.",
      "Improved agent answer quality by designing structured context → prompt pipelines, including XML-based context blocks and transformation layers to provide higher-signal context to the agent.",
      "Built context providers powering the agent workflow: @Files & Folders, @Commit, @Branch, @Rules, @Docs, @Linter Errors, @Recent Changes, and @Past Chats.",
      "Extended agent capabilities through MCP integration (infra + UX), enabling users to connect MCP servers, discover tools, manage connection state, and safely interact with third-party systems.",
      "__Contributed to a cross-IDE platform architecture__ enabling **~95% shared code** between VS Code and JetBrains, significantly reducing duplication and increasing shipping velocity.",
      "Built extension and agent settings infrastructure end-to-end, including persistence, real-time synchronization, permissions/approval systems, and extensibility surfaces.",
    ],
    tags: ["TypeScript", "ReactJS", "NodeJS", "VS Code APIs", "JetBrains APIs", "AI SDK", "MCP", "ACP"],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    status: "active",
    year: 2025,
  },
  {
    slug: "predictive-test-selection",
    title: "Predictive Test Selection",
    company: "Atlassian",
    description:
      "ML-powered system predicting which tests should run per code change in local and CI/CD pipelines, using changed files and historical failure signals.",
    bullets: [
      "__Shipped ML models__ to predict which Unit, Integration, and VR tests should execute for a given code change across local and CI pipelines.",
      "Reduced test execution volume and improved developer feedback loops, resulting in faster build times, improved productivity, and lower infrastructure costs.",
      "__Drove a **~99% improvement** in p95 prediction API latency (**60s → 500ms**)__ by implementing Tecton feature store integration and Redis caching alongside FastAPI migration.",
      "Integrated Tecton as an online/offline feature store to ensure training-serving consistency, enable low-latency feature retrieval, and reduce feature drift in real-time predictions.",
      "__Contributed to MLOps infrastructure automation__ across the ML lifecycle: data ingestion, validation, labeling/splitting, training, retraining, testing, deployment, and serving.",
    ],
    tags: ["Python", "FastAPI", "Redis", "Tecton", "CI/CD", "MLOps"],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    status: "active",
    year: 2024,
  },
  {
    slug: "photai",
    title: "PhotAI",
    company: "AppyHigh",
    description:
      "AI-powered image editing and generation platform with background removal, object replacement, and AI avatar generation. Reached **700K+ users**.",
    bullets: [
      "__Led a team of 5 engineers__ to deliver the platform end-to-end across frontend, backend, infrastructure, and deployment workflows.",
      "Built AI-powered image editing capabilities including Background Remover, Object Replacer, and AI Avatar generation workflows.",
      "Designed secure media upload pipelines using AWS S3 for scalable image processing and storage.",
      "Integrated Stripe payments and Firebase One-Tap Google Authentication, and improved responsiveness of image editing workflows.",
    ],
    tags: ["NextJS", "ReactJS", "TypeScript", "Firebase", "StripeJS", "AWS S3"],
    githubUrl: undefined,
    liveUrl: "https://www.phot.ai/",
    featured: true,
    status: "active",
    year: 2023,
  },
  {
    slug: "scannergo",
    title: "ScannerGo",
    company: "AppyHigh",
    description:
      "Cloud-based storage and PDF toolkit platform with real-time file conversion, custom PDF viewer, and document management. Reached **500K+ users**.",
    bullets: [
      "__Led a team of 3 engineers__ to build and ship core document management and PDF tooling features.",
      "Built real-time file upload and conversion workflows using Socket APIs.",
      "Developed a custom PDF viewer enabling in-browser document viewing and interaction.",
      "Implemented Redux Thunk-based global state management architecture for scalable frontend workflows.",
      "Integrated CAPTCHA-based bot protection to reduce abuse and malicious traffic.",
    ],
    tags: ["ReactJS", "NextJS", "Redux", "Socket.IO", "Material UI"],
    githubUrl: undefined,
    liveUrl: "https://scannergo.net/",
    featured: true,
    status: "active",
    year: 2022,
  },
];

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getAllTags(): string[] {
  const tags = PROJECTS.flatMap((p) => p.tags);
  return [...new Set(tags)].sort();
}
