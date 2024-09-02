/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useContext, useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaBell, FaKey, FaUsers } from "react-icons/fa";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { LuCalendarCheck2, LuMail } from "react-icons/lu";
import { MdContactSupport, MdSpaceDashboard } from "react-icons/md";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoAsset from '../assets/logo.png';
import { SessionContext } from "../logic/sessionManagement";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, selectCurrentUser, selectFetchUserStatus } from "../redux/slices/user";
import { SmallerMainComponent } from "../styledcomponents/main";
import { CircularProgress } from "@mui/material";
import { NullableApiUserInterface } from "../interfaces/apiManagement";

interface SidebarStatusInterface {
    sidebarOpened: boolean | null
}

const ContentComponentStyle = styled.div<SidebarStatusInterface>`
    display: grid;
    grid-template-columns: ${props => props.sidebarOpened ? 'min(25.5%, 21.56rem) 1fr' : '0 1fr'};
    grid-template-rows: 7.5rem 1fr;
    height: ${props => props.sidebarOpened ? 'auto' : '100%'};
    min-height: ${props => props.sidebarOpened ? '100%' : '0'};
    transition: grid-template-columns 0.6s ease-in-out;`;

const HeaderComponent = styled.header<SidebarStatusInterface>`
    grid-area: 1 / 1 / 3 / 2;
    background-color: white;
    box-shadow: 0.81rem 0.19rem 2.5rem rgb(0, 0, 0, .05);
    overflow-x: hidden;
    overflow-y: ${props => props.sidebarOpened ? 'visible' : 'hidden'};
    position: relative;
    z-index: 5;
    transition: width 0.6s ease-in-out;
    `;

const LogoComponent = styled.div`
    display: flex;
    gap: 1.94rem;
    padding: 2rem min(3.5rem, 12%);`;

const HeadingComponent = styled.div`
    display: flex;
    flex-direction: column;
    
    img {
        width: 3.78rem;
        height: 1.3rem;
    }
        
    p {
        color: #5D5449;
        font-size: 0.75rem;
        line-height: 1.13rem;
        font-weight: 300;
    }`;

const LinkComponent = styled.div`
    display:flex;
    flex-direction: column;
    margin-top: 1.88rem;
    gap: 0.94rem;

    a {
        text-decoration: none;
        color: #799283;
        min-height: 4.19rem;
        display: flex;
        align-items: center;
        padding-left: 3.5rem;
        gap: 1.61rem;   
        position: relative; 

        &:hover {
            color: #E23428;
        }

        &.active {
            color: #E23428;
        }
    }

    a::after {
        content: "";
        height: 90%;
        background: #E23428;
        width: 0.75rem;
        position: absolute;
        top: 5%;
        left: -0.25rem;
        border-radius: 1.5rem;
        transition: all .35s;
        opacity: 0;
    }

    a:hover::after {
        opacity:1;
    }

    a.active::after {
        opacity:1;
    }
    `;

const UserInfo = styled.div`
    margin: 0 min(3.5rem, 12%);
    margin-top: 4.56rem;
    box-shadow: 0 1.25rem 1.88rem rgb(0, 0, 0, .14);
    border-radius: 1.13rem;
    padding: 1.5rem 2.5rem;
    padding-top: 3.31rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.56rem;
    position: relative;

    p {
        font-size: 1rem;
        line-height: 1.56rem;
        color: #393939;
        text-align: center;
    }
`;

const UserInfoImage = styled.div`
    position: absolute;
    top: -2.19rem; right: 50%;    
    transform: translate(50%,0);
    height: 4.38rem;
    width: 4.38rem;
    border-radius: 0.5rem;

    img {
        height: 4.38rem;
        width: 4.38rem; 
        border-radius: 0.5rem;
    }

`;

const UserInfoSubtitle = styled.div`
    font-size: 0.75rem;
    line-height: 1.13rem;
    color: #b2b2b2;
    font-weight: 300;
    `;

const UserInfoButton = styled.button`
    margin-top: 0.44rem;
    border: 0rem solid;
    background-color: #EBF1EF;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 2.94rem;
    border-radius: 0.5rem;
    width: 100%;

    font-size: 0.88rem;
    line-height: 1.31rem;
    font-weight: 600;
    color: #135846;
`;

const HeaderClosing = styled.p`
    margin: 0 min(3.5rem, 12%);
    margin-top: 3.88rem;
    color: #212121;
    font-size: 1rem;
    line-height: 1.56rem;
    font-weight: 600;
    `;

const HeaderCopyright = styled.p`
    margin: 0 min(3.5rem, 12%);
    margin-top: 0.31rem;
    color: #799283;
    font-size: 0.88rem;
    line-height: 1.31rem;
    font-weight: 300;
`;

const SecondaryHeaderComponent = styled.header`
    background-color: #FFFFFF;
    box-shadow: 0rem 0.19rem 0.63rem rgb(0, 0, 0, .05);
    position: relative;
    z-index: 3;
    
    display: flex;
    align-items: center;
    padding: 0 2.56rem;
    `;

const SecondaryHeaderTitle = styled.p`
    margin-left: 3.13rem;
    font-size: 1.75rem;
    line-height: 2.63rem;
    font-weight: 600;
    color: #262626;
    `;

const SecondaryHeaderIcons = styled.div`
    display: flex;
    flex: 1 0 auto;
    justify-content: flex-end;
    gap: 3rem;`;

const NotificationIcon = styled.div`
    position: relative;
    height: 1.5rem;
    width: 1.5rem;`;

const NotificationBox = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.88rem;
    height: 1.88rem;
    max-width: 1.88rem;
    max-height: 1.88rem;
    overflow: hidden;
    position: absolute;
    top: -1.04rem;
    right: -1.04rem;
    background-color: #E23428;
    border-radius: 0.5rem;

    font-size: 0.88rem;
    line-height: 1.31rem;
    font-weight: 600;
    color: #fff;

`;

const LayoutMainComponent = styled.main`
    grid-area: 2 / 2 / 3 / 3;
    padding: 3.13rem 3.13rem;
    `;

export default function ContentComponent()
{
    const [sidebar, setSidebar] = useState<boolean | null>(true);
    const {userObject} = useContext(SessionContext);
    const navigate = useNavigate();     
    
    let dataObject = useSelector(selectCurrentUser);
    const fetchStatus = useSelector(selectFetchUserStatus);
	const dispatch = useDispatch();
    const [userData, updateUserData] = useState<NullableApiUserInterface>(null);

    useEffect(() => {
        if(userObject)
        {
            dispatch(fetchUserById(userObject.id));
        }
    }, [])

    useEffect(() => {
        if(userObject)
        {
            if(dataObject && dataObject.id === (userObject.id)?.toString())
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
                {(fetchStatus === 'fulfilled' && userData !== null) ? 
                <Fragment>
                    <UserInfo>
                        <UserInfoImage>
                            <img src={userData.profile_picture} alt='Profile Picture' />
                        </UserInfoImage>
                        <p data-cy='userfullname'>{userData.full_name}</p>
                        <UserInfoSubtitle>{userData.mail}</UserInfoSubtitle>
                        <UserInfoButton onClick={() => {
                            navigate('/user/' + userData.id + '/update');
                        }}>Edit</UserInfoButton>
                    </UserInfo>
                </Fragment> : <SmallerMainComponent><CircularProgress /></SmallerMainComponent>}
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