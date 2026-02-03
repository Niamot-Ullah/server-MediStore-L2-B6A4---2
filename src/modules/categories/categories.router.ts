import express from 'express'
import { categoriesController } from './categories.controller'

import auth, { UserRole } from '../../middileware/auth';


const router = express.Router()


router.post('/', categoriesController.createCategories)
router.get('/', categoriesController.getAllCategories)
router.patch('/:id', categoriesController.updateCategory)

router.delete('/:id', categoriesController.deleteCategory)








export const categoriesRouter = router