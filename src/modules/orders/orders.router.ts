import express from 'express'
import auth, { UserRole } from '../../middileware/auth'
import { ordersController } from './orders.controller'





const router = express.Router()


router.post('/:id', auth(UserRole.ADMIN, UserRole.SELLER, UserRole.CUSTOMER), ordersController.createOrder)

router.get("/my",auth(UserRole.CUSTOMER),ordersController.getMyOrders);
router.get("/:id", auth(UserRole.CUSTOMER), ordersController.getOrderById);

router.patch("/:id/cancel",auth(UserRole.CUSTOMER),ordersController.cancelOrder
);


router.get("/seller",auth(UserRole.SELLER,UserRole.ADMIN),ordersController.getSellerOrders);

router.get("/",auth(UserRole.ADMIN),ordersController.getAllOrders);





export const ordersRouter = router