import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db";
import cors from 'cors'
// const bodyParser = require("body-parser")

//routes
import userRoutes from "./routes/userRoutes"
import postRoutes from "./routes/postRoutes"
import commentRoutes from "./routes/commentRoutes"

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    res.send("Server is running...");
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))