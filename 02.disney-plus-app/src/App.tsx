import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import useScrollToTop from "./hooks/useScrollTop";
import { auth } from "./firebase";
import { useEffect } from "react";

function App() {
  async function init(){
    await auth.authStateReady();  
  }
  useEffect(()=>{
    init();
  },[])

  useScrollToTop();

  return (
    <>
      <Header />
      <Outlet></Outlet>
      <Footer/>
    </>
  );
}

export default App;
