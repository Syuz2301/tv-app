import { useState, useCallback, useMemo } from 'react';

import { Media } from '../types';
import { loadAppData, getSortedTrendingMedias, setLastClickedMedia } from '../utils/dataLoader';

export const useMediaManager = () => {
  const initialData = useMemo(() => loadAppData(), []);

  const [featuredMedia, setFeaturedMedia] = useState<Media | null>(initialData.Featured);
  const [trendingMedias, setTrendingMedias] = useState<Media[]>(getSortedTrendingMedias());
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);


  const handleMediaClick = useCallback((media: Media) => {
    setFeaturedMedia(media);

    setLastClickedMedia(media.Id);

    // stop  currently playing video
    setIsVideoPlaying(false);

    // start video playback after 2 seconds
    const videoTimerId = setTimeout(() => {
      setIsVideoPlaying(true);
    }, 2000);

    setTrendingMedias(getSortedTrendingMedias());

    return () => clearTimeout(videoTimerId);
  }, []);

  const resetVideoPlayback = useCallback(() => {
    setIsVideoPlaying(false);
  }, []);

  const mediaState = useMemo(() => ({
    featuredMedia,
    trendingMedias,
    isVideoPlaying,
    hasFeaturedMedia: !!featuredMedia,
  }), [featuredMedia, trendingMedias, isVideoPlaying]);

  return {
    ...mediaState,
    handleMediaClick,
    resetVideoPlayback,
  };
};
