import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  const navigationLinks = [
    { title: "Services", href: "/services" },
    { title: "Events", href: "/club/67b339b5456d5d242b97d7bd" },
    { title: "Clubs", href: "/clubs" },
    { title: "About", href: "/about" },
  ];

  return (
    <footer className="relative min-w-full border-t border-gray-800 bg-black/80 p-0 backdrop-blur-md">
      {/* Main content wrapper without container class */}
      <div className="w-full px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src="/logo/logo-white.png"
                  alt="PhotographyLab Logo"
                  className="h-24 w-auto"
                />
              </div>
              <p className="text-sm text-gray-400">
                Capturing moments, creating memories, and inspiring through the
                lens.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Navigation</h3>
              <ul className="space-y-2">
                {navigationLinks.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className="text-gray-400 transition-colors duration-200 hover:text-red-500"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Connect</h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-colors duration-200 hover:bg-red-500"
                >
                  <FaInstagram size={20} className="text-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-colors duration-200 hover:bg-red-500"
                >
                  <FaTwitter size={20} className="text-white" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-colors duration-200 hover:bg-red-500"
                >
                  <FaLinkedin size={20} className="text-white" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-colors duration-200 hover:bg-red-500"
                >
                  <FaGithub size={20} className="text-white" />
                </a>
              </div>
            </div>

            {/* Sign In Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Join Us</h3>
              <div className="space-y-3">
                <a
                  href="/signin"
                  className="block rounded-lg bg-red-600 px-4 py-2 text-center text-white transition-colors duration-200 hover:bg-red-700"
                >
                  Sign In
                </a>
                <p className="text-sm text-gray-400">
                  New to PhotographyLab?{" "}
                  <a href="/signup" className="text-red-500 hover:text-red-400">
                    Create an account
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 border-t border-gray-800 pt-8">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} 
                <a
                  href="https://www.photographylab.tn"
                  rel="noopener noreferrer"
                  className="hover:text-red-700 ml-1"
                >
                  PHOTOGRAPHYLAB,{" "}
                </a>
                <a
                  href="https://www.ihec.rnu.tn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-700"
                >
                  IHEC CARTHAGE
                </a>
                . All rights reserved.
              </p>
              <p className="text-sm text-gray-400">
                Made with 💛 by{" "}
                <a
                  href="https://hecfa.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#fcd53f] hover:text-yellow-500"
                >
                  HECFA
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
