import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

//Register User

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        //check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        //HashPassword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //createUser
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        res.status(201).json({
            message: "User registerd successfully",
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
                isApproved: user.isApproved,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//LoginUser

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not Found" });

        }
        //Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        res.status(200).json({
            message: "Login Successful",
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
                isApproved: user.isApproved,
            },
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}