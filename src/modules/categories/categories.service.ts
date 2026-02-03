import { Categories } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type CreateCategoriesInput = {
    name: string;
    description?: string;

};



const createCategories = async (data: CreateCategoriesInput) => {
    const result = await prisma.categories.create({
        data
    })
    return result
}
const getAllCategories = async () => {
    return await prisma.categories.findMany()
}
const updateCategory = async (categoryId: string, data: Partial<Categories>) => {
    const categoryData = await prisma.categories.findUniqueOrThrow({
        where: {
            id: categoryId
        }
    })

    return await prisma.categories.update({
        where: {
            id: categoryData.id
        },
        data
    })


}

const deleteCategory = async (categoryId: string) => {
    const categoryData = await prisma.categories.findUniqueOrThrow({
        where: {
            id: categoryId
        }
    })
    const result = await prisma.categories.delete({
        where: {
            id: categoryData.id
        }
    })
    return result
}



export const categoriesService = {
    createCategories,
    getAllCategories,
    updateCategory,
    deleteCategory

}