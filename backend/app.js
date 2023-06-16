import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

//to use __dirname
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import upvoteRoutes from "./routes/upvoteRoutes.js";
import tagRoutes from "./routes/tagRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import transactionRoutes from "./routes/transactionRoutes.js"

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/votes", upvoteRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/transactions", transactionRoutes);

// static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads/")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
