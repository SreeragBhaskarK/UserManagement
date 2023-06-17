import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    const token = await req.cookies.user
    try {
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ success: false, message: "Permission denied" })
                } else {
                    req.userId = decodedToken
                    next()
                }
            })

        } else {
            res.status(401).json({ success: false, message: 'Permission denied' })
        }
    }
    catch (err) {
        res.status(401).json({ success: false, message: err.message })
    }
}

// Admin
export const verifyTokenAdmin = async (req, res, next) => {
    const token = await req.cookies.admin
    try {
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ success: false, message: "Permission denied" })
                } else {
                    req.userId = decodedToken
                    next()
                }
            })

        } else {
            res.status(401).json({ success: false })
        }
    }
    catch (err) {
        res.status(401).json({ success: false, message: err.message })
    }
}
