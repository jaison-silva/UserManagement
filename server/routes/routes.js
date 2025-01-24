import express from 'express';
import { userLogin, registerUser, home, profile, admin, logout, deleteUser, updateUser, upload} from '../controllers/controller.js';
import {userTokenAuthenticator, AdminTokenAuthenticator} from '../middleware/auth.js';
import multerUpload from '../config/multer.js';

const router = express.Router();

// ithellam user routes
router.post('/',(req,res,next)=>{
    console.log("userlogin reached")
    next()
},userLogin)
router.post('/registerUser',registerUser)

router.get('/home',userTokenAuthenticator,home)
router.get('/profile',userTokenAuthenticator,profile)
router.post('/upload',multerUpload,userTokenAuthenticator,upload)
router.get('/logout',logout)

//ithellam admin routes ahn
router.get('/admin',AdminTokenAuthenticator,admin)
router.delete('/delete/:email',AdminTokenAuthenticator,deleteUser)
router.put("/updateUser",AdminTokenAuthenticator,updateUser)

export default router