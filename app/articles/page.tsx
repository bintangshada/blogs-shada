import Link from "next/link"
import prisma from "../lib/prisma"

interface Blogs {
  id: string;
  slug: string;
  title: string;
  createdAt: Date;
}

async function getArticles() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`, {
        cache: "no-store"
    });
      const blogs = await res.json();
    return blogs;
}

export default async function ArticlesPage(){
    const blogs = await getArticles();
    return(
        <div className="max-w-200">
            <h1 className="flex justify-center mb-4">List Artikel</h1>
            <ul className="list-inside list-disc">
                {blogs && blogs.length > 0 ? blogs.map((blog : Blogs) => (
                    <li key={blog.id}>
                        <Link href={`/articles/${blog.slug}`}>
                            <h2 className="inline">{blog.title} - </h2>
                            <p className="inline text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
                        </Link>        
                    </li>
                )) : <li>No Blogs found</li> }
            </ul>
        </div>
    )
}