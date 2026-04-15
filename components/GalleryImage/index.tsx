import type { CSSProperties } from "react";
import Image from "next/image";
import { Download, Heart } from "lucide-react";
import { getCloudinaryFetchUrl } from "../../utils/cloudinaryUrl";

const deferredTileStyle = {
  contentVisibility: "auto",
  containIntrinsicSize: "300px",
} as CSSProperties;

export const GalleryImage = ({ image, index, onClick }) => {
  const getImageSize = () => {
    const pattern = index % 16;
    const mobileBase = "col-span-1 row-span-1 min-h-[220px] sm:min-h-[260px]";

    switch (pattern) {
      case 0:
        return `${mobileBase} md:col-span-3 md:row-span-3 md:min-h-[600px]`;
      case 1:
        return `${mobileBase} md:col-span-2 md:row-span-3 md:min-h-[600px]`;
      case 4:
      case 12:
        return `${mobileBase} md:col-span-3 md:row-span-2 md:min-h-[400px]`;
      case 7:
      case 15:
        return `${mobileBase} md:col-span-2 md:row-span-2 md:min-h-[400px]`;
      case 2:
      case 8:
      case 13:
        return `${mobileBase} md:col-span-1 md:row-span-2 md:min-h-[400px]`;
      default:
        return `${mobileBase} md:min-h-[300px]`;
    }
  };

  const handleDownload = async (event) => {
    event.stopPropagation();

    if (!image?.path) {
      return;
    }

    const response = await fetch(image.path);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `image-${image._id}.jpg`;
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  if (!image?.path) {
    return (
      <div
        className={`${getImageSize()} flex items-center justify-center bg-gray-50`}
      >
        <p className="text-gray-400">Failed to load image</p>
      </div>
    );
  }

  return (
    <div
      className={`${getImageSize()} group relative cursor-pointer`}
      onClick={onClick}
      style={deferredTileStyle}
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={getCloudinaryFetchUrl(image.path, {
            width: 520,
            quality: "auto:eco",
          })}
          alt="Gallery photo"
          fill
          loading={index < 6 ? "eager" : "lazy"}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 25vw, 17vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-transparent to-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute left-0 right-0 top-0 flex justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            className="rounded-full bg-black/20 p-2 backdrop-blur-sm transition hover:scale-110 hover:bg-black/40 active:scale-95"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Heart size={20} className="text-white" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="text-sm font-medium text-white opacity-90">
            {image.views || image.view || 0} Views
          </div>
          <button
            onClick={handleDownload}
            className="rounded-full bg-black/20 p-2 backdrop-blur-sm transition hover:scale-110 hover:bg-black/40 active:scale-95"
          >
            <Download size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
