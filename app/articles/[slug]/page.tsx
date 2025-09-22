type Props = {
    params: { slug: string };
}

export default function ArticlesPage({ params }: Props){
    return (
        <h1>Artikel = {params.slug}</h1>
    )
}