import { NavLink, Outlet } from 'react-router-dom';
import './style/style.css';

function Layout()
{

  return (
    <>
      <h1>Hotel Miranda</h1>

        <NavLink to='/'>Home</NavLink> | <NavLink to='/bookings'>Bookings</NavLink> | <NavLink to='/contact'>Contact</NavLink> | <NavLink to='/rooms'>Rooms</NavLink> | <NavLink to='/users'>Users</NavLink> |  

      <Outlet></Outlet>
    </>
  )
}

export default Layout