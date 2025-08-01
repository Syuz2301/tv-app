import  { useState, useCallback } from 'react';

import { useMediaManager } from '../../hooks';
import FeaturedMedia from '../FeaturedMedia/FeaturedMedia';
import SideMenu from '../SideMenu/SideMenu';
import TrendingCarousel from '../TrendingCarousel/TrendingCarousel';
import './TVApp.css';

const TVApp = () => {
  const {
    featuredMedia,
    trendingMedias,
    isVideoPlaying,
    hasFeaturedMedia,
    handleMediaClick,
  } = useMediaManager();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = useCallback((isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  }, []);

  // show loading  if no featured media is available
  if (!hasFeaturedMedia || !featuredMedia) {
    return (
      <div className="loading">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <SideMenu onMenuToggle={handleMenuToggle} />

      <main className={`main-content ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="content-wrapper">
          <FeaturedMedia
            media={featuredMedia}
            isPlaying={isVideoPlaying}
          />

          <TrendingCarousel
            medias={trendingMedias}
            onMediaClick={handleMediaClick}
          />
        </div>
      </main>
    </div>
  );
};

export default TVApp;
