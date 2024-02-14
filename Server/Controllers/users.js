import User from "../Models/User.js";

export const getAllUser = async (req, res) => {
    try {
        if (req.user) {
            const users = await User.find({});
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
export const getSingleUser = async (req, res) => {
    res.status(200).json("getSingleUser");
};
export const updateUser = async (req, res) => {
    res.status(200).json("updateUser");
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.id === id || req.user.isAdmin) {
            const user = await User.findByIdAndDelete(id);
            res.status(200).json("User has been deleted.");
        } else {
            res.status(403).json("You are not allowed to delete this user!");
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
