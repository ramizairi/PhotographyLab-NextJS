import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Download, Eye } from "lucide-react";
import { useImageData } from "../../hooks/useImageData";
import Loading from "../common/Loading";

export const GalleryImage = ({ imageId, index, onClick }) => {
    const { data: imageData, loading, error } = useImageData(imageId);
    const cloudinaryUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/fetch/f_auto,q_auto,w_800/`;

    const getImageSize = () => {
        // Create a more dramatic mosaic pattern
        const pattern = index % 16; // Increased pattern cycle for more variety

        switch (pattern) {
            case 0: // Extra large square
                return "col-span-3 row-span-3 min-h-[600px]";
            case 1: // Tall rectangle
                return "col-span-2 row-span-3 min-h-[600px]";
            case 4: // Wide rectangle
            case 12:
                return "col-span-3 row-span-2 min-h-[400px]";
            case 7: // Medium square
            case 15:
                return "col-span-2 row-span-2 min-h-[400px]";
            case 2:
            case 8:
            case 13: // Tall single column
                return "col-span-1 row-span-2 min-h-[400px]";
            default: // Regular squares
                return "col-span-1 row-span-1 min-h-[300px]";
        }
    };

    const handleDownload = async (e) => {
        e.stopPropagation();
        const imageUrl = imageData.path;
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `image-${imageData._id}.jpg`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    if (loading)
        return (
            <div className={`${getImageSize()} animate-pulse bg-gray-100`}>
                <Loading message="Loading Image" />
            </div>
        );

    if (error)
        return (
            <div
                className={`${getImageSize()} flex items-center justify-center bg-gray-50`}
            >
                <p className="text-gray-400">Failed to load image</p>
            </div>
        );

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${getImageSize()} group relative cursor-pointer`}
            onClick={onClick}
        >
            <div className="relative h-full w-full overflow-hidden">
                {/* Main Image */}
                <Image
                    src={cloudinaryUrl + imageData.path}
                    alt="Gallery photo"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.02]"
                />

                {/* Hover Overlay */}
                <motion.div
                    initial={false}
                    className="absolute inset-0 bg-gradient-to-b from-black/0 via-transparent to-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                {/* Top Controls */}
                <div className="absolute left-0 right-0 top-0 flex justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-full bg-black/20 p-2 backdrop-blur-sm transition-colors hover:bg-black/40"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle like functionality
                        }}
                    >
                        <Heart size={20} className="text-white" />
                    </motion.button>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="text-sm font-medium text-white opacity-90">
                        {imageData.views || 0} Views
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownload}
                        className="rounded-full bg-black/20 p-2 backdrop-blur-sm transition-colors hover:bg-black/40"
                    >
                        <Download size={20} className="text-white" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};