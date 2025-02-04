import styled from "styled-components";
import Banner from "../components/Banner";
import Companies from "../components/Companies";
import { useQuery } from "@tanstack/react-query";
import { getActionMovie, getBannerMovie, getComedyMovie, getNowPlayMovie, getRomanceMovie, getTopRated, getTrending } from "../api/api";
import { IGetMovie, IMovie, Error } from "../type";
import RowMovie from "../components/RowMovie";
import Loader from "../components/Loader";

const HomeWrap = styled.main`
  padding: 100px 0;
  background: url('/images/home-background.png') center center / cover no-repeat fixed;
  min-height: 100vh;
`;

const useQueries = () => {
  const bannerMovie = useQuery<IGetMovie, Error, IMovie[]>({
    queryKey: ['bannerMovie'],
    queryFn: getBannerMovie,
    select: (data) => data.results.slice(0, 6)
  })
  const trendingMovie = useQuery<IGetMovie>({
    queryKey: ['trendingMovie'],
    queryFn: getTrending
  })
  const nowPlayMovie = useQuery<IGetMovie>({
    queryKey: ['nowPlayMovie'],
    queryFn: getNowPlayMovie
  })
  const topRatedMovie = useQuery<IGetMovie>({
    queryKey: ['topRatedMovie'],
    queryFn: getTopRated
  })
  const actionMovie = useQuery<IGetMovie>({
    queryKey: ['actionMovie'],
    queryFn: getActionMovie
  })
  const comedyMovie = useQuery<IGetMovie>({
    queryKey: ['comedyMovie'],
    queryFn: getComedyMovie
  })
  const romanceMovie = useQuery<IGetMovie>({
    queryKey: ['comedyMovie'],
    queryFn: getRomanceMovie
  })
  return [ bannerMovie, trendingMovie, nowPlayMovie, topRatedMovie, actionMovie, comedyMovie, romanceMovie ];
}
function Home (){
  const [
    {data: bannerMovieData, isLoading: bannerLoading},
    {data: trendingMovieData, isLoading: trendingMovieLoading},
    {data: nowPlayMovieData, isLoading: nowPlayMovieLoading},
    {data: topRatedMovieData, isLoading: topRatedMovieLoading},
    {data: actionMovieData, isLoading: actionMovieLoading},
    {data: comedyMovieData, isLoading: comedyMovieLoading},
    {data: romanceMovieData, isLoading: romanceMovieLoading},
  ] = useQueries();  
  
  return (
    <HomeWrap>
      {bannerLoading && nowPlayMovieLoading && trendingMovieLoading && topRatedMovieLoading && actionMovieLoading && comedyMovieLoading && romanceMovieLoading ? <Loader/> :
      <>
        <Banner bannerMovieData={bannerMovieData as IMovie[]}/>
        <Companies/>
        <RowMovie title='Trending Now' movieData={trendingMovieData as IGetMovie}/>
        <RowMovie title='Now Movies' movieData={nowPlayMovieData as IGetMovie}/>
        <RowMovie title='Top Rated' movieData={topRatedMovieData as IGetMovie}/>
        <RowMovie title='Action Movies' movieData={actionMovieData as IGetMovie}/>
        <RowMovie title='Comedy Movies' movieData={comedyMovieData as IGetMovie}/>
        <RowMovie title='Romance Movies' movieData={romanceMovieData as IGetMovie}/>
      </>
      }
    </HomeWrap>
  )
}

export default Home;