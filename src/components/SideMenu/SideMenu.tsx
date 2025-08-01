import React, { useState } from 'react';
import './SideMenu.css';

interface MenuItem {
  id: string;
  name: string;
  icon: string;
}

interface SideMenuProps {
  onMenuToggle?: (isOpen: boolean) => void;
}

const menuItems: MenuItem[] = [
  { id: 'search', name: 'Search', icon: '/assets/icons/ICON - Search.png' },
  { id: 'home', name: 'Home', icon: '/assets/icons/Group 46.png' },
  { id: 'tv-shows', name: 'TV Shows', icon: '/assets/icons/Group 56.png' },
  { id: 'movies', name: 'Movies', icon: '/assets/icons/Group 54.png' },
  { id: 'genres', name: 'Genres', icon: '/assets/icons/Group 53.png' },
  { id: 'watch-later', name: 'Watch Later', icon: '/assets/icons/Group 47.png' },
];

const SideMenu: React.FC<SideMenuProps> = ({ onMenuToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
    onMenuToggle?.(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    onMenuToggle?.(false);
  };

  return (
    <div
      className={`side-menu ${isOpen ? 'open' : ''}`}
    >
      <div
        className="menu-content"
        style={{ width: isOpen ? '200px' : '75px' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`profile-section ${isOpen ? 'visible' : 'hidden'}`}>
          <div className="profile-info">
            <div className="profile-avatar">
              <img src="/assets/seong_gihun.png" alt="Profile" />
            </div>
            <span className="profile-name">Daniel</span>
          </div>
        </div>

        {/* menu items */}
        <div className="menu-items">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${item.name === 'Home' ? 'selected-menu-item' : ''}`}
            >
              <img src={item.icon} alt={item.name} className="menu-icon" />
              {isOpen && <span className="menu-text">{item.name}</span>}
            </div>
          ))}
        </div>

        {/* bottom items */}
        <div className={`bottom-items ${isOpen ? 'visible' : 'hidden'}`}>
          <span className="bottom-item">LANGUAGE</span>
          <span className="bottom-item">GET HELP</span>
          <span className="bottom-item">EXIT</span>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
