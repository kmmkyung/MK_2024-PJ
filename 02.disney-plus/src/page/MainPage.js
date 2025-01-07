import React from "react";
import '../css/App.css';
import styled from'styled-components';
import requests from '../api/request';


import Banner from '../components/Banner';
import Category from '../components/Category';
import Row from '../components/Row';

function MainPage(){
  return(
    <Container>
    <Banner></Banner>
    <Category></Category>
    <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}></Row>
    <Row title="Top Rated" id="TR" mediaType='movie' fetchUrl={requests.fetchTopRated}></Row>
    <Row title="Now Movies" id="TM" mediaType='movie' fetchUrl={requests.fetchNowPlaying}></Row>
    <Row title="Action Movies" id="AM" mediaType='movie' fetchUrl={requests.fetchActionMovies}></Row>
    <Row title="Comedy Movies" id="CM" mediaType='movie' fetchUrl={requests.fetchComedyMovies}></Row>
  </Container>
  )
}

export default MainPage;

const Container = styled.main`
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  padding: 70px calc(3.5vw + 5px);
  background: url("/images/home-background.png") center center / cover no-repeat fixed;
  }
`;