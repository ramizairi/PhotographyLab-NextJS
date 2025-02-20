"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Loading from "../../components/common/Loading";
import Logo from "../../public/logo/logo-white.png";
import ImageNotFound from "../../components/common/ImageNotFound";

const ShareImagePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchImage = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/images/${id}`
        );
        
        if (!response.ok) {
          setError(true);
          return;
        }
        
        const data = await response.json();
        setImage(data.data);
      } catch (error) {
        console.error("Error fetching image:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image.path;
    link.download = `image-${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title || "Shared Image",
          text: image.description || "Check out this amazing image!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API not supported in your browser");
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    if (touchStart - touchEnd > 75) {
      // Swipe left
      setZoom((prev) => Math.min(prev + 0.1, 3));
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      setZoom((prev) => Math.max(prev - 0.1, 0.5));
    }
  };

  if (loading) {
    return <Loading message="Loading image..." />;
  }

  if (error || !image) {
    return <ImageNotFound />;
  }

  return (
    <>
      <Head>
        <title>{image.title || "Shared Image"}</title>
        <meta property="og:title" content={image.title || "Shared Image"} />
        <meta
          property="og:description"
          content={image.description || "Check out this amazing image!"}
        />
        <meta property="og:image" content={image.path} />
        <meta
          property="og:url"
          content={`https://www.photographylab.tn/share/${id}`}
        />
        <meta property="og:type" content="website" />
      </Head>
      <div className="flex min-h-screen flex-col bg-gray-900">
        <div
          className="flex flex-grow items-center justify-center p-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="relative"
            style={{
              transform: `scale(${zoom})`,
              transition: "transform 0.3s ease",
            }}
          >
            <Image
              src={image.path || "/placeholder.svg"}
              alt={image.title || "Shared Image"}
              width={1200}
              height={800}
              className="h-auto max-w-full"
              priority
            />
          </div>
        </div>
        <div className="flex items-center justify-between bg-gray-800 p-4">
          <div className="flex items-center">
            <button
              onClick={handleZoomIn}
              className="mr-2 rounded-full bg-red-600 p-2 text-white transition hover:bg-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            <button
              onClick={handleZoomOut}
              className="rounded-full bg-red-600 p-2 text-white transition hover:bg-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <Image
              src={Logo}
              alt="Logo"
              width={200}
              height={200}
              className="mx-4"
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={handleDownload}
              className="mr-2 rounded bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-600"
            >
              Download
            </button>
            <button
              onClick={handleShare}
              className="rounded bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-600"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareImagePage;