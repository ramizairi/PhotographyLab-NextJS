"use client";
import { useState } from "react";

const Map = () => {
  return (
    <div className="bg-gray-light dark:bg-bg-color-dark flex h-96 w-full items-center justify-center md:h-[450px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.1719228646098!2d10.334598676271934!3d36.86230346419562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2b5dee2eb6d9d%3A0x3ab39d7f6d3fed5d!2sPhotography%20Lab%20Ihec%20Carthage!5e0!3m2!1sen!2stn!4v1739439422822!5m2!1sen!2stn"
        width="100%"
        height="450"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;
