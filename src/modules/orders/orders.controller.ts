import { Request, Response } from "express";
import { UserRole } from "../../middileware/auth";
import { ordersService } from "./orders.service";




const createOrder = async (req: Request, res: Response) => {

    try {
        const user = req.user
        if (!user) {
            return res.status(401).json({
                success: false,
                error: "Unauthorized",
            });
        }
        if (user?.role !== 'CUSTOMER') {
            return res.status(400).json({
                success: false,
                error: "Only Customers are allowed to make Order",
            });
        }

        const data = req.body
        const medicineId = req.params.id as string;
        const customerId = user?.id as string

        const result = await ordersService.createOrder(customerId, medicineId, data)

        res.status(200).json({
            success: true,
            message: "Order Created Successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getOrderById = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const orderId = req.params.id;
        if (!orderId || typeof orderId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid order id",
            });
        }
        const result = await ordersService.getOrderById(orderId, req.user.id);

        res.status(200).json({
            success: true,
            message: "Order retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const getMyOrders = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const result = await ordersService.getMyOrders(req?.user?.id);

        res.status(200).json({
            success: true,
            message: "My orders retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message ,
        });
    }
};
const cancelOrder = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const orderId = req.params.id;

    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
    }

    const result = await ordersService.cancelOrder(
      orderId,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message ,
    });
  }
};

const getSellerOrders = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await ordersService.getSellerOrders(req.user.id);

    res.status(200).json({
      success: true,
      message: "Seller orders retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message ,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await ordersService.getAllOrders();

    res.status(200).json({
      success: true,
      message: "All orders retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch orders",
    });
  }
};

const updateOrderStatusBySeller = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const orderId = req.params.id;
    const { status } = req.body;

    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid order id" });
    }

    if (!status || typeof status !== "string") {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const result = await ordersService.updateOrderStatusBySeller(orderId, user.id, status);

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



export const ordersController = {
    createOrder,
    getOrderById,
    getMyOrders,
    cancelOrder,
    getSellerOrders,
    getAllOrders,
    updateOrderStatusBySeller




}