import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Home from "./Home";

const Router = createBrowserRouter([
  {path:'/', element: <App/>,
    children: [
      {path:'', element: <Home/>}
    ]
  },
  {path:'/login', element: <Login/>},
  {path:'/createAccount', element: <CreateAccount/>},
])

export default Router;