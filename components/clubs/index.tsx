import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import H1 from "../common/H1Test";
import { createClubSlug } from "../../utils/slug";
import { getCloudinaryFetchUrl } from "../../utils/cloudinaryUrl";

export default function ClubsGallery() {
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clubs`);
        
        // Sort clubs to prioritize Photography Lab and HEC FA
        const sortedClubs = response.data.sort((a, b) => {
          if (a.name === "Photography Lab") return -1;
          if (b.name === "Photography Lab") return 1;
          if (a.name === "HEC FA") return -1;
          if (b.name === "HEC FA") return 1;
          return 0;
        });
        
        setClubs(sortedClubs);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch clubs");
        setIsLoading(false);
        console.error("Error fetching clubs:", err);
      }
    };

    fetchClubs();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center px-4">
        <div className="text-center">
          <div className="border-t-secondary h-8 w-8 animate-spin rounded-full border-4 border-white"></div>
          <p className="mt-4 text-white">Loading clubs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center px-4">
        <div className="rounded-lg bg-red-100 p-6 text-center dark:bg-red-900">
          <p className="text-red-700 dark:text-red-200">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <H1 title="IHEC Carthage Clubs" center/>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl dark:bg-gray-800"
          >
            <div className="relative h-96">
              <Image
                src={getCloudinaryFetchUrl(club.image || "/placeholder.svg", {
                  width: 720,
                  quality: "auto:eco",
                })}
                alt={club.name}
                fill
                className="object-cover object-center grayscale filter transition-all duration-300 ease-in-out group-hover:filter-none"
                quality={50} 
                priority={club.name === "Photography Lab" || club.name === "HEC FA"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="mb-2 text-2xl font-bold transition-transform duration-300 group-hover:translate-y-[-0.5rem]">
                {club.name}
              </h2>
              <Link
                href={`/club/${createClubSlug(club.name || club.slug || club._id)}`}
                className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-black hover:bg-transparent hover:text-black group-hover:-translate-y-2"
              >
                See More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
