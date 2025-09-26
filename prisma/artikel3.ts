import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.article.createMany({
            data: [
                { title: "Aku capek", slug: "aku-capek", content: "dummy dlu tapi pokoknya bakal cerita yang capek banget ya tuhan" }
            ]
        })
    } catch (error) {
        console.error(error);
    }
}

main();