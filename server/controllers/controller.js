import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/schema.js";
import bcrypt from "bcryptjs";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    console.log(
      "this is the email" + email,
      "this is the name " + name + "this is the pass " + password
    );

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "User already exists", redirect: "/" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("data saved");

    return res.status(200).json({
      message: "user registered and data saved",
      redirect: "/",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("this is the email " + email, "this is the pass " + password);

    const existingUser = await User.findOne({ email });

    if (
      email == process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASS
    ) {
      const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
        expiresIn: "10m",
      });

      return res
        .status(200)
        .cookie("adminAuthJwt", token, {
          httpOnly: true,
          secure: false,
          sameSite: "Strict",
          path: "/",
          maxAge: 600000,
        })
        .json({ message: "successful admin email found", redirect: "/admin" });
    } else if (!existingUser) {
      return res.status(200).json({ message: "User not founddd" });
    }

    bcrypt.compare(password, existingUser.password, (err, isMatch) => {
      if (err) {
        console.log(err);
        throw new Error();
      }
      if (isMatch) {
        const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
          expiresIn: "10m",
        });
        console.log("logged in");

        return res
          .status(200)
          .cookie("userAuthJwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            path: "/",
            maxAge: 600000,
          })
          .json({
            message: "successfull",
            redirect: "/home",
            user: {
              email: existingUser.email,
              name: existingUser.name,
            },
            reduxStore : new Date().toString()
          });
      } else {
        return res.status(400).json({ message: "Invalid password bro" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const home = async (req, res) => {
  if (!req.user) {
    console.log("Unauthorized: No user data @ /home");
    return res.status(401).json({ message: "Unauthorized: No user data" });
  }

  console.log("home reached");

  const userEmail = req.user.email;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const profile = async (req, res) => {
  if (!req.user) {
    console.log("Unauthorized: No user data @ /home");
    return res.status(401).json({ message: "Unauthorized: No user data" });
  }

  console.log("profile reached");

  const userEmail = req.user.email;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const admin = async (req, res) => {
  const user = await User.find();
  // console.log("admin data",req.admin)
  return res
    .status(200)
    .json({ message: "successful", user, admin: req.admin });
};

export const logout = (req, res) => {
  try {
    const cookiesList = req.cookies;

    for (const val in cookiesList) {
      res.clearCookie(val, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
      });
    }

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { email } = req.params;

  try {
    const result = await User.deleteOne({ email });
    console.log("user delete reached");
    if (result.deletedCount > 0) {
      res.status(200).send({ message: "User deleted successfully" });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    console.log("reached update user controller");
    const { email } = req.body;
    const updatedUser = await User.findOneAndUpdate({ email }, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "done", updatedUser });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
};

export const upload = async (req, res) => {
  const userEmail = req.user.email;

  const dbResponse = await User.findOneAndUpdate(
    { email: userEmail },
    {
      storageLocation: req.file.path,
    }
  );

  console.log(dbResponse);
  try {
    res.status(200).json({
      message: "File uploaded successfully!",
      filePath: req.file.path,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "failed" });
  }
};
