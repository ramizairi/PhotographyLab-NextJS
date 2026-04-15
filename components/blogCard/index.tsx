import { formatDistanceToNow, format } from "date-fns";
import { Calendar, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCloudinaryFetchUrl } from "../../utils/cloudinaryUrl";

// Define the Article type based on the mongoose schema
export interface Article {
  _id: string;
  image: string;
  name: string;
  description: string;
  eventDate: string;
  postedAt: string;
  tags?: string[];
}
export function BlogCard({ article }: { article: Article }) {
  // Safety check - if article is somehow a Promise, return a loading placeholder
  if (
    typeof article !== "object" ||
    article === null ||
    article.constructor === Promise
  ) {
    return (
      <div className="h-full rounded-xl bg-gray-900/30 p-6 text-center text-gray-400 backdrop-blur-sm">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-800/50"></div>
        <div className="mt-4 h-24 animate-pulse rounded bg-gray-800/50"></div>
      </div>
    );
  }

  // Parse dates
  const postedDate = new Date(article.postedAt);
  const eventDate = article.eventDate ? new Date(article.eventDate) : null;

  // Truncate description to 100 characters
  const shortDescription =
    article.description && article.description.length > 100
      ? `${article.description.substring(0, 100)}...`
      : article.description || "";

  return (
    <Link
      href={`/blog/${article._id}`}
      className="group block h-full transform transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-full overflow-hidden rounded-xl bg-gray-100 shadow-lg shadow-black/10 transition-all duration-300 hover:bg-black hover:shadow-xl hover:shadow-black/20">
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={getCloudinaryFetchUrl(article.image || "/placeholder.svg", {
              width: 720,
              quality: "auto:eco",
            })}
            alt={article.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center grayscale filter transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
          />

          {/* Hover overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

          {/* Floating Date */}
          <div className="absolute right-4 top-4 rounded-lg bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
            {format(postedDate, "MMM dd, yyyy")}
          </div>
        </div>

        <div className="bg-black/90 p-6 transition-all duration-300 group-hover:bg-transparent">
          <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-white">
            {article.name || "Untitled"}
          </h3>

          <p className="mb-4 text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
            {shortDescription}
          </p>

          {/* Tags if available */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-300 transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white"
                >
                  {tag}
                </span>
              ))}
              {article.tags.length > 3 && (
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700 transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white">
                  +{article.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {eventDate && (
            <div className="mb-3 flex items-center text-sm text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
              <Calendar className="mr-1 h-4 w-4" />
              <span>Event on {format(eventDate, "MMM dd, yyyy")}</span>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="flex items-center text-sm text-red-500 transition-colors duration-300 group-hover:text-white">
              Read article
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-[-0.125rem]" />
            </span>

            <span className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-700 transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white">
              {formatDistanceToNow(postedDate, { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
