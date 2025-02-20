"use client"

import { useEffect, useState } from "react"
import SectionTitle from "../common/SectionTitle"

const Features = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDarkMode(darkModeMediaQuery.matches)

    const handleChange = (e) => setIsDarkMode(e.matches)
    darkModeMediaQuery.addEventListener("change", handleChange)

    return () => darkModeMediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <section
      id="features"
      className="relative overflow-hidden h-screen w-full" // Changed to h-screen and w-full
    >
      <video className="absolute left-0 top-0 h-full w-full object-cover" autoPlay loop muted playsInline>
        <source src="/video/main-video.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className={`absolute left-0 top-0 h-full w-full ${
          isDarkMode ? "bg-black/50" : "bg-white/50"
        } transition-colors duration-300`}
      ></div>
      <div className="container relative z-10 mx-auto h-full flex flex-col items-center justify-center">
        {" "}
        {/* Added h-full */}
        <div className="w-full max-w-4xl mx-auto text-center p-4">
          <SectionTitle
            title="Get to know us"
            paragraph="Founded in 2016, the Photography Lab at IHEC Carthage is a vibrant hub for audiovisual enthusiasts! 🎥📸 More than just a club, it's a creative space where talent meets opportunity. Through immersive workshops and inspiring events, we empower members to refine their skills, connect with like-minded peers, and capture unforgettable moments. ✨"
            center
          />
        </div>
      </div>
    </section>
  )
}

export default Features

