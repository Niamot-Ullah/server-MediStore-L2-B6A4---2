import { User } from "better-auth/types";
import { Prisma, Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const getMyProfile = async (userId: string) => {
    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}
const getAllUser = async () => {
    return await prisma.user.findMany()
}



const updateUserProfile = async (
    id: string,
    data: Prisma.UserUpdateInput
) => {
    return await prisma.user.update({
        where: { id },
        data
    })
}








export const userService = {

    getMyProfile,
    updateUserProfile,
    getAllUser




}