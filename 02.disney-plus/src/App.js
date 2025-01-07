import React, { useState } from 'react'
import { Routes, Route, Outlet } from'react-router-dom';

import { LoadingProvider } from './context/LoadingContext';
import LoadingSpinner from './components/LoadingSpinner'; 

import UseScrollToTop from './hooks/useScrollTop';

import Nav from './components/Nav';
import LoginPage from './page/LoginPage';
import MainPage from './page/MainPage';
import DetailPage from './page/DetailPage';
import SearchPage from './page/SearchPage';
import Footer from './components/Footer';
import CompanyPage from './page/CompanyPage';

function Layout(){
  let [ searchResults, setSearchResults ] = useState([]);
  const [ isSearchActive, setIsSearchActive ] = useState(false);

  return (
    <>
      <Nav searchResults = {searchResults} isSearchActive={isSearchActive} setIsSearchActive={setIsSearchActive}></Nav>
      <Outlet context = {{searchResults, setSearchResults, setIsSearchActive}}/>
      <Footer></Footer>
    </>
  )
}

function App() {
  return (
    <div className='App'>
      <LoadingProvider>
        <LoadingSpinner/>
        <UseScrollToTop/>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<LoginPage/>}/>
            <Route path='main' element={<MainPage/>}/>
            <Route path='/detail/:programId' element={<DetailPage/>}/>
            <Route path='search' element={<SearchPage/>}/>
            <Route path='company/:companyName' element={<CompanyPage/>}/>
          </Route>
        </Routes>  
      </LoadingProvider>
    </div>
  );
}

export default App;

