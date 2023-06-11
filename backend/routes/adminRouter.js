import express from 'express'
import { adminHome_get } from '../controllers/adminController.js'
const router = express.Router()

router.get('/',adminHome_get)

//login
router.post('/login')



export default router