import { prisma } from "../lib/prisma";
import { UserRole } from "../middileware/auth";



async function seedAdmin() {
    try {
        const adminData = {
            name: "admin2",
            email: "admin2@gmail.com",
            role: UserRole.ADMIN,
            password: "admin1234"
        }
        // console.log(adminData);
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        })
        if (existingUser) {
            throw new Error("User Already Exists")
        }

        const signUpAdmin = await fetch("http://localhost:5000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Origin: "http://localhost:3000",
            },
            body: JSON.stringify(adminData)
        })

        // console.log(signUpAdmin);
        if (signUpAdmin.ok) {
            await prisma.user.update({
                where: {
                    email: adminData.email
                },
                data: {
                    emailVerified: true
                }
            })
        }


    } catch (error) {
        console.log(error);
    }
}

seedAdmin()