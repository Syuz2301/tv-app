import React, { useState, useEffect } from 'react';

import { Media } from '../../types';
import { formatDuration } from '../../utils/dataLoader';
import ImageWithLoader from '../ImageWithLoader/ImageWithLoader';
import VideoWithLoader from '../VideoWithLoader/VideoWithLoader';
import './FeaturedMedia.css';

interface FeaturedMediaProps {
  media: Media;
  isPlaying: boolean;
}

const FeaturedMedia: React.FC<FeaturedMediaProps> = ({
  media,
  isPlaying,
}) => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (isPlaying && media.VideoUrl) {
      setShowVideo(true);
    } else {
      setShowVideo(false);
    }
  }, [isPlaying, media.VideoUrl]);


  const renderBackground = () => {
    if (showVideo && media.VideoUrl) {
      return (
        <VideoWithLoader
          src={media.VideoUrl}
          className="background-video"
          autoPlay
          muted
          loop
          playsInline
        />
      );
    }

    return (
      <ImageWithLoader
        src={`/assets/${media.CoverImage}`}
        alt={media.Title}
        className="background-image"
      />
    );
  };

  return (
    <div className="featured-media">
      <div className="featured-background">
        {renderBackground()}
      </div>

      <div className="featured-content">
        <div className="featured-info">
          <div className="featured-category">{media.Category}</div>

          <div className="featured-title">
            <ImageWithLoader
              src={`/assets/${media.TitleImage}`}
              alt={media.Title}
              className="title-logo"
            />
          </div>

          <div className="featured-meta">
            <span className="release-year">{media.ReleaseYear}</span>
            <span className="mpa-rating">{media.MpaRating}</span>
            <span className="duration">{formatDuration(media.Duration)}</span>
          </div>

          <div className="featured-description">{media.Description}</div>

          <div className="featured-actions">
            <button
              className="play-button"
              aria-label={`Play ${media.Title}`}
            >
              <span className="play-icon">▶</span>
              Play
            </button>

            <button
              className="more-info-button"
              aria-label={`More info about ${media.Title}`}
            >
              More Info
            </button>
          </div>
        </div>
      </div>

      <div className="background-overlay">
        <h2 className="trending-title">Trending Now</h2>
      </div>
    </div>
  );
};

export default FeaturedMedia;
