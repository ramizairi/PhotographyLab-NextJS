import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
}
{/*${title.toLowerCase().replace(/\s/g, "-")} */}
export function EventCard({
  title,
  date,
  time,
  location,
  image,
}: EventCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image || "/clubs/logo/hecfa.jpg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
        <div className="mb-4 space-y-2 text-sm text-gray-300">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="mr-2 h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>
        <Link
          href={`/club/hecfa/event//album`}
          className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-black hover:bg-transparent hover:text-gray-400 group-hover:-translate-y-2"
        >
          See More
        </Link>
      </div>
    </div>
  );
}
