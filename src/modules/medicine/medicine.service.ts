import { Medicine, Prisma } from "../../../generated/prisma/client";
import { MedicineWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";


type CreateMedicineInput = {
    name: string;
    description?: string;
    categoryId: string;
    price: Prisma.Decimal | number | string;
    stock: number;
    image?: string;
    isActive?: boolean;
};

const createMedicine = async (data: CreateMedicineInput, userId: string) => {
    const result = await prisma.medicine.create({
        data: {
            ...data,
            sellerId: userId
        }
    })
    return result
}

// const getAllMedicine = async (payload: {
//     search: string | undefined,
//     isFeatured: boolean | undefined,
//     page: number;
//     limit: number;
//     skip: number;
//     sortBy: string;
//     sortOrder: string;

// }) => {
//     const { search, isFeatured, page, limit, skip, sortBy, sortOrder } = payload

//     const andConditions: MedicineWhereInput[] = [];
//     if (search) {
//         andConditions.push({
//             OR: [
//                 {
//                     name: {
//                         contains: search as string,
//                         mode: "insensitive"
//                     }
//                 },
//                 {
//                     description: {
//                         contains: search as string,
//                         mode: "insensitive"
//                     }
//                 },
//             ],
//         });
//     }
//     if (typeof isFeatured === "boolean") {
//         andConditions.push({
//             isFeatured,
//         });
//     }
//     const result = await prisma.medicine.findMany({
//         take: limit,
//         skip,
//         where: {
//             AND: andConditions
//         },
//         orderBy: {
//             [sortBy]: sortOrder,
//         },
//     })
//     const total = await prisma.medicine.count({
//         where: {
//             AND: andConditions,
//         },
//     });
//     return {
//         data: result,
//         pagination: {
//             total,
//             page,
//             limit,
//             totalPages: Math.ceil(total / limit),
//         },
//     }
// };

const getAllMedicine = async (payload: {
    search: string | undefined;
    isFeatured: boolean | undefined;
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
}) => {
    const { search, isFeatured, page, limit, skip, sortBy, sortOrder } = payload;

    const andConditions: any[] = [];
    
    if (search) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    description: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
            ],
        });
    }
    
    if (typeof isFeatured === "boolean") {
        andConditions.push({
            isFeatured,
        });
    }

    const whereClause = andConditions.length > 0 ? { AND: andConditions } : {};

    const [result, total] = await Promise.all([
        prisma.medicine.findMany({
            take: limit,
            skip: skip,
            where: whereClause,
            orderBy: {
                [sortBy]: sortOrder,
            },
        }),
        prisma.medicine.count({
            where: whereClause,
        })
    ]);

    


    return {
        data: result,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit), 
        },
    };
};

const getMyPostedMedicine = async (sellerId: string) => {
    await prisma.user.findUniqueOrThrow({
        where: {
            id: sellerId
        }
    })

    const result = await prisma.medicine.findMany({
        where: {
            sellerId
        },
        orderBy: {
            "createdAt": 'desc'
        }
    })
    const totalPostedMedicine = await prisma.medicine.count({
        where: {
            sellerId
        }
    })

    return { result, totalPostedMedicine }
}

const getStats = async () => {
    const [
        totalMedicine,
        featuredMedicine,
        notFeaturedMedicine,
        totalUser,
        totalAdmin,
        totalSeller,
        totalCustomer,


    ] = await Promise.all([
        prisma.medicine.count(),
        prisma.medicine.count({ where: { isFeatured: true } }),
        prisma.medicine.count({ where: { isFeatured: false } }),


        prisma.user.count(),
        prisma.user.count({ where: { role: "ADMIN" } }),
        prisma.user.count({ where: { role: "SELLER" } }),
        prisma.user.count({ where: { role: "CUSTOMER" } }),

    ]);
    return {
        totalMedicine,
        featuredMedicine,
        notFeaturedMedicine,
        totalUser,
        totalAdmin,
        totalSeller,
        totalCustomer,

    };
};


const getMedicineById = async (id: string) => {
    return await prisma.medicine.findUnique({
        where: { id },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
            reviews: {
                include: {
                    customer: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });
}

// include: {
//             category: true, 
//             reviews:true
//         },





const updateMedicine = async (id: string, userId: string, data: Partial<Medicine>, isSeller: boolean, isAdmin: boolean) => {

    const medicineData = await prisma.medicine.findUniqueOrThrow({
        where: {
            id
        },
        select: {
            id: true,
            sellerId: true
        }
    })

    if (!isAdmin && !isSeller && (medicineData.sellerId !== userId)) throw new Error("Your are not owner of this product")

    if (!isAdmin) delete data.isFeatured;

    const result = await prisma.medicine.update({
        where: {
            id
        },
        data
    })
    return result

}
const deleteMedicine = async (id: string, userId: string, isSeller: boolean, isAdmin: boolean) => {
    const medicineData = await prisma.medicine.findUniqueOrThrow({
        where: {
            id
        },
        select: {
            id: true,
            sellerId: true
        }
    })

    if (!isAdmin && !isSeller && (medicineData.sellerId !== userId)) throw new Error("Your are not owner of this product")
    const result = await prisma.medicine.delete({
        where: {
            id
        }
    })
    return result
}









export const medicineService = {
    createMedicine,
    getAllMedicine,
    getMedicineById,
    updateMedicine,
    deleteMedicine,
    getMyPostedMedicine,
    getStats

}