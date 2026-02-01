import express from 'express'
import { reviewsController } from './reviews.controller'
import auth, { UserRole } from '../../middileware/auth'




const router = express.Router()


router.post('/:id', auth(UserRole.ADMIN, UserRole.SELLER, UserRole.CUSTOMER), reviewsController.createReviews)
router.get('/medicine/:medicineId', reviewsController.getMedicineReview)
router.patch('/:id', auth(UserRole.CUSTOMER), reviewsController.updateReview)
router.delete('/:id', auth(UserRole.CUSTOMER), reviewsController.deleteReview)









export const reviewsRouter = router