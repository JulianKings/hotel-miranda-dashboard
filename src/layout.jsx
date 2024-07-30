import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './style/style.css';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import * as jwt from 'jose';

function Layout()
{
    const navigate = useNavigate();

    const [ssoToken] = useLocalStorage('sso_token');

    useEffect(() => {
        if(!ssoToken)
        {
            navigate('/login');
        } else {
            console.log(ssoToken);
        }
    }, ssoToken);


    return (
        <>
        <h1>Hotel Miranda</h1>

            <NavLink to='/'>Home</NavLink> | <NavLink to='/bookings'>Bookings</NavLink> | <NavLink to='/contact'>Contact</NavLink> | <NavLink to='/rooms'>Rooms</NavLink> | <NavLink to='/users'>Users</NavLink> |  

        <Outlet></Outlet>
        </>
    )
}

export default Layout