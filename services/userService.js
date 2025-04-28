const jwt = require("jsonwebtoken");
const { users } = require("../config/database");
const { v4: uuidv4 } = require("uuid");

exports.register = (username, email, password) => {
  if (users.find((user) => user.username === username)) {
    throw Error("Username already taken");
  }
  const newUser = {
    id: uuidv4(),
    username,
    email,
    password,
    participatedProjects: [],
    ownedProjects: [],
  };
  users.push(newUser);
  return { ...newUser };
};

const secret_key = "bumanibirinchimartdatokenishlatishim";

exports.login = (email, password) => {
  if (
    !users.find((user) => user.email === email && user.password === password)
  ) {
    throw Error("Email or password incorrect!");
  }

  let token = jwt.sign({ email, password }, secret_key, { expiresIn: "1h" });
  if (!token) {
    return null;
  }
  return token;
};

exports.getAllusers = () => {
  return users;
};

exports.getUserByID = (id) => {
  const foundUser = users.find((user) => user.id === id);
  if (!foundUser) {
    return null;
  }
  return foundUser;
};

exports.updateUserById = (id, username, email, password) => {
  const foundUser = users.find((user) => user.id === id);
  if (!foundUser) {
    return null;
  }
  const updatedUser = {
    ...foundUser,
    username: username.length !== 0 ? username : foundUser.username,
    email: email.length !== 0 ? email : foundUser.email,
    password: password.length !== 0 ? password : foundUser.password,
  };
  users.push(updatedUser);
  return updatedUser;
};
