import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { getAllProjects, getAllTags } from "@/lib/projects";
import { ProjectsList } from "@/components/projects/projects-list";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "A selection of AI systems, developer tools, and platform engineering projects by Satvik Chachra.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  const tags = getAllTags();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <header className="mb-12">
        <h1
          className="text-4xl md:text-5xl font-semibold mb-6"
          style={{ color: "var(--text)" }}
        >
          Projects
        </h1>
        <p className="text-lg max-w-2xl" style={{ color: "var(--text-muted)" }}>
          A mix of AI systems, platform infrastructure, and developer tools.
          Links are placeholders — work in progress.
        </p>
      </header>

      <ProjectsList projects={projects} allTags={tags} />
    </div>
  );
}
