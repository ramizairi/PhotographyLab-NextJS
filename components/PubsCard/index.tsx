import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Bridge from "../../components/Icons/Bridge";
import Logo from "../../components/Icons/Logo";
import Modal from "../../components/Modal";
import { useLastViewedPhoto } from "../../utils/useLastViewedPhoto";
import { CustomCursor } from "../custom-cursor";
import { getCloudinaryFetchUrl } from "../../utils/cloudinaryUrl";

export default function ClubGallery() {
  const router = useRouter();
  const { id: clubId, photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const lastViewedPhotoRef = useRef(null);

  const [albums, setAlbums] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch albums for specific club and their images
  useEffect(() => {
    const fetchClubAlbums = async () => {
      if (!clubId) return;

      try {
        // Fetch albums for this club
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/albums/club/${encodeURIComponent(
            String(clubId)
          )}?includeImages=true`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch albums");
        }
        const albumsData = await response.json();
        setAlbums(albumsData);

        const imagesData = albumsData.flatMap((album) =>
          (album.images || []).map((img) => ({
            id: img._id,
            path: img.path,
            view: img.views ?? img.view ?? 0,
            albumId: album._id,
            albumTitle: album.title,
            eventDate: album.eventDate,
          }))
        );

        setAllImages(imagesData.filter((img) => img.path));
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubAlbums();
  }, [clubId]);

  // Handle scrolling to last viewed photo
  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-t-secondary h-8 w-8 animate-spin rounded-full border-4 border-white"></div>
          <p className="mt-4 text-white">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-red-900 p-6 text-center">
          <p className="text-red-200">Error loading gallery: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CustomCursor />
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={allImages}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center">
                <Bridge />
              </span>
              <span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </div>
            <Logo />
            <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
              {albums[0]?.clubId?.name || "PHOTOGRAPHY LAB"} - IHEC CARTHAGE
            </h1>
            <p className="flex max-w-[40ch] items-center justify-center text-white/75 sm:max-w-[32ch]">
              <span className="pr-3 font-semibold">Frame Your Life</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-camera-reels"
                viewBox="0 0 16 16"
              >
                <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0M1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
                <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm6 8.73V7.27l-3.5 1.555v4.35zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1" />
                <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6M7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
              </svg>
            </p>
          </div>
          {allImages.map(({ id, path, albumTitle, eventDate, view }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/photos/${id}`}
              ref={id === lastViewedPhoto ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt={`Photo from ${albumTitle}`}
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                src={getCloudinaryFetchUrl(path, {
                  width: 720,
                  quality: "auto:eco",
                })}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                priority={false}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-sm text-white">{albumTitle}</p>
                <div className="flex justify-between">
                  <p className="text-xs text-white/70">
                    {new Date(eventDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-white/70">{view} views</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
