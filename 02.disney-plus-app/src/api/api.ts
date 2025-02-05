import { IDetailMovie, IDetailMovieData, IDetailTvData, IMovie } from "../type";
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

export async function getLinkSearchData(programId:string) {
  const [programMediaMovie, programMediaTv] = await Promise.all([
    axiosInstance.get(`/movie/${programId}`),
    axiosInstance.get(`/tv/${programId}`)
  ]);
  if(programMediaMovie.data){
    programMediaMovie.data.media_type = 'movie'
    return programMediaMovie.data
  }
  if(programMediaTv.data){
    programMediaTv.data.media_type = 'tv'
    return programMediaTv.data
  }
  return null;
}

export async function getSearchProgram(locationData:IMovie, programId:string){
  const programMedia = locationData.media_type === 'movie' ? `/movie/${programId}` : `/tv/${programId}`;
  const response = await axiosInstance.get(programMedia)
  return response.data;
}

export async function getProgramCredits(locationData:IMovie, programId:string, linkSearchProgram:IDetailMovieData | IDetailTvData){
  const mediaType = linkSearchProgram?.media_type || locationData?.media_type;
  const creditsMedia = mediaType === 'movie' ? `/movie/${programId}/credits` : `/tv/${programId}/credits`;
  const response = await axiosInstance.get(creditsMedia)
  return response.data.cast.length > 0 ? response.data : null;
}

export async function getProgramSimilar(locationData:IMovie, programId:string, linkSearchProgram:IDetailMovieData | IDetailTvData){
  const mediaType = linkSearchProgram?.media_type || locationData?.media_type;
  const mediaSimilar = mediaType === 'movie' ? `/movie/${programId}/similar` : `/tv/${programId}/similar`;
  const response = await axiosInstance.get(mediaSimilar);
  return response.data.results.length > 0 ? response.data : null;
}

export async function getProgramCollection(linkSearchProgram:IDetailMovieData) {
  if(linkSearchProgram.belongs_to_collection){
    const collectionId = linkSearchProgram.belongs_to_collection.id;
    const response = await axiosInstance.get(`/collection/${collectionId}`);
    return response.data
  }
}