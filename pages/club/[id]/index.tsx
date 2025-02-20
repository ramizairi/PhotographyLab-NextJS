// pages/club/[id]/index.tsx
"use client";

import Image from "next/image";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Camera, Eye } from "lucide-react";
import Layout from "../../../components/layout";
import Loading from "../../../components/common/Loading";

const AlbumCard = ({
  _id,
  title,
  eventDate,
  coverImage,
  photoCount,
  views,
  photographers,
}) => (
  <Link
    href={`${window.location.href}/album/${_id}`}
    className="group block overflow-hidden rounded-xl bg-gradient-to-br from-black to-gray-800 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
  >
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      <Image
        src={coverImage || "/placeholder.svg"}
        alt={title}
        fill
        quality={50}
        priority={false}
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="mb-2 line-clamp-2 text-2xl font-bold text-white">
          {title}
        </h3>
        <p className="text-sm font-medium text-gray-300">
          {format(new Date(eventDate), "MMMM dd, yyyy")}
        </p>
      </div>
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-2">
          <Camera size={16} />
          <span>{photoCount || 0} photos</span>
        </div>
        <div className="flex items-center space-x-2">
          <Eye size={16} />
          <span>{views || 0} views</span>
        </div>
      </div>
      {photographers && photographers.length > 0 && (
        <div className="mt-4 flex items-center">
          <div className="mr-2 flex -space-x-2">
            {photographers.slice(0, 3).map((photographer) => (
              <div key={photographer._id} className="relative">
                <Image
                  src={photographer.avatar || "/personHolder.svg"}
                  alt={photographer.name}
                  width={28}
                  height={28}
                  quality={80}
                  priority={false}
                  className="rounded-full border-2 border-gray-800"
                />
                <span className="sr-only">{photographer.name}</span>
              </div>
            ))}
          </div>
          {photographers.length > 3 && (
            <span className="text-sm text-gray-400">
              +{photographers.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  </Link>
);

export default function ClubPage() {
  const router = useRouter();
  const { id } = router.query;

  const [club, setClub] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Don't fetch if id is not available yet
      if (!id) return;

      try {
        const albumsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/albums/club/${id}`
        );
        console.log(albumsResponse);
        const clubAlbums = await albumsResponse.json();

        if (clubAlbums.length > 0) {
          setClub(clubAlbums[0].clubId);
        }

        setAlbums(clubAlbums);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!id || loading) {
    return <Loading message="Loading club albums ..." />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-gray-100">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-gray-100">
        <div className="text-xl">CLUB HAS NO ALBUMS</div>
      </div>
    );
  }

  return (
    <Layout>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4159979187111890"
          crossOrigin="anonymous"
        ></script>
      </head>
      <div className="min-h-screen bg-black text-gray-100">
        <header className="relative h-96 overflow-hidden">
          <Image
            src={club.image || "/placeholder.svg"}
            alt={club.name}
            fill
            quality={50}
            priority={false}
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <h1 className="mb-2 text-4xl font-bold tracking-tight">
                {club.name}
              </h1>
            </div>
          </div>
        </header>

        <div className="bg-[repeating-linear-gradient(45deg,rgb(27,27,27)_0px,rgb(27,27,27)_97px,rgb(24,24,24)_97px,rgb(24,24,24)_194px,rgb(20,20,20)_194px,rgb(20,20,20)_291px)]">
          <main className="container mx-auto px-4 py-16">
            <h2 className="mb-12 text-3xl font-semibold tracking-tight text-white">
              Photo Albums
            </h2>
            {albums.length === 0 ? (
              <p className="text-gray-400">No albums found for this club.</p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {albums.map((album) => (
                  <AlbumCard key={album._id} {...album} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
}
