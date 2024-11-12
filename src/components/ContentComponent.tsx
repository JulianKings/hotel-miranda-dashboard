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
import { ApiAmenitiesInterface, ApiUserInterface, NullableApiUserInterface } from "../interfaces/apiManagement";
import { useApiDispatch, useApiSelector } from "../redux/store";
import { useLocalStorage } from "@uidotdev/usehooks";
import { LocalStorageLoginInformation, SessionActionTypes } from "../interfaces/sessionManagement";
import { UserInfo, UserInfoImage, UserInfoSubtitle, UserInfoButton, ContentComponentStyle, HeaderComponent, LogoComponent, HeadingComponent, LinkComponent, HeaderClosing, HeaderCopyright, SecondaryHeaderComponent, SecondaryHeaderTitle, SecondaryHeaderIcons, NotificationIcon, NotificationBox, LayoutMainComponent } from "./ContentComponentStyle";
import { fetchAmenities, selectAmenities, selectFetchAmenityStatus } from "../redux/slices/amenities";
import { ToastContainer } from "react-toastify";

export default function ContentComponent()
{
    const [sidebar, setSidebar] = useState<boolean | null>(true);
    const {userObject, dispatch} = useContext(SessionContext);
    const navigate = useNavigate(); 
    
    // user information
    let dataObject: NullableApiUserInterface = useApiSelector(selectCurrentUser);
    const fetchStatus: (string | null) = useApiSelector(selectFetchUserStatus);
	const dispatcher = useApiDispatch();
    const [userData, updateUserData] = useState<NullableApiUserInterface>(null);

    // amenities information
    const amenities: ApiAmenitiesInterface[] = useApiSelector(selectAmenities);
    const fetchAmenitiesStatus: (string | null) = useApiSelector(selectFetchAmenityStatus);

    useEffect(() => {
        if(amenities === null || amenities.length === 0 || fetchAmenitiesStatus !== 'fulfilled')
        {
            dispatcher(fetchAmenities());
        }
    }, []);

    useEffect(() => {
        if(userObject && userObject.userObj)
        { 
            dispatcher(fetchUserById(userObject.userObj._id));
        }
    }, [userObject]);

    useEffect(() => {
        if(userObject && userObject.userObj)
        {
            if(dataObject && dataObject._id === (userObject.userObj._id)?.toString())
            {
                updateUserData(dataObject);
            }
        }
    }, [dataObject])

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

    if(fetchStatus === 'fulfilled' && userData)
    {
        userComponent = <Fragment>
            <UserInfo>
                <UserInfoImage>
                    <img src={userData.profile_picture} alt='Profile Picture' />
                </UserInfoImage>
                <p data-cy='userfullname'>{userData.full_name}</p>
                <UserInfoSubtitle>{userData.mail}</UserInfoSubtitle>
                <UserInfoButton onClick={() => {
                    navigate('/user/' + userData._id + '/update');
                }}>Edit</UserInfoButton>
            </UserInfo>
        </Fragment>;
    }

    return <>
        <ContentComponentStyle $sidebarOpened={sidebar}>
        <HeaderComponent $sidebarOpened={sidebar}>
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

        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </>;
}