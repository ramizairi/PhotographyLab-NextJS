type CloudinaryFetchOptions = {
  width?: number;
  quality?: "auto" | "auto:eco" | "auto:good" | "auto:best";
  forceCloudinaryForLocal?: boolean;
};

const CLOUDINARY_FETCH_PREFIX = "/image/fetch/";
const CLOUDINARY_UPLOAD_PREFIX = "/image/upload/";
const SITE_ASSET_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://photographylab.tn";

function getAbsoluteAssetUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path, SITE_ASSET_BASE_URL).toString();
}

export function getCloudinaryFetchUrl(
  path: string,
  options: CloudinaryFetchOptions = {},
) {
  if (!path) {
    return "/placeholder.svg";
  }

  if (path.startsWith("/") && !options.forceCloudinaryForLocal) {
    return path;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    return path;
  }

  const { width = 800, quality = "auto" } = options;
  const transformation = `f_auto,q_${quality},w_${width}`;
  const cloudinaryBase = `https://res.cloudinary.com/${cloudName}`;

  if (path.startsWith(cloudinaryBase) && path.includes(CLOUDINARY_FETCH_PREFIX)) {
    const [prefix, fetchRest] = path.split(CLOUDINARY_FETCH_PREFIX);
    const remoteUrlIndex = fetchRest.search(/https?(%3A|:)/i);

    if (remoteUrlIndex >= 0) {
      return `${prefix}${CLOUDINARY_FETCH_PREFIX}${transformation}/${fetchRest.slice(
        remoteUrlIndex,
      )}`;
    }

    return path;
  }

  if (path.startsWith(cloudinaryBase) && path.includes(CLOUDINARY_UPLOAD_PREFIX)) {
    return path.replace(
      CLOUDINARY_UPLOAD_PREFIX,
      `${CLOUDINARY_UPLOAD_PREFIX}${transformation}/`,
    );
  }

  return `${cloudinaryBase}/image/fetch/${transformation}/${encodeURIComponent(
    getAbsoluteAssetUrl(path),
  )}`;
}

export function getCloudinaryVideoFetchUrl(path: string, width = 1600) {
  if (!path) {
    return "";
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    return path;
  }

  return `https://res.cloudinary.com/${cloudName}/video/fetch/f_auto,q_auto,w_${width}/${encodeURIComponent(
    getAbsoluteAssetUrl(path),
  )}`;
}

export function getCloudinaryVideoPosterUrl(path: string, width = 1600) {
  if (!path) {
    return "";
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    return "";
  }

  return `https://res.cloudinary.com/${cloudName}/video/fetch/f_jpg,q_auto,w_${width},so_0/${encodeURIComponent(
    getAbsoluteAssetUrl(path),
  )}`;
}

function encodeCloudinaryPublicId(publicId: string) {
  return publicId.split("/").map(encodeURIComponent).join("/");
}

function getVideoConfig(url?: string) {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "player.cloudinary.com") {
      const cloudName = parsedUrl.searchParams.get("cloud_name");
      const publicId = parsedUrl.searchParams.get("public_id");

      if (cloudName && publicId) {
        return { cloudName, publicId };
      }
    }

    const uploadMatch = parsedUrl.href.match(
      /res\.cloudinary\.com\/([^/]+)\/video\/upload\/(?:[^/]+\/)?(.+)$/,
    );

    if (uploadMatch) {
      return {
        cloudName: uploadMatch[1],
        publicId: uploadMatch[2].replace(/\.[a-z0-9]+$/i, ""),
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function getCloudinaryVideoUploadUrl(url?: string, width = 1600) {
  const videoConfig = getVideoConfig(url);

  if (!videoConfig) {
    return url || "";
  }

  return `https://res.cloudinary.com/${videoConfig.cloudName}/video/upload/f_auto,q_auto,w_${width}/${encodeCloudinaryPublicId(
    videoConfig.publicId,
  )}`;
}

export function getCloudinaryVideoUploadPosterUrl(url?: string, width = 1600) {
  const videoConfig = getVideoConfig(url);

  if (!videoConfig) {
    return "";
  }

  return `https://res.cloudinary.com/${videoConfig.cloudName}/video/upload/f_jpg,q_auto,w_${width},so_0/${encodeCloudinaryPublicId(
    videoConfig.publicId,
  )}`;
}
