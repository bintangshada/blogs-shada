import prisma from "@/app/lib/prisma";
import HomeClient from "@/app/HomeClient";

async function getArticles() {
  const blogs = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });
  return blogs;
}

export default async function Home() {
  const blogs = await getArticles();
  
  const serializedBlogs = blogs.map((blog) => ({
    ...blog,
    createdAt: blog.createdAt.toISOString(),
  }));

  return <HomeClient blogs={serializedBlogs} />;
}
