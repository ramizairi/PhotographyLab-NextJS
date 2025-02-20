import { Camera, ImageIcon, PawPrint, User, Plane, Video } from "lucide-react";
import Layout from "../../components/layout";

const services = [
  {
    icon: Camera,
    name: "Camera",
    description: "High-quality photography for all your needs.",
    price: 29,
  },
  {
    icon: ImageIcon,
    name: "Wedding",
    description: "Capture your special day with our expert photographers.",
    price: 46,
  },
  {
    icon: PawPrint,
    name: "Animal",
    description: "Stunning shots of your furry friends.",
    price: 24,
  },
  {
    icon: User,
    name: "Portrait",
    description: "Professional portraits for individuals and groups.",
    price: 40,
  },
  {
    icon: Plane,
    name: "Travel",
    description:
      "Document your adventures with our travel photography services.",
    price: 35,
  },
  {
    icon: Video,
    name: "Video",
    description: "Transform your raw footage into polished videos.",
    price: 15,
  },
];

export default function Home() {
  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-br from-black to-red-900 p-8 text-white">
        <main className="relative z-10">
          <h1 className="mb-16 mt-24 bg-gradient-to-r bg-clip-text text-center text-5xl font-bold text-transparent text-white">
            Our Services
          </h1>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 rounded-2xl bg-white opacity-20 blur transition-opacity duration-300 group-hover:opacity-30"></div>
                <div className="relative rounded-2xl border border-gray-800 bg-black bg-opacity-50 p-6 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-opacity-70">
                  <div className="absolute right-4 top-4 text-xs font-bold opacity-50">
                    {(index + 1).toString().padStart(2, "0")}
                  </div>
                  <service.icon className="mx-auto mb-4 h-12 w-12 text-white" />
                  <h3 className="mb-2 text-center text-xl font-bold">
                    {service.name}
                  </h3>
                  <p className="mb-4 text-center text-sm text-gray-300">
                    {service.description}
                  </p>
                  <p className="text-center text-2xl font-bold text-red-500">
                    {service.price}{" "}
                    <span className="align-top text-xs">TND</span>
                  </p>

                    <a href="/contact" className="inline-block mt-4 rounded-lg border border-white px-4 py-2 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black">
                    Get in touch
                    </a>
                </div>
              </div>
            ))}
          </div>
        </main>
    </div>
    </Layout>
  );
}
