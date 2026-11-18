import { randomUUID } from 'node:crypto';

// Temporary storage for projects
const projects = [];

// Create a new project
export const createProject = ({ name, description }) => {
  const now = new Date();

  const project = {
    id: randomUUID(),
    name,
    description: description ?? null,
    createdAt: now,
    updatedAt: now
  };

  projects.push(project);

  return project;
};
// Get all projects
export const getAllProjects = () => {
  return projects;
};

// Get a project by ID
export const getProjectById = (id) => {
  return projects.find((project) => project.id === id) || null;
};

// Update a project
export const updateProject = (id, { name, description }) => {
  const project = getProjectById(id);

  if (!project) {
    return null;
  }

  if (name !== undefined) {
    project.name = name;
  }

  if (description !== undefined) {
    project.description = description;
  }

  project.updatedAt = new Date();

  return project;
};

// Delete a project
export const deleteProject = (id) => {
  const projectIndex = projects.findIndex(
    (project) => project.id === id
  );

  if (projectIndex === -1) {
    return null;
  }

  const [deletedProject] = projects.splice(projectIndex, 1);

  return deletedProject;
};