const { v4: uuidv4 } = require("uuid");
const { projects, users } = require("../config/database");

exports.createProject = (
  title,
  desctiption,
  status,
  ownerId,
  members,
  deadlie
) => {
  const newProject = {
    id: uuidv4(),
    title,
    desctiption,
    status,
    ownerId,
    members: [],
    deadlie,
    craeted_at: new Date().toString(),
    updated_at: new Date().toString(),
  };

  const user = users.find((user) => user.id === ownerId);
  user.ownedProjects.push(newProject);

  projects.push(newProject);
  return { ...newProject };
};

exports.deleteProjectById = (id, ownerId) => {
  const projectIndex = projects.findIndex((project) => project.id === id);
  const user = users.find((user) => user.id === ownerId);
  console.log(user);

  if (projectIndex === -1) {
    return null;
  }
  projects.splice(projectIndex, 1);

  user.ownedProjects.splice(
    user.ownedProjects.findIndex((project) => project.id === id),
    1
  );

  return true;
};

exports.getProjectById = (id, ownerId) => {
  const user = users.find((user) => user.id === ownerId);
  if (!user) {
    throw new Error("User not found");
  }

  const project = user.ownedProjects.find((project) => project.id === id);
  if (!project) {
    throw new Error("Project not found");
  }
  return project;
};

exports.getAllProjects = (ownerId) => {
  return users.find((user) => user.id === ownerId).ownedProjects;
};

exports.updateProject = (
  id,
  title,
  description,
  status,
  deadline,
  members,
  ownerId
) => {
  const user = users.find((user) => user.id === ownerId);
  const projects = user.ownedProjects;

  const updatedProject = {
    id,
    title: title.length !== 0 ? title : projects[index].title,
    description:
      description.length !== 0 ? description : projects[index].description,
    status: status.length !== 0 ? status : projects[index].status,
    deadline: deadline.length !== 0 ? deadline : projects[index].deadline,
    updatedAt: new Date(),
  };
  projects[index] = updatedProject;
  return updatedProject;
};
