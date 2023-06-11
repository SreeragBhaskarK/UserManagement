import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.user
    if (token) {
        const result = await jwt.verify(token, process.env.JWT_SECRET)
        if (result) {
            next()
        } else {
            res.status(401).json({ success: false })
        }
    } else {
        res.status(401).json({ success: false })
    }
}