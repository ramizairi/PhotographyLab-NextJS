import Image from "next/image";
import brandsData from "./brandsData";
import H1 from "../common/H1Test";
import { SingleBrand } from "./SingleBrand";

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
                  <div key={`${brand.id}-${index}`}>
                    <SingleBrand brand={brand} />
                  </div>
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