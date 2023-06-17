import { verifyPassword } from "../util/bcrypt.js"
import pool from "../config/connection.js"
import { loginUser, addUser, updateUser, uploadImages } from "../models/usersQueries.js"
import { hashingPassword } from "../util/bcrypt.js"
import { generateToken } from '../util/generateToken.js'
import sanitize from "mongo-sanitize"
import setImage from '../util/setImage.js'


export const home_get = (req, res) => {
    try {
        res.send('welcome')
    } catch (err) {

    }
}

export const login_post = async (req, res) => {
    const userData = await sanitize(req.body)

    const client = await pool.connect()
    try {
        const values = [userData.email]
        const userCheck = await client.query(loginUser, values)

        if (userCheck.rowCount) {
            const password = await verifyPassword(userData.password, userCheck.rows[0].password)
            if (password) {
                const token = await generateToken(userCheck.rows[0].id)
                const maxAge = 7 * 24 * 60 * 60 * 1000
                res.cookie('user', token, { maxAge: maxAge, httpOnly: true })
                res.status(200).json({ success: true, message: 'successful', result: userCheck.rows[0] })
            } else {
                res.status(401).json({ success: false, message: "incorrect password" })
            }
        } else {
            res.status(404).json({ success: false, message: "email is not found" })

        }

    }
    catch (err) {
        res.status(404).json({ success: false, message: err.message })
    }
    finally {
        client.release()
    }

}

export const signup_post = async (req, res) => {
    const userData = await sanitize(req.body)
    const client = await pool.connect();
    try {
        const password = await hashingPassword(userData.password)
        const values = [userData.name, userData.email, userData.phone, password]
        const result = await client.query(addUser, values);
        res.status(200).json({ success: true, message: 'signup successful' })
    }
    catch (err) {
        res.status(404).json({ success: false, message: err.message })
    }
    finally {
        client.release()
    }

}

export const logout_delete = (req, res) => {
    try {
        res.cookie('user', '', {
            maxAge: 1, httpOnly: true
        })
        res.status(200).json({ success: true, message: 'successful' })
    }
    catch (err) {
        res.status(404).json({ success: false, message: err.message })
    }

}

export const update_user = async (req, res) => {
    const updateData = await sanitize(req.body)
    const client = await pool.connect()
    try {
        const values = [updateData.name, updateData.email, updateData.phone, updateData.id]
        const result = await client.query(updateUser, values)
        if (result.rowCount) {
            res.status(200).json({ success: true, success: 'update success' })
        } else {

            res.status(400).json({ success: false, message: 'update failed' })
        }
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
    finally {
        client.release()
    }

}

export const uploadImage = async (req, res) => {
    const client = await pool.connect()
    try {
        const userId = req.userId.userId
    
        const image = await setImage(req.file)
        if (image) {
            const values = [image,userId]
            const result = await client.query(uploadImages, values)
            if (result.rowCount) {
                res.status(200).json({ success: true, message: 'success', result: image })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }
        } else {
            res.status(404).json({ success: false, message: 'failed' })
        }

    }
    catch (err) {
        res.status(404).json({ success: false, message: err.message })
    }
    finally {
        client.release()
    }
}