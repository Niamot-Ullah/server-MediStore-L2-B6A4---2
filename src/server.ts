import app from "./app";
import { prisma } from "./lib/prisma";


const port = process.env.PORT || 5000
async function main() {
    try {
        await prisma.$connect();
        console.log(`Connected to the DB successfully`);

        app.listen(port,()=>{
            console.log(`Server is cooking on port ${port}`);
        })
    } catch (error) {
        console.log(error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main()