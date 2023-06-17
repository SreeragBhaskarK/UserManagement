import express from 'express'
const router = express.Router()
import {  login_post, logout_delete, signup_post,update_user, uploadImage } from '../controllers/userController.js'
import {verifyToken} from '../middleware/auth.js'
import upload from '../middleware/multer.js'


//login
router.post('/login',login_post)

//signup
router.post('/signup',signup_post)

//logout
router.delete('/logout',logout_delete)

//update user
router.patch('/update',update_user)

//upload image 
router.post('/upload_image',verifyToken,upload.single('image'),uploadImage)



export default router