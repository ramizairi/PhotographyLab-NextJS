// pages/index.js
import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
export default function Home() {
  const [imageUrl, setImageUrl] = useState("https://i.ibb.co/DgRqsgfJ/ugte.jpg");

  const shareToInstagramStory = async () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent || navigator.vendor);
  
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "Sharing to Instagram Stories",
          url: window.location.href, // This will share the page URL, not the image directly
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Instagram story sharing is not supported in this app.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Instagram Share Template</title>
        <meta name="description" content="Share to Instagram Stories" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="relative">
            <Image
              src={imageUrl}
              alt="Shareable content"
              className="h-64 w-full object-cover"
              layout="responsive"
              width={700}
              height={475}
            />

            {/* Share button */}
            <button
              onClick={shareToInstagramStory}
              className="mt-4 w-full rounded bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 font-bold text-white transition-opacity hover:opacity-90"
            >
              Share to Instagram Story
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
