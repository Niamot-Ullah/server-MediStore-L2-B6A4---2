import { Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type CreateReviewPayload = {
    rating: number;
    comment?: string;
    customerId: string;
    medicineId: string;
};

const createReviews = async (payload: CreateReviewPayload) => {
    const review = await prisma.review.create({
        data: {
            rating: payload.rating,
            comment: payload.comment ?? null,
            customerId: payload.customerId,
            medicineId: payload.medicineId,
        },
    });

    return review;
};
const getMedicineReview = async (medicineId: string) => {
    return await prisma.review.findMany({
        where: { medicineId },
    })
}



const updateReview = async (reviewId: string, data: Partial<Review>, isCustomer: boolean, userId: string) => {
    const reviewData = await prisma.review.findUniqueOrThrow({
        where: {
            id: reviewId
        }
    })
    if (!isCustomer && (reviewData.customerId !== userId)) throw new Error("Your are not authorized")
    return await prisma.review.update({
        where: {
            id: reviewData.id
        },
        data
    })


}



const deleteReview = async (reviewId: string, isCustomer: boolean) => {
    const reviewData = await prisma.review.findUniqueOrThrow({
        where: {
            id: reviewId
        }
    })
    if (!isCustomer) throw new Error("Your are not owner of this review")
    const result = await prisma.review.delete({
        where: {
            id: reviewData.id
        }
    })
    return result
}




export const reviewsService = {
    createReviews,
    getMedicineReview,
    updateReview,
    deleteReview


}