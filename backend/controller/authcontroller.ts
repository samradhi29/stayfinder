import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User.ts";
import bcrypt from "bcrypt";

const JWT_SECRET = "sam"; // move to .env in real apps

// Register controller
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ msg: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: IUser = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err });
  }
};

// ✅ Login controller
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err });
  }
};

