import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import Layout from "../../../../components/layout";
import Loading from "../../../../components/common/Loading";
import ImageViewer from "../../../../components/ImageViewer";
import { AlbumHeader } from "../../../../components/AlbumHeader";
import AlbumGallery from "../../../../components/AlbumGallery";

const AlbumPage = () => {
  const router = useRouter();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchAlbum = async () => {
      try {
        const urlParts = router.asPath.split("/");
        const albumId = urlParts[urlParts.length - 1];
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/albums/${albumId}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setAlbum(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [router.isReady, router.asPath]);

  if (!router.isReady || loading) return <Loading message="Loading album..." />;
  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-xl text-red-500">
          Error loading gallery: {error}
        </div>
      </div>
    );

  return (
    <Layout>
      <div className="min-h-screen bg-black">
        <AnimatePresence>
          {selectedImageIndex !== null && (
            <ImageViewer
              imageIds={album.images.map((img) => img._id)}
              initialIndex={selectedImageIndex}
              onClose={() => setSelectedImageIndex(null)}
            />
          )}
        </AnimatePresence>
        <AlbumHeader album={album} />
        <AlbumGallery
          images={album.images}
        />
      </div>
    </Layout>
  );
};

export default AlbumPage;