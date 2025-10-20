import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { Prisma } from "@prisma/client";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const article = await prisma.article.findUnique({ where: { slug } });
        if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(article);
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { slug } = await params;
        const { title, content } = await request.json();
        if (!title || !content) {
            return NextResponse.json({ error: "title and content are required" }, { status: 400 });
        }

        const updated = await prisma.article.update({
            where: { slug },
            data: { title, content },
        });
        return NextResponse.json(updated);
    } catch (e: unknown) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
        console.error(e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { slug } = await params;
        await prisma.article.delete({ where: { slug } });
        return NextResponse.json({ ok: true });
    } catch (e: unknown) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
        console.error(e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}