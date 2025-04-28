const userService = require("../services/userService");

exports.register = (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(401).json({ message: "Fill all required fields" });
  }
  try {
    const user = userService.register(username, email, password);
    res.status(201).json({ user, message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    let token = userService.login(email, password);
    return res.status(200).json({ token, message: "Succesfully login" });
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

exports.getUsers = (req, res) => {
  const users = userService.getAllusers();
  return res.status(200).json([...users]);
};

exports.getUserById = (req, res) => {
  const { id } = req.params.id;
  const foundUser = userService.getUserByID(id);
  if (!foundUser) {
    return res.status(404).json({ message: "User not found!" });
  }
  return res.status(200).json({ ...foundUser });
};

exports.updateUser = (req, res) => {
  const { id } = req.params.id;
  const { username, email, password } = req.body;

  const updatedUser = userService.updateUserById(id, username, email, password);
  return res
    .status(201)
    .json({ updatedUser, message: "Updated successfully!" });
};
