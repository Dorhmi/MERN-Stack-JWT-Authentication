
import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'
// import authRoutes from './Routes/authRoutes';
// import userRoutes from "./Routes/userRoutes";


const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/assets' , express.static(path.join(__dirname, "public/assets")));

app.get('/' , (req,res) => {
    res.status(234).send("Welcom")
})

// app.use('/auth' , authRoutes);
// app.use('/users' , userRoutes);

const PORT = process.env.PORT;
const URL = process.env.MONGO_URL;

mongoose.connect(URL)
.then(()=>{
    console.log('App connected to database');
    app.listen(PORT , () => console.log(`App is listening to port : ${PORT}`))
})
.catch((error) => {
    console.log(error);
})
