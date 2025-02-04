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