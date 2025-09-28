import prisma from "@/app/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
    params: { slug: string };
}

async function getArticle({ params }: Props) {
    const {slug} = await params;
    const blogs = await prisma.article.findUnique({
        where: { slug }
    });
    if(!blogs){
        return notFound();
    }
    return (
        blogs
    );
}

export default async function ArticlesPage({ params }: Props){
    const article = await getArticle({ params });

    return (
        <div className="max-w-200 overflow-hidden">
            <pre className="text-2xl flex justify-center">{article?.title}</pre>
            <pre className="whitespace-pre-wrap break-words overflow-hidden p-4 rounded-lg text-sm leading-relaxed">
                {article?.content}
            </pre>
            <p className="text-gray-500">{article?.createdAt.toDateString()}</p>
        </div>
    )
}