import express from 'express'
import { medicineController } from './medicine.controller'
import auth, { UserRole } from '../../middileware/auth'

const router = express.Router()



router.post('/', auth(UserRole.ADMIN, UserRole.SELLER), medicineController.createMedicine)
router.get('/', medicineController.getAllMedicine)
router.get('/my-posted-medicine', auth(UserRole.ADMIN, UserRole.SELLER), medicineController.getMyPostedMedicine)
router.get('/stats',medicineController.getStats)


router.get('/details/:id', medicineController.getMedicineById)
router.patch('/:id', auth(UserRole.ADMIN, UserRole.SELLER), medicineController.updateMedicine)
router.delete('/:id', auth(UserRole.ADMIN, UserRole.SELLER), medicineController.deleteMedicine)











export const medicineRouter = router