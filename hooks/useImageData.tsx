import { useState, useEffect } from "react";

export const useImageData = (imageId) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/images/${imageId}`
        );
        if (!response.ok)
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        const { data } = await response.json();
        setState({ data, loading: false, error: null });
      } catch (err) {
        setState({ data: null, loading: false, error: err.message });
      }
    };
    fetchImage();
  }, [imageId]);

  return state;
};
