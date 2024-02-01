import User from "../Models/User.js"

export const register = async (req ,res) => {
    try {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            picture: req.file.originalname,
            picturePath: req.file.path
        })
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).send({message : error.message})
    }
}
export const login = async (req ,res) => {
    res.status(200).json('login')
}
export const refresh = async (req ,res) => {
    res.status(200).json('refresh')
}