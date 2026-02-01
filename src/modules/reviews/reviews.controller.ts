import { Request, Response } from "express";
import { reviewsService } from "./reviews.service";
import { UserRole } from "../../middileware/auth";


const createReviews = async (req: Request, res: Response) => {
     
    try {
        

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const { rating, comment } = req.body;
        const medicineId = req.params.id;
        const customerId = req.user.id;

        if (!rating || typeof rating !== "number") {
            return res.status(400).json({
                success: false,
                message: "Rating is required and must be a number",
            });
        }
        if (!medicineId || typeof medicineId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid medicine id",
            });
        }

        const payload = {
            rating,
            comment,
            customerId,
            medicineId,
        };
        

        const result = await reviewsService.createReviews(payload);

        res.status(201).json({
            success: true,
            message: "Review Created Successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create review",
        });
    }
};
const getMedicineReview = async (req: Request, res: Response) => {
     
    try {
        const medicineId = req.params.medicineId as string
        const result = await reviewsService.getMedicineReview(medicineId)

        res.status(200).json({
            success: true,
            message: "Review Retrieved Successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message ,
        });
    }
};

const updateReview = async (req: Request, res: Response) => {
    try {
        const reviewId = req?.params?.id as string
        const user = req?.user
        const data = req.body
        if (!user) throw new Error('You are Unauthorized')

        const isCustomer = user.role === UserRole.CUSTOMER
        const result = await reviewsService.updateReview(reviewId,data,isCustomer,user.id)
        res.status(200).json({
            success: true,
            message: "Review Updated Successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
}
const deleteReview = async (req: Request, res: Response) => {
    try {
        const reviewId = req?.params?.id as string
        const user = req?.user
        if (!user) throw new Error('You are Unauthorized')

        const isCustomer = user.role === UserRole.CUSTOMER
        

        const result = await reviewsService.deleteReview(reviewId, isCustomer)
        res.status(200).json({
            success: true,
            message: "Review Deleted Successfully",
            data: result,
        });
    } catch (err) {
        const errorMessage = (err instanceof Error) ? err.message : "Review delete Failed"
        res.status(400).json({
            success: false,
            error: errorMessage,
            details: err
        });
    }
};



export const reviewsController = {
    createReviews,
    getMedicineReview,
    updateReview,
    deleteReview

}