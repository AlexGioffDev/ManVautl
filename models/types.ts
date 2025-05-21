export interface MangasResults {
  pagination: Pagination;
  data: MangaDetails[];
}

export interface MangaDetails {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: null | string;
  title_japanese: string;
  title_synonyms: string[];
  type: DatumType;
  chapters: number | null;
  volumes: number | null;
  status: Status;
  publishing: boolean;
  published: Published;
  score: number;
  scored: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: null | string;
  background: null | string;
  authors: Author[];
  serializations: Author[];
  genres: Author[];
  explicit_genres: any[];
  themes: Author[];
  demographics: Author[];
}

export interface Author {
  mal_id: number;
  type: AuthorType;
  name: string;
  url: string;
}

export enum AuthorType {
  Manga = "manga",
  People = "people",
}

export interface Image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Published {
  from: Date;
  to: Date | null;
  prop: Prop;
  string: string;
}

export interface Prop {
  from: From;
  to: From;
}

export interface From {
  day: number | null;
  month: number | null;
  year: number | null;
}

export enum Status {
  Finished = "Finished",
}

export interface Title {
  type: TitleType;
  title: string;
}

export enum TitleType {
  Default = "Default",
  English = "English",
  Japanese = "Japanese",
  Synonym = "Synonym",
}

export enum DatumType {
  LightNovel = "Light Novel",
  Manga = "Manga",
  OneShot = "One-shot",
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: Items;
}

export interface Items {
  count: number;
  total: number;
  per_page: number;
}

export interface MangasRecommendations {
  data: MangaRecommendation[];
}

export interface MangaRecommendation {
  entry: Entry;
  url: string;
  votes: number;
}

export interface Entry {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  title: string;
}

export interface MangaData {
  details: MangaDetails;
  recommendations: MangaRecommendation[];
}
