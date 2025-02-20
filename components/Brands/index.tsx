import type { Brand } from "../../utils/types";
import Image from "next/image";
import brandsData from "./brandsData";
import H1 from "../common/H1Test";

const Brands = () => {
  const extendedBrandsData = [...brandsData, ...brandsData];

  return (

    <section className="w-full overflow-hidden bg-black py-8 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="w-full">
          <H1 title="Social Media" center />
          <div className="wow fadeInUp" data-wow-delay=".1s">
            <div className="brands-slider">
              <div className="brands-slide-track">
                {extendedBrandsData.map((brand, index) => (
                  <SingleBrand key={`${brand.id}-${index}`} brand={brand} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name } = brand;

  return (
    <div className="brand-slide">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative block h-24 md:h-16 w-full opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:hover:opacity-100"
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width: 767px) 100vw, 160px"
          className="object-contain px-4"
        />
      </a>
    </div>
  );
};