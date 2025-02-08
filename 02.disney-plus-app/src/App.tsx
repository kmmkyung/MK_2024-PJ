import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import useScrollToTop from "./hooks/useScrollTop";

function App() {

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
