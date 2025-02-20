"use client";

import { motion } from "framer-motion";
import MemberCard from "./Card";
import { members } from "./members";
import H1 from "../common/H1Test";

export default function ClubMembers() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      {/* Animated background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 32V.5H1"
                fill="none"
                stroke="white"
                strokeOpacity="0.1"
              ></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"></rect>
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 mx-auto max-w-7xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 sm:mb-12 lg:mb-16"
        >
          <H1 title="Club Office" center />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 gap-8 xs:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
        >
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + Math.min(index * 0.1, 1), // Cap the delay at 1 second
              }}
              className="flex justify-center"
            >
              <MemberCard member={member} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}