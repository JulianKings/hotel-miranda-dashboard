/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './style/style.css';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import * as jwt from 'jose';
import { CircularProgress } from '@mui/material';
import { MainComponent } from './styledcomponents/main';
import { PiBuildingApartmentFill } from 'react-icons/pi';
import styled from 'styled-components';
import LogoAsset from './assets/logo.png';
import { MdContactSupport, MdSpaceDashboard } from 'react-icons/md';
import { FaKey, FaUsers } from 'react-icons/fa';
import { LuCalendarCheck2 } from 'react-icons/lu';

const ContentComponent = styled.div`
    display: grid;
    grid-template-columns: min(25.5%, 21.56rem) 1fr;
    height: 100%;`;

const HeaderComponent = styled.header`
    grid-area: 1 / 1 / 2 / 2;
    background-color: white;
    box-shadow: 0.81rem 0.19rem 2.5rem rgb(0, 0, 0, .05);
    `;

const LayoutMainComponent = styled.main`
    grid-area: 1 / 2 / 2 / 3;
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

function Layout()
{
    const navigate = useNavigate();

    const [ssoToken] = useLocalStorage('sso_token');
    const [userObject, updateUserObject] = useState(null);

    useEffect(() => { 
        async function fetch() {
            if(!ssoToken)
                {
                    navigate('/login');
                } else {
                    try {
                        const secret = jwt.base64url.decode('28CIzmTGN8u8wHIu3kOT+Mdmq47BcF32lS7oyMlJZRM=')
                        const { payload } = await jwt.jwtDecrypt(ssoToken, secret);
                        updateUserObject(payload);
                    } catch {
                        // token has probably expired
                        localStorage.removeItem('sso_token');
                        navigate('/login');
                    }
                }
        }

        fetch();        
    }, ssoToken);


    return ((userObject) ? 
            <ContentComponent>
            <HeaderComponent>
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
            </HeaderComponent>

            <LayoutMainComponent>
                <Outlet></Outlet>
            </LayoutMainComponent>
            </ContentComponent>
        :
        <MainComponent><CircularProgress /></MainComponent>
    )
}

export default Layout