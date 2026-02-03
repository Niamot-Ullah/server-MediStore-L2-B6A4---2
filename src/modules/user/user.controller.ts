import { Request, Response } from "express";
import { UserRole } from "../../middileware/auth";
import { userService } from "./user.service";



const getMyProfile = async (req: Request, res: Response) => {

    try {
        const userId = req.user?.id as string
        const result = await userService.getMyProfile(userId)

        res.status(200).json({
            success: true,
            message: "Data Retrieved Successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const getAllUser = async (req: Request, res: Response) => {

    try {
        const user = req?.user
        if (user?.role !== UserRole.ADMIN) {
            throw new Error('Unauthorized')
        }
        const result = await userService.getAllUser()

        res.status(200).json({
            success: true,
            message: "Data Retrieved Successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const updateMyProfile = async (req: Request, res: Response) => {
    try {

        const user = req?.user
        const data = req.body
        if (!user) throw new Error('You are Unauthorized')
        const userId = user.id

        const isAdmin = user.role === UserRole.ADMIN

        const result = await userService.updateMyProfile(data, userId, isAdmin)

        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
}




export const userController = {
    getMyProfile,
    updateMyProfile,
    getAllUser



}