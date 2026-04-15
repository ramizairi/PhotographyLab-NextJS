import Layout from "../../../../components/layout";
import Loading from "../../../../components/common/Loading";
import { AlbumHeader } from "../../../../components/AlbumHeader";
import AlbumGallery from "../../../../components/AlbumGallery";
import Head from "next/head";
import { createAlbumSlug, createClubSlug } from "../../../../utils/slug";
import { getCloudinaryFetchUrl } from "../../../../utils/cloudinaryUrl";

const AlbumPage = ({ album, error, canonicalPath }) => {
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://photographylab.tn";
  const clubName = album.clubId?.name || "Photography Lab";
  const description = `${album.title} photo album by ${clubName}.`;

  return (
    <Layout>
      <Head>
        <title>{`${album.title} | ${clubName} | Photography Lab`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}${canonicalPath}`} />
        <meta property="og:title" content={`${album.title} | ${clubName}`} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={getCloudinaryFetchUrl(album.coverImage, { width: 1200 })}
        />
      </Head>
      <div className="min-h-screen bg-black">
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

  try {
    const clubIdentifier = params?.id;
    const albumIdentifier = params?.photoId;

    if (!clubIdentifier || !albumIdentifier) {
      return {
        props: {
          album: null,
          error: "Club or album identifier is missing in the URL.",
        },
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/albums/club/${encodeURIComponent(
        clubIdentifier
      )}/album/${encodeURIComponent(albumIdentifier)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch album. Status: ${response.status}`);
    }

    const album = await response.json();
    const clubSlug = createClubSlug(
      album.clubId?.name || album.clubId?.slug || clubIdentifier
    );
    const albumSlug = createAlbumSlug(album.title || album.slug || albumIdentifier);
    const canonicalPath = `/club/${clubSlug}/album/${albumSlug}`;
    const requestedPath = context.resolvedUrl.split("?")[0];

    if (requestedPath !== canonicalPath) {
      return {
        redirect: {
          destination: canonicalPath,
          permanent: true,
        },
      };
    }

    return {
      props: {
        album,
        canonicalPath,
      },
    };
  } catch (error) {
    return {
      props: {
        album: null,
        error: error.message,
      },
    };
  }
}

export default AlbumPage;
