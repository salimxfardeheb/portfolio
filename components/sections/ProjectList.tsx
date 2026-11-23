import type { Project } from "@/content/site";
import { ProjectRow } from "@/components/ui/ProjectRow";

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div>
      {projects.map((project, i) => (
        <ProjectRow key={project.name} code={`P.${String(i + 1).padStart(2, "0")}`} project={project} />
      ))}
    </div>
  );
}
