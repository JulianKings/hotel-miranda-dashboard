import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Login from "./pages/login";
import Index from "./pages";
import Logout from "./pages/logout";
import Bookings from "./pages/bookings";
import Contact from "./pages/contact";
import Rooms from "./pages/rooms";
import Users from "./pages/users";

const Router = () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Layout />,
        children: [
            {
                children: [
                    {index: true, element: <Index />},     
                    {
                        path: '/bookings',
                        element: <Bookings />
                    },
                    {
                        path: '/contact',
                        element: <Contact />
                    },
                    {
                        path: '/rooms',
                        element: <Rooms />
                    },
                    {
                        path: '/users',
                        element: <Users />
                    },
                ] 
            }
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: '/logout',
        element: <Logout />
    },
    
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;