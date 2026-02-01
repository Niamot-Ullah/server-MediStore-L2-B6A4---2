import { Request, Response } from "express";
import { categoriesService } from "./categories.service";
import { UserRole } from "../../middileware/auth";


const createCategories = async (req: Request, res: Response) => {
    // console.log(req.body);
    try {
        const result = await categoriesService.createCategories(req.body)
        res.status(201).json({
            success: true,
            message: "Category Created Successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
}
const getAllCategories = async (req: Request, res: Response) => {
    try {
        const result = await categoriesService.getAllCategories()
        res.status(200).json({
            success: true,
            message: "Category Retrieved Successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
}
const updateCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req?.params?.id as string
        const user = req?.user
        const data = req.body
        if (!user) throw new Error('You are Unauthorized')
        const isAdmin = user.role === UserRole.ADMIN
        const result = await categoriesService.updateCategory(categoryId, data, isAdmin)
        res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
}
const deleteCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req?.params?.id as string
        const user = req?.user

        if (!user) throw new Error('You are Unauthorized')
        const isAdmin = user.role === UserRole.ADMIN

        const result = await categoriesService.deleteCategory(categoryId, isAdmin)
        res.status(200).json({
            success: true,
            message: "Category Deleted Successfully",
            data: result,
        });
    } catch (err) {
        const errorMessage = (err instanceof Error) ? err.message : "Post delete Failed"
        res.status(400).json({
            success: false,
            error: errorMessage,
            details: err
        });
    }
};



export const categoriesController = {
    createCategories,
    getAllCategories,
    updateCategory,
    deleteCategory

}