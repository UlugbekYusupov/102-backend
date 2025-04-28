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

exports.getProjectById = (id) => {
  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex === -1) {
    return null;
  }
  return projects[projectIndex];
};

exports.getAllProjects = () => {
  return projects;
};
