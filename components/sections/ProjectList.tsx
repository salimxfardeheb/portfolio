import type { Project } from "@/app/data/projects/types";
import { ProjectRow } from "@/components/ui/ProjectRow";

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div>
      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
    </div>
  );
}
