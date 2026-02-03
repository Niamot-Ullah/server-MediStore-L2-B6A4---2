import express from 'express'
import auth, { UserRole } from '../../middileware/auth'
import { userController } from './user.controller'




const router = express.Router()


router.get('/me', auth(UserRole.ADMIN, UserRole.SELLER, UserRole.CUSTOMER),userController.getMyProfile)


router.get('/', auth(UserRole.ADMIN),userController.getAllUser)



router.patch('/status', auth(UserRole.ADMIN),userController.updateMyProfile)











export const userRouter = router