import User from '../Models/User.js'

export const getAllUser = async (req , res) => {
    try { 
        if(req.user){
            const users = await User.find({})
            res.status(200).json(users)
        }
    } catch (error) {
        res.status(500).send({message: error.message})
    }
} 
export const getSingleUser = async (req , res) => {
    res.status(200).json('getSingleUser')
} 
export const updateUser = async (req , res) => {
    res.status(200).json('updateUser')
} 
export const deleteUser = async (req , res) => {
    res.status(200).json('deleteUser')
} 