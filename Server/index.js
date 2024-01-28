
import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import multer from 'multer';


const app = express();
app.use(express.json());
app.use(cors());

app.get('/' , (req,res) => {
    res.status(234).send("Welcom")
})

const port= process.env.PORT || 3001;

app.listen(port , () => console.log(`App is listening to port : ${port}`))