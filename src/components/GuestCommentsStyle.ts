import styled from "styled-components";
import { SidebarStatusPropTypes } from "../interfaces/componentProps";

export const GuestCommentsBox = styled.div<SidebarStatusPropTypes>`
	background-color: #FFFFFF;
	border-radius: 1.25rem;
	padding: 1.88rem 1.88rem;
	width: 100%;
	font-weight: 600;
    font-size: 1.2rem;
	box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.02);
    position: relative;
    max-width: ${props => props.$sidebarStatus ? '64vw' : '100%'};
    margin: 0 auto;
`;

export const GuestCommentList = styled.div`
    display: flex;
    width: 100%;
    gap: 4.5%;
    margin-top: 1.25rem;
    `;

export const GuestCommentItem = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    border: 0.06rem solid #EBEBEB;
    border-radius: 1.25rem;
    padding: 1.88rem 1.88rem;
    overflow: hidden;

    transition: box-shadow 0.6s ease-in-out;

    &:hover {
        box-shadow: 0rem 1rem 1.88rem rgba(0, 0, 0, 0.078);
    }

    p {
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 400;
        font-size: 1rem;
    }

    p.subject {
        font-weight: 600;
        max-width: 90%;
        font-size: 1.1rem;
    }

    span.content_more {
        color: #135846;
		font-weight: 600;
		font-size: 1rem;
		line-height: 1.56rem;
        cursor: pointer;
    }

    p.customer_name {
        font-weight: 600;
    }

    p.customer_mail, p.customer_phone {
        color: #799283;
        font-size: 0.88rem;
        font-weight: 300;
        line-height: 1.31rem;        
    }
`;

export const GuestPrev = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    background-color: #135846;
    top: calc(50% - 1.75rem);
    left: -2.25rem;
    position: absolute;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.75rem;
    z-index: 10;
`;

export const GuestNext = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    background-color: #135846;
    top: calc(50% - 1.75rem);
    right: -2.25rem;
    position: absolute;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.75rem;
    z-index: 10;
`;