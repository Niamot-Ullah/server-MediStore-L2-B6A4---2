import { Request, Response } from "express";
import { medicineService } from "./medicine.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { UserRole } from "../../../generated/prisma/enums";

const createMedicine = async (req: Request, res: Response) => {

    try {
        if (!req.user) {
            return res.status(400).json({
                success: false,
                error: "Unauthorized",
            });
        }

        console.log(req.user);
        const result = await medicineService.createMedicine(req.body, req.user.id)
        res.status(201).json({
            success: true,
            message: "Medicine Created Successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
}

const getAllMedicine = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;
        const searchString = typeof search === "string" ? search : undefined;

        const isFeatured = req.query.isFeatured
            ? req.query.isFeatured === "true"
                ? true
                : req.query.isFeatured === "false"
                    ? false
                    : undefined
            : undefined;

        const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(req.query);

        // DEBUG: Log the parameters
        console.log('Query params:', { search: searchString, isFeatured, page, limit, skip, sortBy, sortOrder });

        const result = await medicineService.getAllMedicine({
            search: searchString,
            isFeatured,
            page,
            limit,
            skip,
            sortBy,
            sortOrder
        });

        // DEBUG: Log the result
        console.log('Result:', {
            dataLength: result.data?.length,
            pagination: result.pagination
        });

        res.status(200).json({
            success: true,
            message: "Data Retrieved Successfully",
            data: result
        });
    } catch (error) {
        console.error('Error in getAllMedicine:', error);
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
const getMyPostedMedicine = async (req: Request, res: Response) => {
    try {
        const user = req.user
        if (!user) throw new Error('You are Unauthorized')
        const userId = user?.id
        const result = await medicineService.getMyPostedMedicine(userId)

        
        res.status(200).json({
            success: true,
            message: "Seller Data Retrieved Successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
};
const getStats = async (req: Request, res: Response) => {
    try {

        const result = await medicineService.getStats()
        res.status(200).json({
            success: true,
            message: "Data Retrieved Successfully",
            data: result,
        });
    } catch (err) {
        const errorMessage = (err instanceof Error) ? err.message : "stats retrieved Failed"
        res.status(400).json({
            success: false,
            error: 'errorMessage',
            details: errorMessage
        });
    }
};




const getMedicineById = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id
        const result = await medicineService.getMedicineById(id as string)
        res.status(200).json({
            success: true,
            message: "Data Retrieved Successfully",
            data: result,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
}
const updateMedicine = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id as string
        const user = req?.user
        const data = req?.body
        if (!user) throw new Error('You are Unauthorized')
        const isSeller = user.role === UserRole.SELLER
        const isAdmin = user.role === UserRole.ADMIN
        const userId = user?.id

        const result = await medicineService.updateMedicine(id, userId, data, isSeller, isAdmin)


        res.status(200).json({
            success: true,
            message: "Data Updated Successfully",
            data: result,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
}
const deleteMedicine = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id as string
        const user = req?.user
        if (!user) throw new Error('You are Unauthorized')
        const isSeller = user.role === UserRole.SELLER
        const isAdmin = user.role === UserRole.ADMIN
        const userId = user?.id
        const result = await medicineService.deleteMedicine(id, userId, isSeller, isAdmin)
        res.status(200).json({
            success: true,
            message: "Data Deleted Successfully",
            data: result,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
}





export const medicineController = {
    createMedicine,
    getAllMedicine,
    getMedicineById,
    updateMedicine,
    deleteMedicine,
    getMyPostedMedicine,
    getStats,

}