import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(){
    try {
        const articles = await prisma.article.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(articles, {status: 200});
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {error: "Server error"},
            {status: 500}
        )
    }
}

export async function POST(request: Request){
    try {
        const body = await request.json();
        const { title, content } = body;

        const checkTitle = await prisma.article.findFirst({
            where: {
                title: title
            }
        })

        if(checkTitle){
            return NextResponse.json(
                {error: "Title must be unique"},
                {status: 400}
            )
        }

        if(!title || !content){
            return NextResponse.json(
                {error: "Title, content, and slug must be filled"},
                {status: 400}
            );
        }

        const slug = slugify(title, {lower: true});

        const article = await prisma.article.create({
            data: {title, slug, content},
        })

        return NextResponse.json(article);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: "Server Error"},
            {status: 500}
        )
    }
}