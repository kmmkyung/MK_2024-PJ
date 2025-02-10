import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Home from "./Home";
import Detail from "./Detail";
import Search from "./Search";
import Company from "./Company";
import ProtectedRoute from "./ProtectedRoute";

const Router = createBrowserRouter([
  {path:'/', element: (<ProtectedRoute><App/></ProtectedRoute>),
    children: [
      {path:'', element: <Home/>},
      {path:'/search', element: <Search/>},
      {path:'/detail/:programId', element: <Detail/>},
      {path:'/company/:companyId', element: <Company/>}
    ]
  },
  {path:'/login', element: <Login/>},
  {path:'/createAccount', element: <CreateAccount/>},
])

export default Router;