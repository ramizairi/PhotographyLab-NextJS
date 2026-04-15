import { motion } from "framer-motion";
import { GalleryImage } from "../GalleryImage";
import { useEffect, useMemo, useRef, useState } from "react";
import ImageViewer from "../ImageViewer";

const INITIAL_IMAGE_COUNT = 24;
const IMAGE_BATCH_SIZE = 24;

export const AlbumGallery = ({ images }) => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(INITIAL_IMAGE_COUNT);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const visibleImages = useMemo(
    () => (images || []).slice(0, visibleCount),
    [images, visibleCount]
  );

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setViewerOpen(true);
  };

  useEffect(() => {
    setVisibleCount(INITIAL_IMAGE_COUNT);
  }, [images]);

  useEffect(() => {
    if (!loadMoreRef.current || visibleCount >= (images?.length || 0)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((currentCount) =>
            Math.min(currentCount + IMAGE_BATCH_SIZE, images.length)
          );
        }
      },
      { rootMargin: "800px 0px" }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [images, visibleCount]);

  return (
    <main className="mx-auto max-w-[2400px] px-2 py-8 sm:px-4">
      {images && images.length > 0 ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-1 sm:gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
          >
            {visibleImages.map((image: any, index: number) => (
              <GalleryImage
                key={image._id}
                image={image}
                index={index}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </motion.div>
          {visibleCount < images.length && (
            <div ref={loadMoreRef} className="h-1 w-full" aria-hidden="true" />
          )}

          {viewerOpen && (
            <ImageViewer
              images={images}
              initialIndex={selectedIndex}
              onClose={() => setViewerOpen(false)}
            />
          )}
        </>
      ) : (
        <div className="flex h-64 items-center justify-center">
          <p className="text-gray-400 font-medium">No images in this album</p>
        </div>
      )}
    </main>
  );
};

export default AlbumGallery;
