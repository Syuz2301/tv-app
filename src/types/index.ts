export interface Media {
  Id: string;
  Title: string;
  CoverImage: string;
  TitleImage: string;
  Date: string;
  ReleaseYear: string;
  MpaRating: string;
  Category: string;
  Duration: string;
  VideoUrl: string;
  Description: string;
}

export interface AppData{
  Featured: Media;
  TendingNow: Media[];
}

export interface MenuItem {
  id: string;
  name: string;
  icon: string;
}

export interface ProfileInfo {
  name: string;
  avatar: string;
}
