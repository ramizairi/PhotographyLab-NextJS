"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Layout from "../../components/layout";
import ClubsGallery from "../../components/clubs";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clubs",
  description:
    "Immerse yourself in a world of passion, creativity, and community. Discover our vibrant clubs at IHEC CARTHAGE.",
};

export default function ClubPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <Layout>
      <div className="relative h-screen overflow-hidden" ref={ref}>
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <Image
            src="/ui/fac.jpg?height=1080&width=1920"
            alt="Club activities collage"
            layout="fill"
            objectFit="cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8"
        >
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
            Discover Our Vibrant Clubs
          </h1>
          <p className="mb-8 max-w-3xl text-xl sm:text-2xl md:text-3xl">
            Immerse yourself in a world of passion, creativity, and community
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-white bg-opacity-20 px-6 py-3 text-lg font-semibold text-white shadow-lg backdrop-blur-lg"
            href="#clubs"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#clubs")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Clubs
          </motion.a>
        </motion.div>
      </div>

      <section id="clubs" className="bg-black px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">
            Our Clubs
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-xl text-gray-300">
            From photography enthusiasts capturing life's precious moments to
            sports clubs pushing physical limits, our diverse range of clubs
            offers something for everyone. Join us and be part of a community
            that celebrates passion, creativity, and personal growth.
          </p>
          <ClubsGallery />
        </div>
      </section>
    </Layout>
  );
}
