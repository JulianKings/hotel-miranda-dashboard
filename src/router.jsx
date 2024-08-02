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
import UserForm from "./pages/userForm";
import DeleteForm from "./pages/deleteForm";
import RoomForm from "./pages/roomForm";

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
                        path: '/booking/:id',
                        element: <BookingDetails />
                    },
                    {
                        path: '/booking/:id?/update',
                        element: <Bookings />
                    },
                    {
                        path: '/booking/:id?/delete',
                        element: <DeleteForm />
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
                        path: '/room/add',
                        element: <RoomForm />
                    },
                    {
                        path: '/room/:id',
                        element: <RoomDetails />
                    },
                    {
                        path: '/room/:id?/update',
                        element: <RoomForm editMode={true} />
                    },
                    {
                        path: '/room/:id?/delete',
                        element: <DeleteForm />
                    },
                    {
                        path: '/users',
                        element: <Users />
                    },
                    {
                        path: '/user/add',
                        element: <UserForm />
                    },
                    {
                        path: '/user/:id?/update',
                        element: <UserForm editMode={true} />
                    },
                    {
                        path: '/user/:id?/delete',
                        element: <DeleteForm />
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