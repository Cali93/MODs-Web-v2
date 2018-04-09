const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const ProjectsController = require ('../controllers/projects');

// Handle incoming GET requests to /projects
router.get("/", ProjectsController.get_all_projects);

// Should this action be done ?
// router.post("/", checkAuth, ProjectsController.create_project);

router.get("/:projectId", ProjectsController.get_project);

router.patch("/:projectId", checkAuth, ProjectsController.update_project);

router.delete("/:projectId", checkAuth, ProjectsController.delete_project);

module.exports = router;