import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Login from "./pages/login";
import Index from "./pages";
import Logout from "./pages/logout";
import Bookings from "./pages/bookings";
import Contact from "./pages/contact";
import Rooms from "./pages/rooms";
import Users from "./pages/users";
import BookingDetails from "./pages/bookingDetails";
import UserForm from "./pages/userForm";
import DeleteForm from "./pages/deleteForm";
import RoomForm from "./pages/roomForm";
import BookingForm from "./pages/bookingForm";

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
                        path: '/booking/add',
                        element: <BookingForm editMode={false} />
                    },
                    {
                        path: '/booking/:id',
                        element: <BookingDetails />
                    },
                    {
                        path: '/booking/:id?/update',
                        element: <BookingForm editMode={true} />
                    },
                    {
                        path: '/booking/:id?/delete',
                        element: <DeleteForm deleteType='booking' />
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
                        element: <RoomForm editMode={false} />
                    },
                    {
                        path: '/room/:id?/update',
                        element: <RoomForm editMode={true} />
                    },
                    {
                        path: '/room/:id?/delete',
                        element: <DeleteForm deleteType='room' />
                    },
                    {
                        path: '/users',
                        element: <Users />
                    },
                    {
                        path: '/user/add',
                        element: <UserForm editMode={false} />
                    },
                    {
                        path: '/user/:id?/update',
                        element: <UserForm editMode={true} />
                    },
                    {
                        path: '/user/:id?/delete',
                        element: <DeleteForm deleteType='user' />
                    },
                    {
                        path: '/logout',
                        element: <Logout />
                    },
                ] 
            }
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;