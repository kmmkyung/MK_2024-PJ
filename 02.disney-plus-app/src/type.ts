export interface Error {
  status: number;
  message: string;
}
export interface IGetMovie {
  dates: {maximum: string, minimum: string};
  page: number;
  results: IMovie[]
  total_pages: number;
  total_results: number;
}
export interface ISearchKeyWord {
  page: number;
  results: IMovie[]
  total_pages: number;
  total_results: number;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  media_type?: string;
  genre_ids?:number[]
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number; 
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IDetailMovie {
  config: {}
  data : IDetailMovieData[] | IDetailTvData[]
  headers: {} 
  request: {}
  status: number
  statusText: string;
}

export interface IDetailMovieData {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | {id: number, name: string, poster_path: string, backdrop_path: string};
  budget: number;
  genres: {id: number, name: string}[]
  homepage: string | null;
  id: number;
  imdb_id: string;
  origin_country: string[]
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {id: number, name: string, logo_path:string, origin_country:string}[]
  production_countries: {iso_3166_1: string, name: string}[]
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {iso_639_1: string, name: string}[]
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type?: string;
}

export interface IDetailTvData {
  adult: boolean;
  backdrop_path: string;
  created_by: {credit_id: string
    gender: number
    id: number
    name: string
    original_name: string
    profile_path: string | null}[]
  episode_run_time: number[]
  first_air_date: string
  genres: {id: number, name: string}[]
  homepage: string | null;
  id: number;
  in_production: boolean
  languages: []
  last_air_date: string;
  last_episode_to_air: {
    air_date: string,
    episode_number: number,
    episode_type: string,
    id: number,
    name: string,
    overview: string ,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path: string,
    vote_average: number,
    vote_count: number,
    } | null;
  name: string;
  networks: []
  next_episode_to_air: {
    air_date: string,
    episode_number: number,
    episode_type: string,
    id: number,
    name: string,
    overview: string ,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path: string,
    vote_average: number,
    vote_count: number,
    } | null;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { id:number, logo_path: string|null, name:string, origin_country:string}
  production_countries: {iso_3166_1:string, name: string}[]
  seasons: {
    air_date: string,
    episode_count:number,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number,
    vote_average: number,
  }[]
  spoken_languages: {english_name:string, iso_639_1: string, name:string}[]
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  media_type?: string;
}

export interface ICredits {
  cast:
    {
      adult: boolean;
      cast_id: number;
      character: string;
      credit_id: string;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      order: number;
      original_name: string;
      popularity: number;
      profile_path: string;
    }[]
  crew:
    {
      adult: boolean;
      credit_id: string;
      department: string;
      gender: number;
      id: number;
      job: string;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string | null;
    }[]
  id: number;
}

export interface ISimilar {
  page: number;
  results: IMovie[]
  total_pages: number;
  total_results: number;
}

export interface ICollection{
  backdrop_path: string;
  id: number;
  name: string;
  overview: string;
  parts: IMovie[];
  poster_path: string;
}

export interface ISeason{
  air_date: string;
  episodes: {
    air_date: string,
    episode_number: number,
    episode_type: string,
    guest_stars: []
    id: number,
    name: string,
    overview: string ,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path: string,
    vote_average: number,
    vote_count: number,
  }
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
  _id: string;
}

export interface companyData {
  companyName: string;
  mediaType: string;
  standard: string;
  tmdbCompanyId: number[];
  video: string;
  logo: string;
  backgroundImg: string;
}