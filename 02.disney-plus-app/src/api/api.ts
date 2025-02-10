import { IDetailMovieData, IDetailTvData, ISearchKeyWord } from "../type";
import axiosInstance from "./axios"
import requests from './request';

export async function getBannerMovie(){
  const response = await axiosInstance.get(requests.fetchNowPlaying)
  return response.data;
}

export async function getNowPlayMovie(){
  const response = await axiosInstance.get(requests.fetchNowPlaying)
  return response.data;
}

export async function getTrending(){
  const response = await axiosInstance.get(requests.fetchTrending)
  return response.data;
}

export async function getTopRated(){
  const response = await axiosInstance.get(requests.fetchTopRated)
  return response.data;
}

export async function getActionMovie(){
  const response = await axiosInstance.get(requests.fetchActionMovies)
  return response.data;
}

export async function getComedyMovie(){
  const response = await axiosInstance.get(requests.fetchComedyMovies)
  return response.data;
}

export async function getRomanceMovie(){
  const response = await axiosInstance.get(requests.fetchRomanceMovies)
  return response.data;
}

export async function getSearchKeyWordProgram(keyWord:string){
  const response = await axiosInstance.get(`/search/multi?include_adult=false&query=${keyWord}`)
  return response.data
}

export async function getLinkSearchData(programId:string) {
  try {
    const programMediaMovie = axiosInstance.get(`/movie/${programId}`);
    const programMediaTv = axiosInstance.get(`/tv/${programId}`);
    const [movieResponse, tvResponse] = await Promise.all([programMediaMovie, programMediaTv]);

    // 영화 데이터가 있으면
    if (movieResponse && movieResponse.data) {
      movieResponse.data.media_type = 'movie';
      return movieResponse.data;

    }
    // TV 데이터가 있으면
    else if (tvResponse && tvResponse.data) {
      tvResponse.data.media_type = 'tv';
      return tvResponse.data;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function getSearchProgram(locationData:IDetailMovieData | IDetailTvData, programId:string){
  const programMedia = locationData.media_type === 'movie' ? `/movie/${programId}` : `/tv/${programId}`;
  const response = await axiosInstance.get(programMedia)
  return response.data;
}

export async function getProgramCredits(locationData:IDetailMovieData | IDetailTvData, programId:string, searchProgram:IDetailMovieData | IDetailTvData){
  const mediaType = searchProgram?.media_type || locationData?.media_type;
  const creditsMedia = mediaType === 'movie' ? `/movie/${programId}/credits` : `/tv/${programId}/credits`;
  const response = await axiosInstance.get(creditsMedia)
  return response.data.cast.length > 0 ? response.data : null;
}

export async function getProgramSimilar(locationData:IDetailMovieData | IDetailTvData, programId:string, searchProgram:IDetailMovieData | IDetailTvData){
  const mediaType = searchProgram?.media_type || locationData?.media_type;
  const mediaSimilar = mediaType === 'movie' ? `/movie/${programId}/similar` : `/tv/${programId}/similar`;
  const response = await axiosInstance.get(mediaSimilar);
  return response.data.results.length > 0 ? response.data : null;
}

export async function getProgramCollection(searchProgram:IDetailMovieData) {
  if(searchProgram.belongs_to_collection){
    const collectionId = searchProgram.belongs_to_collection?.id;
    const response = await axiosInstance.get(`/collection/${collectionId}`);  
    return response.data
  }
  return null;
}

export async function getCompanyData(mediaType:string, standard:string, tmdbCompanyId:number[], pageNumber:number){
  if (tmdbCompanyId.length > 1) {
    const responses = await Promise.all(
      tmdbCompanyId.map(async (ele) => {
        const response = await axiosInstance.get(`/discover/${mediaType}?${standard}=${ele}&sort_by=release_date.desc&page=${pageNumber}`);
        return response.data.results
      })
    );
    const resultObj = {results:responses.flat().slice(0,20)}
    return resultObj
  }
  

  else{
    const response = await axiosInstance.get(`/discover/${mediaType}?${standard}=${tmdbCompanyId}&sort_by=release_date.desc&page=${pageNumber}`)
    return response.data
  }
}