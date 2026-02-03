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



const updateMyProfile = async (data: Prisma.UserUpdateInput, userId: string, isAdmin: boolean) => {


    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    })

    if (userData.id !== userId) throw new Error("Your are not authorized")

    if (!isAdmin) delete data.role
    if (!isAdmin) delete data.emailVerified


    return await prisma.user.update({
        where: {
            id: userData.id
        },
        data
    })


}







export const userService = {

    getMyProfile,
    updateMyProfile,
    getAllUser




}