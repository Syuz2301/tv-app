import React, { useState } from 'react';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './ImageWithLoader.css';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  src,
  alt,
  className = '',
  onLoad,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };



  return (
    <div className={`image-with-loader ${className}`}>
      {isLoading && (
        <div className="image-loader">
          <LoadingSpinner size="small" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`loaded-image ${isLoading ? 'loading' : 'loaded'}`}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default ImageWithLoader;
