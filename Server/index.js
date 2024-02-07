
import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import authRoutes from './Routes/authRoutes.js'
import userRoutes from './Routes/userRoutes.js'


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'))
dotenv.config();


app.get('/' , (req,res) => {
    res.status(234).send("Welcom")
})

app.use('/auth' , authRoutes);
app.use('/users' , userRoutes);

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
