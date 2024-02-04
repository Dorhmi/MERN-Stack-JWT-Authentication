import jwt from 'jsonwebtoken'

export const verifyToken = async (req , res , next) => {
    try {
        const authHeader = req.headers.authorization;
        if(authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token , process.env.ACCESS_TOKEN_KEY , (err , user) => {
                if(err) {
                    res.status(401).json("Token is not valid!")
                }
                req.user = user
                next()
            })
        } else {
            res.status(401).json("You are not authenticated!")
        }
    } catch (error) {
        res.status(500).send({message : error.message})
    }
}