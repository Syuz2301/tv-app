import React, { useState, useRef } from 'react';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './VideoWithLoader.css';

interface VideoWithLoaderProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  onLoad?: () => void;
}

const VideoWithLoader: React.FC<VideoWithLoaderProps> = ({
  src,
  className = '',
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = false,
  onLoad,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCanPlay = () => {
    setIsLoading(false);
    onLoad?.();
  };


  return (
    <div className={`video-with-loader ${className}`}>
      {isLoading && (
        <div className="video-loader">
          <LoadingSpinner size="medium" />
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        className={`loaded-video ${isLoading ? 'loading' : 'loaded'}`}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        onCanPlay={handleCanPlay}
      />
    </div>
  );
};

export default VideoWithLoader;
