const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");

router.post("/", projectController.create);
router.get("/", projectController.getProjects);
router.delete("/:id", projectController.deleteProject);
router.get("/:id", projectController.getProject);
router.post("/:id", projectController.updateProject);

module.exports = router;
