const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER USER
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) return res.json({ error: "Email already exists" });

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPass });

    res.json({ message: "User Registered Successfully", user: newUser });
  } catch (error) {
    res.json({ error });
  }
};

// LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exist = await User.findOne({ email });
    if (!exist) return res.json({ error: "User not found" });

    const match = await bcrypt.compare(password, exist.password);
    if (!match) return res.json({ error: "Invalid credentials" });

    res.json({ message: "Login Successful", user: exist });
  } catch (error) {
    res.json({ error });
  }
};
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.json({ error });
  }
}