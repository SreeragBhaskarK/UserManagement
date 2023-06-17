import pool from '../config/connection.js'
import { getUsers, deleteUser, getUsersById, addUser, updateUser } from '../models/usersQueries.js'
import { loginAdmin } from '../models/adminQueries.js'
import sanitize from 'mongo-sanitize'
import { hashingPassword, verifyPassword } from '../util/bcrypt.js'
import { generateToken } from '../util/generateToken.js'
import { serialize } from 'pg-protocol'
// getting data
export const adminHome_get = async (req, res) => {
    const client = await pool.connect()
    try {
        const result = await client.query(getUsers)
        res.status(200).json({ success: true, result: result.rows })
    }
    catch (err) {
        res.status(404).json({ success: false, message: err.message })
    }
    finally {
        client.release()
    }
}
//login
export const adminLogin_post = async (req, res) => {
    const adminData = sanitize(req.body)
    const client = await pool.connect()

    try {
        const values = [adminData.email]
        const adminCheck = await client.query(loginAdmin, values)
    
        if (adminCheck.rowCount) {
            const password = await verifyPassword(adminData.password, adminCheck.rows[0].password)
            if (password) {
                const token = await generateToken(adminCheck.rows[0].id)
                const maxAge = 7 * 24 * 60 * 60 * 1000
                res.cookie('admin', token, { maxAge: maxAge, httpOnly: true })
                res.status(200).json({ success: true, message: 'successful', result: adminCheck.rows[0] })
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

//delete by userId

export const deleteUserById = async (req, res) => {
    const client = await pool.connect()
    const userId = sanitize(req.params.id)
    try {
       
        const userDel = await deleteUser
        const values = [userId]
        const result = await client.query(userDel, values)
  
        if (result.rowCount) {
            res.status(200).json({ success: true, message: 'successful' })
        } else {
            res.status(404).json({ success: false, message: 'not found' })
        }
    }
    catch (err) {
        res.status(404).json({ success: false, message: err.message })

    }
    finally {
        client.release()
    }

}

export const logoutAdmin = async (req, res) => {
    console.log('kdkdjkf');
    try {
        res.cookie('admin', '', {
            maxAge: 1, httpOnly: true
        })
        res.status(200).json({ success: true, message: 'successful' })
    }
    catch (err) {
        console.log(err.message);
        res.status(401).json({ success: false, message: err.message })
    }
   
}

export const userAdd = async (req, res) => {
    const userData = await sanitize(req.body)
    const client = await pool.connect()
    try {

        const password = await hashingPassword(userData.password)
        const values = [userData.name, userData.email, userData.phone, password]
        const result = await client.query(addUser, values)
        if (result.rowCount) {
            res.status(200).json({ success: true, message: 'successful' })
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

export const getUserById = async (req, res) => {
    const userId = await sanitize(req.params.id)
    const client = await pool.connect()
    try {
        const values = [userId]
        const result = await client.query(getUsersById, values)

        if (result.rowCount) {
            res.status(200).json({ success: true, result: result.rows[0] })
        } else {

            res.status(404).json({ success: false, message: "failed" })
        }
    }
    catch (err) {
        res.status(404).json({ success: false, message: err.message })
    }
    finally {
        client.release()
    }
}

export const updateUserAdmin = async (req, res) => {
    const updateData = sanitize(req.body)
    const client = await pool.connect()
    try {
        const values = [updateData.name, updateData.email, updateData.phone,updateData.id]
        const result = await client.query(updateUser, values)
        if (result.rowCount) {
            res.status(200).json({ success: true, message: 'successful' })
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