import prisma from "@/app/lib/prisma";

type Props = {
    params: { slug: string };
}

async function getArticle({ params }: Props) {
    const {slug} = await params;
    const blogs = await prisma.article.findUnique({
        where: { slug }
    });
    return (
        blogs
    );
}

export default async function ArticlesPage({ params }: Props){
    const article = await getArticle({ params });

    return (
        <div className="m-8 max-w-200">
            <h1 className="text-2xl flex justify-center my-4">{article?.title}</h1>
            <p className="text-xl my-4">{article?.content}</p>
            <p className="text-gray-500">{article?.createdAt.toDateString()}</p>
        </div>
    )
}