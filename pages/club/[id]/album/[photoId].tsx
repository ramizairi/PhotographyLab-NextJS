import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Layout from "../../../../components/layout";
import Loading from "../../../../components/common/Loading";
import ImageViewer from "../../../../components/ImageViewer";
import { AlbumHeader } from "../../../../components/AlbumHeader";
import AlbumGallery from "../../../../components/AlbumGallery";

const AlbumPage = ({ album, error }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-xl text-red-500">
          Error loading gallery: {error}
        </div>
      </div>
    );
  }

  if (!album) {
    return <Loading message="Loading album..." />;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black">
        <AnimatePresence>
          {selectedImageIndex !== null && (
            <ImageViewer
              imageIds={album.images.map((img) => img._id)}
              initialIndex={selectedImageIndex}
              onClose={() => setSelectedImageIndex(null)}
            />
          )}
        </AnimatePresence>
        <AlbumHeader album={album} />
        <AlbumGallery
          images={album.images}
        />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  console.log("Params received:", params); // Debugging

  try {
    // Extract albumId from the dynamic route (photoId in the URL)
    const albumId = params?.photoId;
    if (!albumId) {
      return {
        props: {
          album: null,
          error: "Album ID is missing in the URL.",
        },
      };
    }

    // Fetch album data from the API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/albums/${albumId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch album. Status: ${response.status}`);
    }

    const album = await response.json();

    // Return the album data as props
    return {
      props: {
        album,
      },
    };
  } catch (error) {
    // Handle errors and return an error message
    return {
      props: {
        album: null,
        error: error.message,
      },
    };
  }
}

export default AlbumPage;