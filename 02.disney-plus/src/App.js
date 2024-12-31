import React from 'react';
import { Routes, Route, Outlet } from'react-router-dom';

import Nav from './components/Nav';
import LoginPage from './page/LoginPage';
import MainPage from './page/MainPage';
import DetailPage from './page/DetailPage';
import SearchPage from './page/SearchPage';

function Layout(){
  return (
    <div>
      <Nav></Nav>
      <Outlet/>
    </div>
  )
}

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<LoginPage/>}/>
          <Route path='main' element={<MainPage/>}/>
          <Route path=':movieId' element={<DetailPage/>}/>
          <Route path='search' element={<SearchPage/>}/>
        </Route>
      </Routes>  
    </div>
  );
}

export default App;

