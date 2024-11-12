import styled from "styled-components";
import { SidebarStatusInterface } from "../interfaces/componentProps";

export const ContentComponentStyle = styled.div<SidebarStatusInterface>`
    display: grid;
    grid-template-columns: ${props => props.$sidebarOpened ? 'min(25.5%, 21.56rem) 1fr' : '0 1fr'};
    grid-template-rows: 7.5rem 1fr;
    height: ${props => props.$sidebarOpened ? 'auto' : '100%'};
    min-height: ${props => props.$sidebarOpened ? '100%' : '0'};
    transition: grid-template-columns 0.6s ease-in-out;`;

export const HeaderComponent = styled.header<SidebarStatusInterface>`
    grid-area: 1 / 1 / 3 / 2;
    background-color: white;
    box-shadow: 0.81rem 0.19rem 2.5rem rgb(0, 0, 0, .05);
    overflow-x: hidden;
    overflow-y: ${props => props.$sidebarOpened ? 'visible' : 'hidden'};
    position: relative;
    z-index: 5;
    transition: width 0.6s ease-in-out;
    `;

export const LogoComponent = styled.div`
    display: flex;
    gap: 1.94rem;
    padding: 2rem min(3.5rem, 12%);`;

export const HeadingComponent = styled.div`
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

export const LinkComponent = styled.div`
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

export const UserInfo = styled.div`
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

export const UserInfoImage = styled.div`
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

export const UserInfoSubtitle = styled.div`
    font-size: 0.75rem;
    line-height: 1.13rem;
    color: #b2b2b2;
    font-weight: 300;
    `;

export const UserInfoButton = styled.button`
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

export const HeaderClosing = styled.p`
    margin: 0 min(3.5rem, 12%);
    margin-top: 3.88rem;
    color: #212121;
    font-size: 1rem;
    line-height: 1.56rem;
    font-weight: 600;
    `;

export const HeaderCopyright = styled.p`
    margin: 0 min(3.5rem, 12%);
    margin-top: 0.31rem;
    color: #799283;
    font-size: 0.88rem;
    line-height: 1.31rem;
    font-weight: 300;
`;

export const SecondaryHeaderComponent = styled.header`
    background-color: #FFFFFF;
    box-shadow: 0rem 0.19rem 0.63rem rgb(0, 0, 0, .05);
    position: relative;
    z-index: 3;
    
    display: flex;
    align-items: center;
    padding: 0 2.56rem;
    `;

export const SecondaryHeaderTitle = styled.p`
    margin-left: 3.13rem;
    font-size: 1.75rem;
    line-height: 2.63rem;
    font-weight: 600;
    color: #262626;
    `;

export const SecondaryHeaderIcons = styled.div`
    display: flex;
    flex: 1 0 auto;
    justify-content: flex-end;
    gap: 3rem;`;

export const NotificationIcon = styled.div`
    position: relative;
    height: 1.5rem;
    width: 1.5rem;`;

export const NotificationBox = styled.p`
    display: none;
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

export const LayoutMainComponent = styled.main`
    grid-area: 2 / 2 / 3 / 3;
    padding: 3.13rem 3.13rem;
    `;