import { AppData, Media } from '../types';

export const loadAppData = (): AppData => {
  return require('../data.json');
};

export const getSortedTrendingMedias = (): Media[] => {
  const data = loadAppData();
  const trendingMedias = [...data.TendingNow];

  const lastClickedId = sessionStorage.getItem('lastClickedMediaId');

  if (lastClickedId) {
    // sort medias last clicked first, then by date
    trendingMedias.sort((a, b) => {
      if (a.Id === lastClickedId) return -1;
      if (b.Id === lastClickedId) return 1;
      return new Date(b.Date).getTime() - new Date(a.Date).getTime();
    });
  } else {
    // newest first
    trendingMedias.sort((a, b) =>
      new Date(b.Date).getTime() - new Date(a.Date).getTime(),
    );
  }

  return trendingMedias.slice(0, 50);
};

export const setLastClickedMedia = (mediaId: string): void => {
  sessionStorage.setItem('lastClickedMediaId', mediaId);
};

export const formatDuration = (seconds: string): string => {
  const totalSeconds = parseInt(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};
