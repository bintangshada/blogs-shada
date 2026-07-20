import prisma from "@/app/lib/prisma";
import HomeClient from "@/app/HomeClient";
import { Article } from "@prisma/client";

async function getArticles(): Promise<Article[]> {
  const blogs = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });
  return blogs as Article[];
}

export default async function Home() {
  const blogs = await getArticles();
  
  const serializedBlogs = blogs.map((blog: Article) => ({
    ...blog,
    createdAt: blog.createdAt.toISOString(),
  }));

  return <HomeClient blogs={serializedBlogs} />;
}

