import { motion } from "framer-motion";
import { GalleryImage } from "../GalleryImage";
import { useState } from "react";
import ImageViewer from "../ImageViewer";

export const AlbumGallery = ({ images }) => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setViewerOpen(true);
  };

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
            {images.map((image, index) => (
              <GalleryImage
                key={image._id}
                imageId={image._id}
                index={index}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </motion.div>

          {viewerOpen && (
            <ImageViewer
              imageIds={images.map((img) => img._id)}
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