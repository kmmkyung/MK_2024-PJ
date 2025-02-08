import styled from "styled-components";
import Banner from "../components/Banner";
import Companies from "../components/Companies";
import { useQuery } from "@tanstack/react-query";
import { getActionMovie, getBannerMovie, getComedyMovie, getNowPlayMovie, getRomanceMovie, getTopRated, getTrending } from "../api/api";
import { IGetMovie, IMovie, Error } from "../type";
import RowMovie from "../components/RowMovie";
import Loader from "../components/Loader";

const HomeWrap = styled.main`
  padding: 80px 0;
  background: url('/images/home-background.png') center center / cover no-repeat fixed;
  min-height: 100vh;
`;

const useQueries = () => {
  const bannerMovie = useQuery<IGetMovie, Error, IMovie[]>({
    queryKey: ['bannerMovie'],
    queryFn: getBannerMovie,
    select: (data) => data.results.slice(0, 6)
  })
  const trendingNow = useQuery<IGetMovie, Error, IMovie[]>({
    queryKey: ['trendingNow'],
    queryFn: getTrending,
    select: (data) => data.results.filter(ele=> ele.backdrop_path !== null && ele.backdrop_path)
  })
  const nowPlayMovie = useQuery<IGetMovie, Error, IMovie[]>({
    queryKey: ['nowPlayMovie'],
    queryFn: getNowPlayMovie,
    select: (data) => data.results.filter(ele=> ele.backdrop_path !== null && ele.backdrop_path)
  })
  const topRatedMovie = useQuery<IGetMovie,Error, IMovie[]>({
    queryKey: ['topRatedMovie'],
    queryFn: getTopRated,
    select: (data) => data.results.filter(ele=> ele.backdrop_path !== null && ele.backdrop_path)
  })
  const actionMovie = useQuery<IGetMovie, Error, IMovie[]>({
    queryKey: ['actionMovie'],
    queryFn: getActionMovie,
    select: (data) => data.results.filter(ele=> ele.backdrop_path !== null && ele.backdrop_path)
  })
  const comedyMovie = useQuery<IGetMovie, Error, IMovie[]>({
    queryKey: ['comedyMovie'],
    queryFn: getComedyMovie,
    select: (data) => data.results.filter(ele=> ele.backdrop_path !== null && ele.backdrop_path)
  })
  const romanceMovie = useQuery<IGetMovie, Error, IMovie[]>({
    queryKey: ['romanceMovie'],
    queryFn: getRomanceMovie,
    select: (data) => data.results.filter(ele=> ele.backdrop_path !== null)
  })
  return [ bannerMovie, trendingNow, nowPlayMovie, topRatedMovie, actionMovie, comedyMovie, romanceMovie ];
}
function Home (){
  const [
    {data: bannerMovieData, isLoading: bannerLoading},
    {data: trendingNowData, isLoading: trendingNowLoading}, // mid o
    {data: nowPlayMovieData, isLoading: nowPlayMovieLoading}, 
    {data: topRatedMovieData, isLoading: topRatedMovieLoading},
    {data: actionMovieData, isLoading: actionMovieLoading},
    {data: comedyMovieData, isLoading: comedyMovieLoading},
    {data: romanceMovieData, isLoading: romanceMovieLoading},
  ] = useQueries();  
  
  return (
    <HomeWrap>
      {bannerLoading && trendingNowLoading && nowPlayMovieLoading && topRatedMovieLoading && actionMovieLoading && comedyMovieLoading && romanceMovieLoading ? <Loader/> :
      <>
        <Banner bannerMovieData={bannerMovieData as IMovie[]}/>
        <Companies/>
        <RowMovie id='trendingNow' title='Trending Now' movieData={trendingNowData as IMovie[]}/>
        <RowMovie id='nowMovies' title='Now Movies' mediaType='movie' movieData={nowPlayMovieData as IMovie[]}/>
        <RowMovie id='topRated' title='Top Rated' mediaType='movie' movieData={topRatedMovieData as IMovie[]}/>
        <RowMovie id='actionMovies' title='Action Movies' mediaType='movie' movieData={actionMovieData as IMovie[]}/>
        <RowMovie id='comedyMovies' title='Comedy Movies' mediaType='movie' movieData={comedyMovieData as IMovie[]}/>
        <RowMovie id='romanceMovies' title='Romance Movies' mediaType='movie' movieData={romanceMovieData as IMovie[]}/>
      </>
      }
    </HomeWrap>
  )
}

export default Home;