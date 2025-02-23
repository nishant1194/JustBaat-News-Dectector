import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Page1 from './pages/page1/Page1'
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page1 />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
 
]);

function App() {
  return (
  
    <RouterProvider router={router}> </RouterProvider>
 
  );
}

export default App;
