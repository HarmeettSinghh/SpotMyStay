import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth" , authRoutes);

app.get("/",(req,res)=>{
    res.send("SpotMyStay API Running....")
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})