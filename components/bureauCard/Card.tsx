"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin } from "lucide-react";

interface MemberProps {
  member: {
    name: string;
    role: string;
    image: string;
    linkedin: string;
  };
  index: number;
}

export default function MemberCard({ member, index }: MemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative h-48 w-48 sm:h-56 sm:w-56 md:h-60 md:w-60 lg:h-64 lg:w-64"
    >
      {/* Main circular container */}
      <div
        className="relative h-full w-full overflow-hidden rounded-full 
                    shadow-[0_8px_20px_-12px_rgba(0,0,0,0.3)] 
                    transition-all duration-500 
                    hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.4)]"
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 
                      opacity-100 transition-opacity duration-500 group-hover:opacity-0"
        />

        {/* Image container with grayscale effect */}
        <div className="relative h-full w-full transform transition-transform duration-700 group-hover:scale-110">
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            priority
            layout="fill"
            objectFit="cover"
            className="grayscale filter transition-all duration-500 ease-out group-hover:grayscale-0"
          />
        </div>

        {/* Hover overlay with gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                      opacity-0 transition-all duration-500 group-hover:opacity-100"
        />

        {/* Content container */}
        <div
          className="absolute inset-0 flex translate-y-4 transform flex-col justify-end p-4 
                      opacity-0 transition-all duration-500 
                      group-hover:translate-y-0 group-hover:opacity-100 
                      sm:p-5 md:p-6"
        >
          <div className="text-center">
            <h3 className="mb-1 text-base font-bold tracking-wide text-white sm:text-lg md:text-xl">
              {member.name}
            </h3>
            <p className="mb-2 text-xs text-gray-200 sm:mb-3 sm:text-sm">
              {member.role}
            </p>

            {/* LinkedIn button */}
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-white/20 
                       bg-white/10 px-3 py-1.5 text-xs text-white 
                       backdrop-blur-md transition-all duration-300 
                       hover:border-white/40 hover:bg-white/20
                       sm:px-4 sm:py-2 sm:text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
              <span>Connect</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}