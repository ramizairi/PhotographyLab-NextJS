import { Camera, Film, FileVideo, Aperture, PenTool, Star } from "lucide-react";
import Layout from "../../components/layout";

const services = [
  {
    icon: Camera,
    name: "Basic Photo Package",
    description:
      "Professional photography session with 50 high-resolution edited photos delivered digitally.",
    price: 100,
  },
  {
    icon: Aperture,
    name: "Premium Photo Package",
    description:
      "Extended photography session with 100 professionally edited photos and 10 printed copies.",
    price: 150,
  },
  {
    icon: Film,
    name: "Photo + Video Package",
    description:
      "Complete package with 50 edited photos and a 3-minute highlight video of your special moments.",
    price: 200,
  },
  {
    icon: FileVideo,
    name: "Social Media Reel",
    description:
      "Short-form vertical video perfect for Instagram and TikTok with professional editing and music.",
    price: 150,
  },
  {
    icon: PenTool,
    name: "Cinematic After Movie",
    description:
      "Professionally edited 5-7 minute cinematic video with color grading and custom soundtrack.",
    price: 200,
  }
];

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 p-4 pt-20 text-white sm:p-6 md:p-8">
        <main className="container relative z-10 mx-auto max-w-6xl">
          {/* Responsive heading with smaller text on mobile */}
          <h1 className="mb-2 mt-8 text-center text-3xl font-bold sm:mb-4 sm:mt-16 sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              Capture Your Moments
            </span>
          </h1>

          {/* Responsive subtitle with adjusted padding and font size */}
          <p className="mx-auto mb-8 max-w-3xl px-2 text-center text-base text-gray-300 sm:mb-12 sm:text-lg md:mb-16 md:text-xl">
            Professional photography and videography services to preserve your
            most precious memories
          </p>

          {/* Responsive grid that adapts to screen size */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3">
            {services.map((service, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-600 to-pink-600 opacity-20 blur-md transition-all duration-300 group-hover:opacity-30"></div>

                {/* Responsive card with adjusted padding */}
                <div className="relative rounded-xl border border-gray-800 bg-black bg-opacity-60 p-4 backdrop-blur-md transition-all duration-300 group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:bg-opacity-80 sm:p-6 md:p-8">
                  <div className="absolute right-3 top-3 font-mono text-xs opacity-60 sm:right-4 sm:top-4">
                    {(index + 1).toString().padStart(2, "0")}
                  </div>

                  {/* Responsive icon and title layout */}
                  <div className="mb-4 flex items-center sm:mb-6">
                    <div className="mr-3 rounded-full bg-gradient-to-br from-red-500 to-pink-600 p-2 sm:mr-4 sm:p-3">
                      <service.icon className="h-4 w-4 text-white sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold sm:text-xl">
                      {service.name}
                    </h3>
                  </div>

                  {/* Responsive description with minimum height to align buttons */}
                  <p className="mb-4 min-h-12 text-xs text-gray-300 sm:mb-6 sm:text-sm">
                    {service.description}
                  </p>

                  {/* Responsive pricing and CTA layout */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                    <p className="text-xl font-bold sm:text-2xl">
                      <span className="text-red-400">{service.price}</span>
                      <span className="ml-1 align-top text-xs text-gray-400">
                        TND
                      </span>
                    </p>
                    <a
                      href="/contact"
                      className="w-full rounded-lg bg-gradient-to-r from-red-500 to-pink-600 px-3 py-2 text-center text-xs font-medium text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg sm:w-auto sm:px-4 sm:text-sm"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Responsive bottom spacing */}
          <div className="h-8 sm:h-12 md:h-16"></div>
        </main>
      </div>
    </Layout>
  );
}
