import express from 'express'
import { categoriesController } from './categories.controller'

import auth, { UserRole } from '../../middileware/auth';


const router = express.Router()


router.post('/' ,categoriesController.createCategories)
router.get('/',categoriesController.getAllCategories)
router.patch('/:id',auth(UserRole.ADMIN),categoriesController.updateCategory)

router.delete('/:id',auth(UserRole.ADMIN),categoriesController.deleteCategory)








export const categoriesRouter = router