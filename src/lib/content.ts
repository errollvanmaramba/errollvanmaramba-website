import projects from "../content/projects.generated.json";
import type { Project } from "../types/content";

export const allProjects = projects as Project[];

export const featuredProjects = allProjects.filter((project) => project.featured);
