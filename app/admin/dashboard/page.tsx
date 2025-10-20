import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/app/components/LogoutButton";

async function getArticles() {
  const blogs = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return blogs;
}

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const blogs = await getArticles();
  return (
    <>
      <section className="pt-20 mx-4">
        <div className="mx-auto h-[20rem] flex justify-center items-center">
          <div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-3xl text-center font-semibold">Profile Page</p>
              <LogoutButton />
            </div>
            {!user ? (
              <p>Loading...</p>
            ) : (
              <div className="items-center">
                <div className="mt-8">
                  <p className="mb-3">Name: {user.name}</p>
                  <p className="mb-3">Email: {user.email}</p>
                </div>
                <div className="mt-8">
                  <h1 className="mb-4">List Articles: </h1>
                  <div className="mb-4">
                    <Link href="/admin/articles/new">
                      <button className="bg-gray-500 px-3 py-1 rounded">
                        New Article
                      </button>
                    </Link>
                  </div>
                  {blogs && blogs.length > 0 ? (
                    blogs.map((blog) => (
                      <li key={blog.id} className="mt-3">
                        <h2 className="inline">{blog.title} - </h2>
                        <p className="inline text-gray-500">
                          {blog.createdAt.toLocaleDateString()}
                        </p>
                        <Link href={`/articles/${blog.slug}`}>
                          <button className="bg-gray-500 px-3 rounded-md ml-3">
                            View
                          </button>
                        </Link>
                        <Link href={`/admin/${blog.slug}/edit`}>
                          <button className="bg-gray-500 px-3 rounded-md ml-3">
                            Edit
                          </button>
                        </Link>
                        <Link href={`/admin/${blog.slug}/delete`}>
                          <button className="bg-gray-500 px-3 rounded-md ml-3">
                            Delete
                          </button>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>Blogs masih kosong</li>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
