import Image from "next/image"

export default function AboutPage(){
    return (
        <div className="max-w-200">
            <h1 className="flex justify-center mb-4">About me</h1>
            <p className="mb-4">My name is Bintang Shada Kawibya Putra but you can call me Shada, a little bit about myself—to be honest, I don&apos;t really know what I want to focus on right now (dd23/MM09/yy25), so I&apos;m trying everything, but I tend to get bored with things easily. That&apos;s why I created this website, which might become a story about my life journey. I made it simple, just the way I want it, so don&apos;t expect too much. And I hope I can write a lot of blogs here too, hehe.</p>
            <p className="mb-4">I am currently studying at UPN &quot;Veteran&quot; Yogyakarta in the Computer Science program. Before that, I also attended a vocational high school at SMKN 1 Bantul, majoring in Software Engineering. What else? I enjoy reading books in my free time and I also like exploring remote areas of the city on my own. If I could choose another career, I might want to become a zookeeper, as I enjoy interacting with animals. That&apos;s all for now (dd24/MM09/yy25).</p>
            <h2 className="mb-4">Info</h2>
            <ul className="list-inside list-disc">
                <li>
                    <a href="https://www.linkedin.com/in/bintang-shada-kawibya-putra/"><p className="inline">Linkedin : Bintang Shada Kawibya Putra</p></a>
                </li>
                <li>
                    <a href="https://github.com/bintangshada/"><p className="inline">Github : bintangshada</p></a>
                </li>
            </ul>
        </div>
    )
}