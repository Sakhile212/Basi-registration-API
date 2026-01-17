const data = require("../data/users");

/* =====================
   CREATE USER
===================== */
exports.createUser = (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = {
    id: data.idCounter++,
    name,
    email,
    age
  };

  data.users.push(newUser);
  res.status(201).json(newUser);
};

/* =====================
   GET ALL USERS
===================== */
exports.getUsers = (req, res) => {
  res.json(data.users);
};

/* =====================
   GET USER BY ID
===================== */
exports.getUserById = (req, res) => {
  const user = data.users.find(
    u => u.id === parseInt(req.params.id)
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

/* =====================
   UPDATE USER
===================== */
exports.updateUser = (req, res) => {
  const user = data.users.find(
    u => u.id === parseInt(req.params.id)
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email, age } = req.body;

  user.name = name ?? user.name;
  user.email = email ?? user.email;
  user.age = age ?? user.age;

  res.json(user);
};

/* =====================
   DELETE USER
===================== */
exports.deleteUser = (req, res) => {
  const index = data.users.findIndex(
    u => u.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  data.users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
};
