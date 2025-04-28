const projectService = require("../services/projectService");

exports.create = (req, res) => {
  const { title, desctiption, status, ownerId, members, deadlie } = req.body;
  try {
    const project = projectService.createProject(
      title,
      desctiption,
      status,
      ownerId,
      members,
      deadlie
    );
    return res.status(201).json({ message: "Project created", project });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProjects = (req, res) => {
  const { ownerId } = req.body;
  try {
    const projects = projectService.getAllProjects(ownerId);
    if (projects) {
      return res.status(200).json(projects);
    }
    return res.status(404).json({ message: "Project not found" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteProject = (req, res) => {
  const { id } = req.params;
  const { ownerId } = req.body;

  try {
    const project = projectService.deleteProjectById(id, ownerId);
    if (project) {
      return res.status(200).json({ message: "Project remover successfully" });
    }
    return res.status(404).json({ message: "Project not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getProject = (req, res) => {
  const { id } = req.params;
  const { ownerId } = req.body;
  try {
    const project = projectService.getProjectById(id, ownerId);
    if (project != null) {
      return res.status(200).json({ project });
    }
    return res.status(404).json({ message: "Project not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateProject = (req, res) => {
  const { id } = req.params;
  const { ownerId } = req.body;
  const { title, description, status, deadline, members } = req.body;
  const updatedTasks = projectService.updateProject(
    id,
    title,
    description,
    status,
    deadline,
    members,
    ownerId
  );
  try {
    return res
      .status(201)
      .json({ updatedTasks, message: "Tasks updated successfully!" });
  } catch {
    return res
      .status(500)
      .json({ message: "Failed to update tasks", error: err.message });
  }
};
