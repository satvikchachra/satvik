import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { getAllProjects } from "@/lib/projects";
import { ProjectsList } from "@/components/projects/projects-list";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "A selection of AI systems, developer tools, and full stack engineering projects by Satvik Chachra.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-xl mx-auto px-6 pt-28 pb-24">
      <header className="mb-8 animate-fade-in-up stagger-0">
        <h1
          className="text-lg tracking-tight mb-2 text-text"
        >
          projects
        </h1>
        <p
          className="text-sm leading-relaxed text-text-muted"
        >
          AI systems, platform infrastructure, and developer tools.
        </p>
      </header>

      <div className="animate-fade-in-up stagger-1">
        <ProjectsList projects={projects} />
      </div>
    </div>
  );
}
