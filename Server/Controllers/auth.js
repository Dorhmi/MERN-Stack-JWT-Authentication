import User from "../Models/User.js"
import jwt from "jsonwebtoken";


export const register = async (req ,res) => {
    try {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            picture: req.file.originalname,
            picturePath: req.file.path,
            isAdmin: false
        })
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).send({message : error.message})
    }
}
export const login = async (req ,res) => {
    try {
        const {password , email} = req.body
        const user = await User.findOne({email})
        if (user.password === password) {
                const  accessToken = jwt.sign({id: user.id , isAdmin: user.isAdmin} , process.env.ACCESS_TOKEN_KEY , {expiresIn: "5s"})
                res.status(200).json({
                    accessToken : accessToken,
                    isSuccess : true
                })
        }
    } catch (error) {
        
    }
}
export const refresh = async (req ,res) => {
    res.status(200).json('refresh')
}