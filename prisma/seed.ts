import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main(){
    try {
        await prisma.article.createMany({
            data: [
                { title: "Artikel Pertama", slug: "artikel-pertama", content: "Ini isi artikel pertama" },
                { title: "Artikel Kedua", slug: "artikel-kedua", content: "Ini isi artikel kedua" }
            ]
        })
        if (!process.env.PASSWORD) {
            throw new Error("password is not defined");
        }
        const password = await bcrypt.hash(process.env.PASSWORD, 10);
        
        await prisma.user.create({
            data: { 
                name: `${process.env.NAME}`, 
                email: `${process.env.EMAIL}`, 
                password: password
            }
        })

        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
    }
}

main();