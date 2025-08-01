import React, { useRef, useState, useCallback, useMemo } from 'react';

import { Media } from '../../types';
import ImageWithLoader from '../ImageWithLoader/ImageWithLoader';
import './TrendingCarousel.css';

// carousel  constants
const CAROUSEL_CONFIG = {
  MAX_VISIBLE_ITEMS: 8,
  ITEM_WIDTH: 200,
  GAP: 20,
  PADDING: 40,
} as const;

interface TrendingCarouselProps {
  medias: Media[];
  onMediaClick: (media: Media) => void;
}

const TrendingCarousel: React.FC<TrendingCarouselProps> = ({
  medias,
  onMediaClick,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const carouselWidth = useMemo(() => {
    return CAROUSEL_CONFIG.MAX_VISIBLE_ITEMS * CAROUSEL_CONFIG.ITEM_WIDTH +
           (CAROUSEL_CONFIG.MAX_VISIBLE_ITEMS - 1) * CAROUSEL_CONFIG.GAP +
           CAROUSEL_CONFIG.PADDING;
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!carouselRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;

    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMediaClick = useCallback((media: Media) => {
    if (!isDragging) {
      onMediaClick(media);
    }
  }, [isDragging, onMediaClick]);


  if (!medias || medias.length === 0) {
    return (
      <div className="trending-section">
        <div className="trending-carousel empty">
          <p>No trending media available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="trending-section">
      <div
        ref={carouselRef}
        className={`trending-carousel ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        role="region"
        aria-label="Trending media carousel"
        style={{ maxWidth: carouselWidth }}
      >
        <div className="carousel-container">
          {medias.map((media) => (
            <div
              key={media.Id}
              className="carousel-item"
              onClick={() => handleMediaClick(media)}
              tabIndex={0}
              role="button"
              aria-label={`Play ${media.Title}`}
            >
              <div className="media-cover">
                <ImageWithLoader
                  src={`/assets/${media.CoverImage}`}
                  alt={media.Title}
                  className="cover-image"
                />
                <div className="media-overlay">
                  <div className="play-hover" aria-hidden="true">▶</div>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingCarousel;

