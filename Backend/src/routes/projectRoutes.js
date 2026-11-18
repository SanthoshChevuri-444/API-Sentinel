import express from 'express';


import {
  createProjectController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController
} from '../controllers/projectController.js';

const router = express.Router();

// Create a project
router.post('/', createProjectController);

// Get all projects
router.get('/', getAllProjectsController);

// Get one project
router.get('/:id', getProjectByIdController);

// Update a project
router.put('/:id', updateProjectController);

// Delete a project
router.delete('/:id', deleteProjectController);

export default router;