import Image from "next/image";

export default function Home() {
  return (
        <div className="container max-w-200">
          <div className="hero">
            <h1 className="flex justify-center">Hello WElcome to my Portofolio</h1>
            <br />
            <h1>My name is Bintang Shada Kawibya Putra but you can call me Shada, a little bit about myself—to be honest, I don't really know what I want to focus on right now (dd23/MM09/yy25), so I'm trying everything, but I tend to get bored with things easily. That's why I created this website, which might become a story about my life journey. I made it simple, just the way I want it, so don't expect too much. And I hope I can write a lot of blogs here too, hehe.</h1>
          </div>
          <div>
            
          </div>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
