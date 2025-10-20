import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET() {
  try {
    const blogs = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(blogs);
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json({ error: "title and content are required" }, { status: 400 });
    }

    let baseSlug = slugify(title, { lower: true, strict: true }) || "untitled";
    let slug = baseSlug;
    let i = 1;
    while (await prisma.article.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${i++}`;
    }

    const article = await prisma.article.create({ data: { title, content, slug } });
    return NextResponse.json(article, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}