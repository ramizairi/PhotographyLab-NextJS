import type { Brand } from "../../utils/types";
import Image from "next/image";
import { getCloudinaryFetchUrl } from "../../utils/cloudinaryUrl";

export const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name } = brand;
  return (
    <div className="brand-slide">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative block h-24 w-full opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:hover:opacity-100 md:h-16"
      >
        <Image
          src={getCloudinaryFetchUrl(image || "/placeholder.svg", {
            width: 180,
            quality: "auto:eco",
          })}
          alt={name}
          fill
          sizes="(max-width: 767px) 100vw, 160px"
          className="object-contain px-4"
        />
      </a>
    </div>
  );
};
