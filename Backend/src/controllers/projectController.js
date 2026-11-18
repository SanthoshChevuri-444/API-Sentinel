import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} from '../services/projectService.js';

// Create a new project
export const createProjectController = (req, res) => {
  const { name, description } = req.body;

  const project = createProject({ name, description });

  res.status(201).json({
    message: 'Project created successfully',
    data: project
  });
};

// Get all projects
export const getAllProjectsController = (req, res) => {
  const projects = getAllProjects();

  res.status(200).json({
    message: 'Projects retrieved successfully',
    data: projects
  });
};


// Get a project by ID
export const getProjectByIdController = (req, res) => {
  const { id } = req.params;

  const project = getProjectById(id);

  if (!project) {
    return res.status(404).json({
      message: 'Project not found'
    });
  }

  res.status(200).json({
    message: 'Project retrieved successfully',
    data: project
  });
};


// Update a project
export const updateProjectController = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const project = updateProject(id, { name, description });

  if (!project) {
    return res.status(404).json({
      message: 'Project not found'
    });
  }

  res.status(200).json({
    message: 'Project updated successfully',
    data: project
  });
};

// Delete a project
export const deleteProjectController = (req, res) => {
  const { id } = req.params;

  const project = deleteProject(id);

  if (!project) {
    return res.status(404).json({
      message: 'Project not found'
    });
  }

  res.status(200).json({
    message: 'Project deleted successfully',
    data: project
  });
};
