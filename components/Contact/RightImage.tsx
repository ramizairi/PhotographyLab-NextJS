import Image from "next/image";

const ImagePrev = () => {
  return (
    <div className="min-h-[400px] w-full lg:w-4/12">
      <div className="relative h-full overflow-hidden rounded-2xl">
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 z-20 border border-gray-800 transition-all duration-500 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/10"></div>
        <div className="relative h-full w-full">
          <Image
            src="/bureau/mokh.jpg"
            alt="Preview Image"
            fill
            className="transform object-cover transition-transform duration-500 hover:scale-105"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePrev;
