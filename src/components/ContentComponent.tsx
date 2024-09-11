/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useContext, useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaBell, FaKey, FaUsers } from "react-icons/fa";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { LuCalendarCheck2, LuMail } from "react-icons/lu";
import { MdContactSupport, MdSpaceDashboard } from "react-icons/md";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import LogoAsset from '../assets/logo.png';
import { SessionContext } from "../logic/sessionManagement";
import { fetchUserById, selectCurrentUser, selectFetchUserStatus } from "../redux/slices/user";
import { SmallerMainComponent } from "../styledcomponents/main";
import { CircularProgress } from "@mui/material";
import { ApiUserInterface, NullableApiUserInterface } from "../interfaces/apiManagement";
import { useApiDispatch, useApiSelector } from "../redux/store";
import { useLocalStorage } from "@uidotdev/usehooks";
import { LocalStorageLoginInformation, SessionActionTypes } from "../interfaces/sessionManagement";
import { UserInfo, UserInfoImage, UserInfoSubtitle, UserInfoButton, ContentComponentStyle, HeaderComponent, LogoComponent, HeadingComponent, LinkComponent, HeaderClosing, HeaderCopyright, SecondaryHeaderComponent, SecondaryHeaderTitle, SecondaryHeaderIcons, NotificationIcon, NotificationBox, LayoutMainComponent } from "./ContentComponentStyle";

export default function ContentComponent()
{
    const [sidebar, setSidebar] = useState<boolean | null>(true);
    const {userObject, dispatch} = useContext(SessionContext);
    const navigate = useNavigate();   
    
    let [dataObject, updateDataObject] = useState<Partial<ApiUserInterface> | null>(null);    
    useEffect(() => {
        if(userObject)
        { 
            updateDataObject(userObject.userObj);
        }
    }, [userObject]);

    let currentLocation = 'Dashboard';
    if(window.location.pathname.includes('bookings'))
    {
        currentLocation = 'Bookings';
    } else if(window.location.pathname.includes('rooms'))
    {
        currentLocation = 'Rooms';
    } else if(window.location.pathname.includes('contact'))
    {
        currentLocation = 'Contact';
    } else if(window.location.pathname.includes('users'))
    {
        currentLocation = 'Users';
    }

    let userComponent = <SmallerMainComponent><CircularProgress /></SmallerMainComponent>;

    if(dataObject)
    {
        console.log(dataObject);
        userComponent = <Fragment>
            <UserInfo>
                <UserInfoImage>
                    <img src={dataObject.profile_picture} alt='Profile Picture' />
                </UserInfoImage>
                <p data-cy='userfullname'>{dataObject.full_name}</p>
                <UserInfoSubtitle>{dataObject.mail}</UserInfoSubtitle>
                <UserInfoButton onClick={() => {
                    navigate('/user/' + dataObject.id + '/update');
                }}>Edit</UserInfoButton>
            </UserInfo>
        </Fragment>;
    }

    return <>
        <ContentComponentStyle sidebarOpened={sidebar}>
        <HeaderComponent sidebarOpened={sidebar}>
                <LogoComponent>
                    <PiBuildingApartmentFill color='#123846' size={36} />
                    <HeadingComponent>
                        <img src={LogoAsset} alt='Hotel Miranda' />
                        <p>Hotel Admin Dashboard</p>
                    </HeadingComponent>
                </LogoComponent>
                <LinkComponent>
                    <NavLink to='/'> <MdSpaceDashboard size={24} /> Dashboard</NavLink>
                    <NavLink to='/bookings'><LuCalendarCheck2 size={24} /> Bookings</NavLink>
                    <NavLink to='/rooms'><FaKey size={24} /> Rooms</NavLink>
                    <NavLink to='/contact'><MdContactSupport size={24} /> Contact</NavLink>
                    <NavLink to='/users'><FaUsers size={24} /> Users</NavLink>
                </LinkComponent>
                {userComponent}
                <HeaderClosing>Hotel Miranda Admin Dashboard</HeaderClosing>
                <HeaderCopyright>© 2024 All Rights Reserved</HeaderCopyright>
            </HeaderComponent>

            <SecondaryHeaderComponent>
                {(sidebar) ? <IoMdArrowDropleftCircle  size={42} onClick={() => { setSidebar(!sidebar); }} /> : <IoMdArrowDroprightCircle size={42} onClick={() => { setSidebar(!sidebar); }} />}
                <SecondaryHeaderTitle>{currentLocation}</SecondaryHeaderTitle>
                <SecondaryHeaderIcons>
                    <NotificationIcon>
                        <LuMail size={26} />
                        <NotificationBox>8</NotificationBox>
                    </NotificationIcon>
                    <NotificationIcon>
                        <FaBell size={26} />
                        <NotificationBox>60</NotificationBox>
                    </NotificationIcon>
                    <CiLogout size={26} onClick={() => { navigate('/logout'); }} />
                </SecondaryHeaderIcons>
            </SecondaryHeaderComponent>

            <LayoutMainComponent>
                <Outlet context={[sidebar]}></Outlet>
            </LayoutMainComponent>
        </ContentComponentStyle>
    </>;
}