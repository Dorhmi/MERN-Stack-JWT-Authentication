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
const generateAccessToken  = (user) => {
    return jwt.sign({id: user.id , isAdmin: user.isAdmin} , process.env.ACCESS_TOKEN_KEY , {expiresIn: "5s"});
};
const generateRefreshToken = (user) => {
    return jwt.sign({id: user.id , isAdmin: user.isAdmin} , process.env.REFRESH_TOKEN_KEY);
};
const refreshTokens = [];
export const login = async (req ,res) => {
    try {
        const {password , email} = req.body
        const user = await User.findOne({email})
        if (user.password === password) {
                const  accessToken = generateAccessToken(user)
                const  refreshToken = generateRefreshToken(user)
                refreshTokens.push(refreshToken);
                res.status(200).json({
                    accessToken,
                    refreshToken,
                    isSuccess : true
                })
        }
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}
export const refresh = async (req ,res) => {
    const refreshToken = req.body.refreshToken

    if(!refreshToken) {
        return res.status(401).json("You are not authenticated!");
    }
    if(!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid!")
    }
    jwt.verify(refreshToken , process.env.REFRESH_TOKEN_KEY , (err , user) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        })
    })
    res.status(200).json('refresh')
}