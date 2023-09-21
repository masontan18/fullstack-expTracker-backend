import jwt from "jsonwebtoken"

const verifyJwt = async (req, res, next) => {

    const token = req.headers.authorization || req.headers.Authorization;
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) => {
            if (err) {
                return res.sendStatus(403)
            }
            next()
        }
    )
}

export { verifyJwt }