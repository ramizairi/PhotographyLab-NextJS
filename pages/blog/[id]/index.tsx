"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  Eye,
  MessageCircle,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";
import Layout from "../../../components/layout";
// Define the full Article type
interface Article {
  _id: string;
  image: string;
  name: string;
  description: string;
  content: string;
  eventDate: string;
  postedAt: string;
  author?: string;
  tags?: string[];
}

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!params.id) return;

      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/articles/${params.id}`
        );
        setArticle(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch article details");
        setIsLoading(false);
        console.error("Error fetching article:", err);
      }
    };

    fetchArticle();
  }, [params.id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: article?.name || "Article",
          url: window.location.href,
        })
        .catch((err) => console.error("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
          <p className="text-purple-400">Loading your article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <div className="flex h-screen items-center justify-center bg-gray-900 p-4">
          <div className="max-w-md rounded-xl bg-gray-800 p-8 text-center shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-red-900/20 p-3">
                <svg
                  className="h-10 w-10 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-xl font-bold text-white">
              Article Not Found
            </h2>
            <p className="mb-6 text-gray-400">
              {error ||
                "We couldn't find the article you're looking for. It may have been removed or the link might be incorrect."}
            </p>
            <button
              onClick={() => router.push("/blog")}
              className="w-full rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700"
            >
              Back to Articles
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Parse dates
  const postedDate = new Date(article.postedAt);
  const eventDate = article.eventDate ? new Date(article.eventDate) : null;

  // Generate random stats for demo purposes
  const viewCount = Math.floor(Math.random() * 1000) + 100;
  const commentCount = Math.floor(Math.random() * 20);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 py-8 text-white">
        {/* Hero Section with Image */}
        <div className="relative h-[60vh] w-full">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.name}
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
            <div className="container mx-auto max-w-5xl">
              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-purple-800/60 px-3 py-1 text-sm text-purple-200 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl xl:text-6xl">
                {article.name}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-300">
                {article.author && (
                  <div className="flex items-center">
                    <span className="mr-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-purple-700 text-base font-bold">
                      {article.author.charAt(0)}
                    </span>
                    <div>
                      <div className="font-medium text-white">
                        {article.author}
                      </div>
                      <div className="text-xs text-gray-400">Author</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-purple-400" />
                  <div>
                    <div className="font-medium">
                      {format(postedDate, "MMMM dd, yyyy")}
                    </div>
                    <div className="text-xs text-gray-400">Published</div>
                  </div>
                </div>

                {eventDate && (
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-purple-400" />
                    <div>
                      <div className="font-medium">
                        {format(eventDate, "MMMM dd, yyyy")}
                      </div>
                      <div className="text-xs text-gray-400">Event Date</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto max-w-5xl px-4 py-6 md:py-12">
          {/* Action Bar */}
          <div className="mb-8 flex items-center justify-between rounded-xl bg-gray-800 p-4">
            <Link
              href="/blog"
              className="flex items-center rounded-lg bg-gray-700 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
            <div className="flex space-x-2">
              {/** 
              <div className="flex items-center rounded-lg bg-gray-700 px-3 py-1.5 text-sm">
                <Eye className="mr-1.5 h-4 w-4 text-gray-400" />
                {viewCount}
              </div>

              <div className="flex items-center rounded-lg bg-gray-700 px-3 py-1.5 text-sm">
                <MessageCircle className="mr-1.5 h-4 w-4 text-gray-400" />
                {commentCount}
              </div>
*/}
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center rounded-lg px-3 py-1.5 text-sm ${
                  isBookmarked
                    ? "bg-purple-700 text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                <Bookmark
                  className={`mr-1.5 h-4 w-4 ${
                    isBookmarked ? "fill-white" : ""
                  }`}
                />
                {isBookmarked ? "Saved" : "Save"}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center rounded-lg bg-purple-700 px-4 py-2 text-sm text-white transition-colors hover:bg-purple-600"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg prose-headings:text-white prose-p:text-gray-300 prose-a:text-purple-400 prose-blockquote:border-purple-500 prose-blockquote:text-gray-300 prose-strong:text-white prose-code:text-purple-300 prose-pre:bg-gray-800 prose-pre:text-gray-300 prose-ol:text-gray-300 prose-ul:text-gray-300 prose-li:marker:text-purple-500 prose-hr:border-gray-700 dark:prose-invert max-w-none">
              {/* Render content - assumes it's HTML/Markdown */}
              <h1 className="text-5xl font-bold py-4 text-purple-700">Content</h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: article.content || article.description,
                }}
              />
            </div>
          </div>

          {/* Related Articles Section - Placeholder */}
          <div className="mt-16 border-t border-gray-800 pt-10">
            <h2 className="mb-6 text-2xl font-bold">Continue Reading</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((index) => (
                <div key={index} className="rounded-lg bg-gray-800 p-4">
                  <div className="mb-3 h-3 w-3/4 rounded bg-gray-700"></div>
                  <div className="mb-2 h-5 w-full rounded bg-gray-700"></div>
                  <div className="h-4 w-1/2 rounded bg-gray-700"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
