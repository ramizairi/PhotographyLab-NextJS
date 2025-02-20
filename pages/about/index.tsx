import React from "react";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Layout from "../../components/layout";
import MemberCard from "../../components/bureauCard/index";
const Home = () => {
  return (
    <Layout>
      <style jsx global>{`
        @font-face {
          font-family: "Flaticon";
          src: url("/fonts/falticon/font/Flaticon.woff") format("woff2");
          font-weight: normal;
          font-style: normal;
        }

        body {
          font-family: "Flaticon", sans-serif;
        }
      `}</style>

      <div className="mt-4 min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
        <main className="py-24">
          <div className="container mx-auto px-6">
            <h2 className="mb-16 bg-gradient-to-r bg-clip-text text-center text-6xl font-bold tracking-tight text-transparent text-white">
              Get Know Us
            </h2>

            <div className="mb-24 flex flex-col items-center gap-16 md:flex-row md:items-start">
              <div className="md:w-8/12">
                <div className="hover:scale-102 overflow-hidden shadow-2xl transition-transform duration-300">
                  <Image
                    src="/bureau/all.PNG?height=600&width=800"
                    alt="Services"
                    width={800}
                    height={600}
                    quality={100}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-4/12">
                <div className="space-y-6 p-6 bg-black bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg">
                  <Image
                  src={"/logo/logo-white.png"}
                  alt="Logo"
                  width={200}
                  height={200}
                  className="mx-auto"
                  />
                  <h3 className="bg-gradient-to-r text-white bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent">
                  Our Mission
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-300">
                  Founded in 2016, the Photography Lab at IHEC Carthage is a
                  vibrant hub for audiovisual enthusiasts! 🎥📸 More than just
                  a club, it's a creative space where talent meets
                  opportunity. Through immersive workshops and inspiring
                  events, we empower members to refine their skills, connect
                  with like-minded peers, and capture unforgettable moments.
                  ✨
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <MemberCard />
      </div>
    </Layout>
  );
};

export default Home;
