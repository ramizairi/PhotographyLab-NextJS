"use client";

import { useState, useEffect } from "react";
import { BlogCard, type Article } from "../../components/blogCard";
import axios from "axios";
import Layout from "../../components/layout";
export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
        setArticles(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch articles");
        setIsLoading(false);
        console.error("Error fetching articles:", err);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center px-4">
        <div className="text-center">
          <div className="border-t-secondary h-8 w-8 animate-spin rounded-full border-4 border-white"></div>
          <p className="mt-4 text-white">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Layout>
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
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-8 py-28">
        <h1 className="mb-6 text-center text-3xl font-bold">Latest Articles</h1>

        {articles.length === 0 ? (
          <div className="rounded-lg bg-stone-800 p-6 text-center dark:bg-gray-500">
            <p className="text-gray-500 dark:text-gray-300">
              No articles found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <BlogCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
