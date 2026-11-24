import type { Project } from "@/content/site";
import { ProjectRow } from "@/components/ui/ProjectRow";

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div>
      {projects.map((project) => (
        <ProjectRow key={project.name} project={project} />
      ))}
    </div>
  );
}
