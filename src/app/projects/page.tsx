import type { Metadata } from 'next';
import { buildMetadata, siteConfig } from '@/lib/metadata';
import { getAllProjects } from '@/lib/projects';
import { ProjectsList } from '@/components/projects/projects-list';
import { PROJECTS_CONTENT } from '@/lib/content';

export const metadata: Metadata = buildMetadata({
  title: 'Projects',
  description:
    'A selection of AI systems, developer tools, and full stack engineering projects by Satvik Chachra.',
  path: '/projects',
});

export default function ProjectsPage() {
  const projects = getAllProjects();

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteConfig.url,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Projects',
          item: `${siteConfig.url}/projects`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: project.title,
          description: project.description,
          url: project.liveUrl || project.githubUrl || siteConfig.url,
          applicationCategory: 'SoftwareApplication',
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-xl mx-auto px-6 pt-28 pb-12">
        <header className="mb-8 animate-fade-in-up stagger-0">
          <h1 className="text-lg tracking-tight mb-2 text-text">{PROJECTS_CONTENT.heroTitle}</h1>
          <p className="text-sm leading-relaxed text-text-muted">{PROJECTS_CONTENT.heroSubtitle}</p>
        </header>

        <div className="animate-fade-in-up stagger-1">
          <ProjectsList projects={projects} />
        </div>
      </div>
    </>
  );
}
