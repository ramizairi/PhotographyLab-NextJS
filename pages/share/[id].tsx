"use client";

import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import { 
  ZoomIn, ZoomOut, Download, Share2, ArrowLeft, 
  Instagram, Facebook, Twitter, Copy, Heart, Info
} from "lucide-react";
import Loading from "../../components/common/Loading";
import Logo from "../../public/logo/logo-white.png";
import ImageNotFound from "../../components/common/ImageNotFound";

const ShareImagePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [notification, setNotification] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const imageRef = useRef(null);
  const controlsTimerRef = useRef(null);

  useEffect(() => {
    if (!id) return;

    const fetchImage = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/images/${id}`
        );
        
        if (!response.ok) {
          setError(true);
          return;
        }
        
        const data = await response.json();
        setImage(data.data);
        // Initialize like count from server data if available
        if (data.data.likes) {
          setLikeCount(data.data.likes);
        }
        
        // Check if user previously liked this image
        const likedImages = JSON.parse(localStorage.getItem('likedImages') || '[]');
        if (likedImages.includes(id)) {
          setLiked(true);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
    
    // Auto-hide controls after inactivity
    const handleActivity = () => {
      setShowControls(true);
      clearTimeout(controlsTimerRef.current);
      controlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };
    
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    
    handleActivity(); // Initialize timer
    
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      clearTimeout(controlsTimerRef.current);
    };
  }, [id]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(1);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image.path;
    link.download = `Photography_Lab_${image.title || id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Image downloaded successfully');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title || "Photography Lab Image",
          text: image.description || "Check out this amazing image from Photography Lab!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const handleFacebookShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    showNotification('Sharing to Facebook');
    setShowShareMenu(false);
  };

  const handleTwitterShare = () => {
    const text = `Check out this amazing photo: ${image.title || 'Photography Lab Image'}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    showNotification('Sharing to Twitter');
    setShowShareMenu(false);
  };

  const handleInstagramShare = () => {
    // Since direct Instagram sharing isn't available through web API,
    // let's copy the link and show instructions
    navigator.clipboard.writeText(window.location.href);
    showNotification('Link copied. Open Instagram and paste in your story!');
    setShowShareMenu(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotification('Link copied to clipboard');
    setShowShareMenu(false);
  };

  const handleLike = async () => {
    // Toggle like state
    const newLikedState = !liked;
    setLiked(newLikedState);
    
    // Update like count
    setLikeCount(prev => newLikedState ? prev + 1 : Math.max(0, prev - 1));
    
    // Store liked state in localStorage
    const likedImages = JSON.parse(localStorage.getItem('likedImages') || '[]');
    if (newLikedState && !likedImages.includes(id)) {
      likedImages.push(id);
    } else if (!newLikedState) {
      const index = likedImages.indexOf(id);
      if (index > -1) {
        likedImages.splice(index, 1);
      }
    }
    localStorage.setItem('likedImages', JSON.stringify(likedImages));
    
    // Send like to server if API supports it
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/${id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liked: newLikedState })
      });
    } catch (error) {
      console.error("Error updating like:", error);
      // If API call fails, still show UI update but log error
    }
    
    showNotification(newLikedState ? 'Added to favorites' : 'Removed from favorites');
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setTouchStart(e.targetTouches[0].clientX);
    } else if (e.touches.length === 2) {
      // Handle pinch zoom
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchStart(dist);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      setTouchEnd(e.targetTouches[0].clientX);
    } else if (e.touches.length === 2 && touchStart) {
      // Handle pinch zoom
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      
      if (dist > touchStart) {
        // Pinch out - zoom in
        setZoom(prev => Math.min(prev + 0.05, 3));
      } else if (dist < touchStart) {
        // Pinch in - zoom out
        setZoom(prev => Math.max(prev - 0.05, 0.5));
      }
      
      setTouchStart(dist);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || touchStart === touchEnd) return;
    
    if (touchStart - touchEnd > 75) {
      // Swipe left - zoom in
      handleZoomIn();
    } else if (touchStart - touchEnd < -75) {
      // Swipe right - zoom out
      handleZoomOut();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleDoubleTap = () => {
    // Toggle between zoomed state and normal
    if (zoom > 1) {
      setZoom(1);
    } else {
      setZoom(2);
    }
  };

  const handleImageClick = () => {
    // Toggle controls visibility on tap
    setShowControls(!showControls);
  };

  const goBack = () => {
    router.back();
  };

  if (loading) {
    return <Loading message="Loading your photography art..." />;
  }

  if (error || !image) {
    return <ImageNotFound />;
  }

  return (
    <>
      <Head>
        <title>{image.title || "Photography Lab Image"}</title>
        <meta property="og:title" content={image.title || "Photography Lab Image"} />
        <meta
          property="og:description"
          content={image.description || "Check out this amazing photography from Photography Lab!"}
        />
        <meta property="og:image" content={image.path} />
        <meta
          property="og:url"
          content={`https://www.photographylab.tn/share/${id}`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
      <div className="relative flex min-h-screen flex-col bg-gray-900">
        {/* Main image display */}
        <div
          className="flex flex-grow items-center justify-center overflow-hidden bg-black/90 p-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleImageClick}
          onDoubleClick={handleDoubleTap}
        >
          <div
            ref={imageRef}
            className="relative"
            style={{
              transform: `scale(${zoom})`,
              transition: "transform 0.3s ease",
              cursor: zoom > 1 ? "grab" : "default",
            }}
          >
            <Image
              src={image.path || "/placeholder.svg"}
              alt={image.title || "Photography Lab Image"}
              width={1200}
              height={800}
              className="h-auto max-w-full rounded-lg shadow-2xl"
              priority
              quality={95}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHg/bQWQAAAABJRU5ErkJggg=="
            />
          </div>
        </div>
        
        {/* Notification toast */}
        {notification && (
          <div className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 transform rounded-lg px-4 py-2 text-white shadow-lg ${
            notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}>
            {notification.message}
          </div>
        )}
        
        {/* Top controls - only visible when showControls is true */}
        <div className={`absolute left-0 right-0 top-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="flex items-center justify-between">
            <button 
              onClick={goBack}
              className="rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-red-600"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowInfo(!showInfo)}
                className={`rounded-full p-2 text-white backdrop-blur-sm transition ${
                  showInfo ? 'bg-red-600' : 'bg-black/50 hover:bg-red-600'
                }`}
              >
                <Info size={20} />
              </button>
              
              <button 
                onClick={handleLike}
                className={`flex items-center rounded-full px-3 py-2 text-white backdrop-blur-sm transition ${
                  liked ? 'bg-red-600' : 'bg-black/50 hover:bg-red-600'
                }`}
              >
                <Heart size={20} fill={liked ? "white" : "none"} />
                {likeCount > 0 && (
                  <span className="ml-1 text-sm">{likeCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom controls - only visible when showControls is true */}
        <div className={`absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="flex items-center justify-between">
            {/* Zoom controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleZoomOut}
                className="rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-gray-700"
              >
                <ZoomOut size={20} />
              </button>
              
              <button
                onClick={handleResetZoom}
                className="rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm transition hover:bg-gray-700"
              >
                {Math.round(zoom * 100)}%
              </button>
              
              <button
                onClick={handleZoomIn}
                className="rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-gray-700"
              >
                <ZoomIn size={20} />
              </button>
            </div>
            
            {/* Center logo */}
            <div className="flex-shrink-0">
              <Image
                src={Logo}
                alt="Photography Lab Logo"
                width={120}
                height={40}
                className="h-8 w-auto opacity-90"
              />
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownload}
                className="rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-blue-600"
              >
                <Download size={20} />
              </button>
              
              <div className="relative">
                <button
                  onClick={handleNativeShare}
                  className="rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-green-600"
                >
                  <Share2 size={20} />
                </button>
                
                {/* Share menu dropdown */}
                {showShareMenu && (
                  <div className="absolute bottom-full right-0 mb-2 w-40 rounded-lg bg-gray-800 p-2 shadow-lg">
                    <button
                      onClick={handleFacebookShare}
                      className="flex w-full items-center space-x-2 rounded px-3 py-2 text-left text-white transition hover:bg-gray-700"
                    >
                      <Facebook size={16} />
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={handleTwitterShare}
                      className="flex w-full items-center space-x-2 rounded px-3 py-2 text-left text-white transition hover:bg-gray-700"
                    >
                      <Twitter size={16} />
                      <span>Twitter</span>
                    </button>
                    <button
                      onClick={handleInstagramShare}
                      className="flex w-full items-center space-x-2 rounded px-3 py-2 text-left text-white transition hover:bg-gray-700"
                    >
                      <Instagram size={16} />
                      <span>Instagram</span>
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="flex w-full items-center space-x-2 rounded px-3 py-2 text-left text-white transition hover:bg-gray-700"
                    >
                      <Copy size={16} />
                      <span>Copy Link</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Image info overlay */}
        {showInfo && image && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 p-4 text-white backdrop-blur-sm">
            <div className="max-w-lg space-y-4 rounded-lg bg-gray-800/80 p-6">
              <button 
                className="absolute right-4 top-4 rounded-full bg-red-600 p-2 text-white"
                onClick={() => setShowInfo(false)}
              >
                <span className="sr-only">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h2 className="text-2xl font-bold">{image.title || "Untitled Photograph"}</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm text-gray-400">Date Taken</h3>
                  <p>{new Date(image.createdAt).toLocaleDateString() || "Unknown"}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-400">Photographer</h3>
                  <p>{image.photographer || "Photography Lab"}</p>
                </div>
                
                {image.camera && (
                  <div>
                    <h3 className="text-sm text-gray-400">Camera</h3>
                    <p>{image.camera}</p>
                  </div>
                )}
                
                {image.location && (
                  <div>
                    <h3 className="text-sm text-gray-400">Location</h3>
                    <p>{image.location}</p>
                  </div>
                )}
              </div>
              
              {image.description && (
                <div>
                  <h3 className="text-sm text-gray-400">Description</h3>
                  <p className="mt-1">{image.description}</p>
                </div>
              )}
              
              {image.tags && image.tags.length > 0 && (
                <div>
                  <h3 className="text-sm text-gray-400">Tags</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {image.tags.map((tag, index) => (
                      <span key={index} className="rounded-full bg-gray-700 px-3 py-1 text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShareImagePage;