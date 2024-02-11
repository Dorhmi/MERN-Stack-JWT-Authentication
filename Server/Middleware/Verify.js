import jwt from 'jsonwebtoken'

export const verifyToken = async (req , res , next) => {
    try {
        const authHeader = req.headers.authorization;
        // console.log('Authorization Header:', authHeader);
        if(authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token , process.env.ACCESS_TOKEN_KEY , (err , user) => {
                if(err) {
                    res.status(401).json("Token is not valid")
                } else {
                    req.user = user
                    next()
                    // console.log('Decoded User:', user);
                }
            })
        } else {
            res.status(401).json("You are not authenticated!")
        }
    } catch (error) {
        res.status(500).send({message : error.message})
    }
}