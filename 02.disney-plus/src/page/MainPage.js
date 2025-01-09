import React from "react";
import '../css/App.css';
import styled from'styled-components';
import requests from '../api/request';


import Banner from '../components/Banner';
import Category from '../components/Category';
import Row from '../components/Row';

function MainPage(){
  return(
  <Main>
    <Banner></Banner>
    <Container>
      <Category></Category>
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}></Row>
      <Row title="Top Rated" id="TR" mediaType='movie' fetchUrl={requests.fetchTopRated}></Row>
      <Row title="Now Movies" id="TM" mediaType='movie' fetchUrl={requests.fetchNowPlaying}></Row>
      <Row title="Action Movies" id="AM" mediaType='movie' fetchUrl={requests.fetchActionMovies}></Row>
      <Row title="Comedy Movies" id="CM" mediaType='movie' fetchUrl={requests.fetchComedyMovies}></Row>
    </Container>
  </Main>
  )
}

export default MainPage;

const Main = styled.main`
  padding: 100px 0;
  background: url("/images/home-background.png") center center / cover no-repeat fixed;
`
  const Container = styled.main`
  padding: 0 calc(3.5vw + 5px);
  }
`;