import { Order, OrderStatus, Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";



type CreateOrderPayload = {
    quantity: number;
    shippingAddress: string;
};


const createOrder = async (customerId: string,
    medicineId: string,
    data: CreateOrderPayload) => {
    return prisma.$transaction(async (tx) => {

        const medicine = await tx.medicine.findUniqueOrThrow({
            where: { id: medicineId },
        });
        const {
            name,
            price,
            stock,
            image,
        } = medicine;

        if (data.quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
        }

        if (data.quantity > stock) {
            throw new Error("Insufficient stock");
        }

        const totalAmount = price.mul(data.quantity);

        const order = await tx.order.create({
            data: {
                customerId,
                medicineId,
                medicineName: name,
                medicinePrice: price,
                quantity: new Prisma.Decimal(data.quantity),
                totalAmount,
                shippingAddress: data.shippingAddress,
            },
        });

        await tx.medicine.update({
            where: { id: medicineId },
            data: {
                stock: {
                    decrement: data.quantity,
                },
            },
        });

        return order;
    });
};

const getOrderById = async (orderId: string, customerId: string) => {
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            customerId,
        },
        include: {
            medicine: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
    });
    //   console.log(order);

    if (!order) {
        throw new Error("Order not found or access denied");
    }

    return order;
};

const getMyOrders = async (customerId: string) => {
    const orders = await prisma.order.findMany({
        where: {
            customerId,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            medicine: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
    });

    return orders;
};

const cancelOrder = async (orderId: string, customerId: string) => {
    return prisma.$transaction(async (tx) => {

        const order = await tx.order.findFirst({
            where: {
                id: orderId,
                customerId,
            },
        });

        if (!order) {
            throw new Error("Order not found or access denied");
        }

        if (order.status !== OrderStatus.PLACED) {
            throw new Error("Only placed orders can be cancelled");
        }

        const cancelledOrder = await tx.order.update({
            where: { id: order.id },
            data: {
                status: OrderStatus.CANCELLED,
            },
        });

        await tx.medicine.update({
            where: { id: order.medicineId },
            data: {
                stock: {
                    increment: order.quantity.toNumber(),
                },
            },
        });

        return cancelledOrder;
    });
};

const getSellerOrders = async (sellerId: string) => {
    const orders = await prisma.order.findMany({
        where: {
            medicine: {
                sellerId,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            medicine: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },

        },
    });

    return orders;
};

const getAllOrders = async () => {
    const orders = await prisma.order.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            medicine: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            }
        },
    });

    return orders;
};

const updateOrderStatusBySeller = async (orderId: string, sellerId: string, status: string) => {
    return prisma.$transaction(async (tx) => {
        const order = await tx.order.findUnique({
            where: { id: orderId },
            include: { medicine: true },
        });

        if (!order) throw new Error("Order not found");

        if (order.medicine.sellerId !== sellerId) {
            throw new Error("Unauthorized: This order does not belong to you");
        }


        const allowedStatuses = Object.values(OrderStatus);
        if (!allowedStatuses.includes(status as OrderStatus)) {
            throw new Error(`Invalid status. Allowed statuses: ${allowedStatuses.join(", ")}`);
        }

        const updatedOrder = await tx.order.update({
            where: { id: orderId },
            data: { status: status as OrderStatus },
        });

        return updatedOrder;
    });
};


export const ordersService = {

    createOrder,
    getOrderById,
    getMyOrders,
    cancelOrder,
    getSellerOrders,
    getAllOrders,
    updateOrderStatusBySeller





}