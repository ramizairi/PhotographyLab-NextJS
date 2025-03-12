import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  X,
  Download,
  Eye,
} from "lucide-react";
import { cloudonaryUrl } from "../../constant/Cloudinary";
import { Controls } from "./Controls";
import ShareLoad from "../common/ShareLoad";
import ImageLoad from "../common/ImageLoad";

declare global {
  interface Window {
    FB: any;
  }
}

const ImageViewer = ({ imageIds, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  const [showShareAnimation, setShowShareAnimation] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagePromises = imageIds.map(async (id) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/images/${id}`
          );
          if (!response.ok)
            throw new Error(`Failed to fetch image: ${response.statusText}`);
          const data = await response.json();
          return data.data;
        });
        const fetchedImages = await Promise.all(imagePromises);
        setImages(fetchedImages);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [imageIds]);


  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prev) => (prev + newDirection + images.length) % images.length
    );
  }, [images.length]);

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        paginate(1);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, paginate]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const getOriginalUrl = (path) => {
    // Remove any Cloudinary URL prefix and parameters
    const parts = path.split("https://");
    return "https://" + parts[parts.length - 1];
  };

  const handleOpenImage = async () => {
    if (!images[currentIndex]) return;

    try {
      const shareableLink = `${window.location.origin}/share/${images[currentIndex]._id}`;
      window.open(shareableLink, "_blank");
    } catch (error) {
      console.error("Failed to open image:", error);
    }
  };

  const handleDownload = async () => {
    if (!images[currentIndex]) return;

    try {
      // Get the original image URL without Cloudinary
      const originalUrl = getOriginalUrl(images[currentIndex].path);

      const response = await fetch(originalUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download =
        originalUrl.split("/").pop() || `image-${images[currentIndex]._id}.jpg`;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleShare = () => {
    if (!images[currentIndex]) return;

    // Generate the shareable link
    const shareableLink = `${window.location.origin}/share/${images[currentIndex]._id}`;

    // Show share animation
    setShowShareAnimation(true);

    // Hide animation after 2 seconds
    setTimeout(() => setShowShareAnimation(false), 2000);

    const shareToFacebook = () => {
      if (window.FB) {
        // If FB SDK is loaded, use it for better sharing experience
        window.FB.ui(
          {
            method: "share",
            href: shareableLink,
          },
          function (response) {
            // Optional callback after sharing
            console.log(response ? "Share completed" : "Share canceled");
          }
        );
      } else {
        // Try mobile app first on mobile devices
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          // Try to open in Facebook app first
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.src = `fb://share?link=${encodeURIComponent(shareableLink)}`;
          document.body.appendChild(iframe);

          // Fallback to browser after short timeout if app doesn't open
          setTimeout(() => {
            // Open in new window to prevent navigation away from the gallery
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareableLink
              )}`,
              "_blank",
              "width=600,height=400"
            );
            // Clean up iframe
            document.body.removeChild(iframe);
          }, 300);
        } else {
          // On desktop, just open the share dialog in a popup
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareableLink
            )}`,
            "_blank",
            "width=600,height=400"
          );
        }
      }
    };

    shareToFacebook();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg">
        <ImageLoad message="Loading image..." />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-lg"
    >
      <Controls
        currentIndex={currentIndex}
        total={images.length}
        isPlaying={isPlaying}
        onPlayToggle={() => setIsPlaying(!isPlaying)}
        onShare={handleShare} // Pass the handleShare function
        onClose={onClose}
      />

      {/* Download Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDownload}
        className="absolute right-2 top-12 z-50 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/80"
        title="Download Image"
      >
        <Download size={24} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleOpenImage}
        className="absolute right-2 top-24 z-50 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/80"
        title="Download Image"
      >
        <Eye size={24} />
      </motion.button>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {images[currentIndex] && (
              <Image
                src={
                  cloudonaryUrl + images[currentIndex].path ||
                  "/placeholder.svg"
                }
                alt={`Gallery image ${currentIndex + 1}`}
                fill
                priority
                className="object-contain"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white transition-colors hover:text-blue-400"
        >
          <ChevronLeft size={40} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-white transition-colors hover:text-blue-400"
        >
          <ChevronRight size={40} />
        </motion.button>
      </div>

      <div className="h-24 bg-black/80 backdrop-blur-sm">
        <div className="flex h-full items-center space-x-2 overflow-x-auto p-2">
          {images.map((image, index) => (
            <motion.button
              key={image._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg 
                ${index === currentIndex ? "ring-2 ring-blue-400" : ""}`}
            >
              <Image
                src={cloudonaryUrl + image.path || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {showShareAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <div className="rounded-lg bg-white p-6 text-center">
              <Share2 className="mx-auto mb-4 h-12 w-12 text-blue-500" />
              <ShareLoad message="Share on facebook ..." />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImageViewer;
