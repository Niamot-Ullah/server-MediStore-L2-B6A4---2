import express from 'express'
import auth, { UserRole } from '../../middileware/auth'
import { userController } from './user.controller'




const router = express.Router()


router.get('/me', auth(UserRole.ADMIN, UserRole.SELLER, UserRole.CUSTOMER),userController.getMyProfile)


router.get('/', auth(UserRole.ADMIN),userController.getAllUser)



router.patch('/status/:id', auth(UserRole.ADMIN),userController.updateUserProfile)











export const userRouter = router