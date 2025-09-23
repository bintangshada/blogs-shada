import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

 async function main(){
    try {
        await prisma.article.createMany({
            data: [
                { title: "Artikel Pertama", slug: "artikel-pertama", content: "Ini isi artikel pertama" },
                { title: "Artikel Kedua", slug: "artikel-kedua", content: "Ini isi artikel kedua" }
            ]
        })

        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
    }
 }

 main();