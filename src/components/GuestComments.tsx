/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { Fragment, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import PropTypes from 'prop-types';
import NestedViewMore from "./NestedViewMore";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, selectContacts, selectFetchContactStatus } from "../redux/slices/contact";
import { MainComponent } from "../styledcomponents/main";
import { CircularProgress } from "@mui/material";

interface PropTypes {
    sidebarStatus: boolean | null
}

const GuestCommentsBox = styled.div<PropTypes>`
	background-color: #FFFFFF;
	border-radius: 1.25rem;
	padding: 1.88rem 1.88rem;
	width: 100%;
	font-weight: 600;
    font-size: 1.2rem;
	box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.02);
    position: relative;
    max-width: ${props => props.sidebarStatus ? '64vw' : '100%'};
    margin: 0 auto;
`;

const GuestCommentList = styled.div`
    display: flex;
    width: 100%;
    gap: 4.5%;
    margin-top: 1.25rem;
    `;

const GuestCommentItem = styled.div`
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

const GuestPrev = styled.div`
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

const GuestNext = styled.div`
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

export default function GuestComments({sidebarStatus}: PropTypes )
{
    const contactList = useSelector(selectContacts);
    const fetchStatus = useSelector(selectFetchContactStatus);
	const dispatch = useDispatch();

	useEffect(() => {
		if(!fetchStatus)
		{
			dispatch(fetchContacts());
		}
	}, []);

    const [page, updatePage] = useState(0);

    const totalPages = Math.round(contactList.length / 3);

    return ((fetchStatus !== 'fulfilled') ? <MainComponent><CircularProgress /></MainComponent> :
    <Fragment>
        <GuestCommentsBox sidebarStatus={sidebarStatus}>
            {(page !== 0) ? <GuestPrev onClick={() => {
                const prevPage = page - 1;
                if(prevPage >= 0)
                {
                    updatePage(prevPage);                    
                }
            }}><FaArrowLeft size={24} /></GuestPrev> : ''}
            {(totalPages !== page) ? <GuestNext onClick={() => {
                const nextPage = page + 1;
                if(nextPage <= totalPages)
                {
                    updatePage(nextPage);                    
                }
            }}><FaArrowRight size={24} /></GuestNext> : ''}
            Recent contact from Customers

            <GuestCommentList>
                {[...contactList].sort((a, b) => (new Date(b.date).getTime()) - (new Date(a.date).getTime())).slice((page*3), ((page+1)*3)).map((contact) => {
                    let subject = (contact.subject.length > 35) ? (contact.subject.slice(0, 35) + '...') : contact.subject;
                    let comment = (contact.comment.length > 135) ? (contact.comment.slice(0, 135) + '...') : contact.comment;
                    
                    return <Fragment key={contact.id}>
                        <GuestCommentItem>
                            <p className="subject">{subject}</p>
                            <p className="content">{comment} {(contact.comment.length > 135) ? <Fragment>
                                <NestedViewMore content={contact.comment} />
                            </Fragment> : ''}</p>
                            <p className="customer_name">{contact.customer_name}</p>
                            <p className="customer_mail">{contact.customer_mail}</p>
                            <p className="customer_phone"><FaPhoneAlt size={12} /> {contact.customer_phone}</p>
                        </GuestCommentItem>
                    </Fragment>
                })}
            </GuestCommentList>
        </GuestCommentsBox>
    </Fragment>);
}

GuestComments.propTypes = {
    sidebarStatus: PropTypes.bool,
}