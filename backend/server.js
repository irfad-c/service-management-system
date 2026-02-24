import express from "express";
import cors from "cors";
import pool from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.port || 5000;

const connectDB = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Database connected");
  } catch (error) {
    console.error("Error in connecting database", error.message);
  }
};
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
