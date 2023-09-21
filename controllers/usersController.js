import prisma from "../src/utils/prisma.js"; // use prisma client to send queries to database
import bcrypt from "bcrypt";

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: "asc"
      }
    });
    if (users.length == 0) {
      return res.sendStatus(204); // 204 No Content
    }
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

const createNewUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email, and password are required" });
    }
    const foundUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (foundUser) {
      return res.status(400).json({ "message": "duplicate email" });
    }
    if (password.length < 8) {
      return res.status(400).json({ "message": "password should be at least 8 characters" });
    }
    if (!(email.includes("@"))) {
      return res.status(400).json({ "message": "please enter an valid email" })
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    const result = await prisma.user.create({
      data: {
        email: email,
        password: hashedPwd,
      },
    });
    console.log(`New user: ${email} added`);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id) {
      return res.status(400).json({ message: "User ID is required for update" });
    }
    const foundUser = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!foundUser) {
      return res.status(400).json({ "message": "no user record found" });
    }

    if (password) {
      const hashedPwd = await bcrypt.hash(password, 10);
      const result = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          password: hashedPwd,
        },
      });
      console.log("password updated successfully");
      res.json(result);
    } 
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "User ID is required for delete" });
    }
    const foundUser = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!foundUser) {
      return res.status(400).json({ "message": "no user record found" });
    }
    const result = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    console.log("User deleted successfully");
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      return res.status(400).json({ "message": "no user record found" });
    }
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export { getAllUsers, createNewUser, updateUser, deleteUser, getUser };