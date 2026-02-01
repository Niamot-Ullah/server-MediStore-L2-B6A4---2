import express from 'express'
import auth, { UserRole } from '../../middileware/auth'
import { userController } from './user.controller'




const router = express.Router()


router.get('/', auth(UserRole.ADMIN, UserRole.SELLER, UserRole.CUSTOMER),userController.getMyProfile)
router.patch('/', auth(UserRole.ADMIN, UserRole.SELLER, UserRole.CUSTOMER),userController.updateMyProfile)










export const userRouter = router