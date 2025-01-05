import React from 'react';
import { Routes, Route, Outlet } from'react-router-dom';

import { LoadingProvider } from './context/LoadingContext';
import LoadingSpinner from './components/LoadingSpinner'; 

import Nav from './components/Nav';
import LoginPage from './page/LoginPage';
import MainPage from './page/MainPage';
import DetailPage from './page/DetailPage';
import SearchPage from './page/SearchPage';
import Footer from './components/Footer';

function Layout(){
  return (
    <>
      <Nav></Nav>
      <Outlet/>
      <Footer></Footer>
    </>
  )
}

function App() {
  return (
    <div className='App'>
      <LoadingProvider>
        <LoadingSpinner />
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<LoginPage/>}/>
            <Route path='main' element={<MainPage/>}/>
            <Route path=':programId' element={<DetailPage/>}/>
            <Route path='search' element={<SearchPage/>}/>
          </Route>
        </Routes>  
      </LoadingProvider>
    </div>
  );
}

export default App;

