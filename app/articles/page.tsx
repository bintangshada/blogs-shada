import Link from "next/link"
import prisma from "../lib/prisma"

async function getArticles() {
    const blogs = await prisma.article.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
    return blogs;
}

export default async function ArticlesPage(){
    const blogs = await getArticles();
    return(
        <div className="max-w-200">
            <h1 className="flex justify-center mb-4">List Artikel</h1>
            <ul className="list-inside list-disc">
                {blogs && blogs.length > 0 ? blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link href={`/articles/${blog.slug}`}>
                            <h2 className="inline">{blog.title} - </h2>
                            <p className="inline text-gray-500">{blog.createdAt.toLocaleDateString()}</p>
                        </Link>        
                    </li>
                )) : <li>No Blogs found</li> }
            </ul>
        </div>
    )
}