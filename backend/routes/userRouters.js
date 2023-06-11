import express from 'express'
const router = express.Router()
import { home_get, login_post, signup_post } from '../controllers/userController.js'


router.get('/',home_get)

//login
router.post('/login',login_post)

//signup
router.post('/signup',signup_post)


export default router