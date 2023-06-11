import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()
export const generateToken = (userId) => {
    const maxAge = 7 * 24 * 60 * 60 * 1000
    jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn:maxAge
    })
}