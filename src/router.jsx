import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Login from "./pages/login";
import Index from "./pages";
import Logout from "./pages/logout";
import Bookings from "./pages/bookings";
import Contact from "./pages/contact";
import Rooms from "./pages/rooms";
import Users from "./pages/users";
import RoomDetails from "./pages/roomDetails";
import BookingDetails from "./pages/bookingDetails";

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
                        path: '/bookings/add',
                        element: <Bookings />
                    },
                    {
                        path: '/bookings/:id',
                        element: <BookingDetails />
                    },
                    {
                        path: '/bookings/:id/edit',
                        element: <Bookings />
                    },
                    {
                        path: '/bookings/:id/delete',
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
                        path: '/rooms/add',
                        element: <Rooms />
                    },
                    {
                        path: '/rooms/:id',
                        element: <RoomDetails />
                    },
                    {
                        path: '/rooms/:id/update',
                        element: <Rooms />
                    },
                    {
                        path: '/rooms/:id/delete',
                        element: <Rooms />
                    },
                    {
                        path: '/users',
                        element: <Users />
                    },
                    {
                        path: '/users/add',
                        element: <Users />
                    },
                    {
                        path: '/users/:id/update',
                        element: <Users />
                    },
                    {
                        path: '/users/:id/delete',
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