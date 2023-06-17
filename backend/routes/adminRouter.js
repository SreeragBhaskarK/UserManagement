import express from 'express'
import { adminHome_get, adminLogin_post, deleteUserById,getUserById,logoutAdmin, userAdd ,updateUserAdmin} from '../controllers/adminController.js'
import {verifyTokenAdmin} from '../middleware/auth.js'
const router = express.Router()

//get data
router.get('/',verifyTokenAdmin,adminHome_get)

//login
router.post('/login',adminLogin_post)

//deleteById
router.delete('/delete/:id',verifyTokenAdmin,deleteUserById)

//logout
router.delete('/logout',verifyTokenAdmin,logoutAdmin)

//add
router.post('/add',verifyTokenAdmin,userAdd)

//getById
router.get('/:id',verifyTokenAdmin,getUserById)

//update
router.patch('/update',verifyTokenAdmin,updateUserAdmin)







export default router