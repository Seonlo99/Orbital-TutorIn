import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db";
// const bodyParser = require("body-parser")

//routes
import userRoutes from "./routes/userRoutes"

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    res.send("Server is running...");
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))