import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    context: { params: { slug: string } }
) {
    try {
        const { slug } = context.params;
        const article = await prisma.article.findUnique({
            where: {
                slug
            }
        })
        if(!article){
            return NextResponse.json(
                {error: "Article not found"},
                {status: 404}
            )
        }
        return NextResponse.json(article, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: "Server error"},
            {status: 500}
        )
    }
}