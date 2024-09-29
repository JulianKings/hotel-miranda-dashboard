/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import NestedViewMore from "./NestedViewMore";
import { fetchContacts, selectContacts, selectFetchContactStatus } from "../redux/slices/contact";
import { MainComponent } from "../styledcomponents/main";
import { CircularProgress } from "@mui/material";
import { useApiDispatch, useApiSelector } from "../redux/store";
import { NullableApiContactInterface } from "../interfaces/apiManagement";
import { SidebarStatusPropTypes } from "../interfaces/componentProps";
import { GuestCommentsBox, GuestPrev, GuestNext, GuestCommentList, GuestCommentItem } from "./GuestCommentsStyle";

export default function GuestComments({$sidebarStatus}: SidebarStatusPropTypes )
{
    const contactList: NullableApiContactInterface[] = useApiSelector(selectContacts);
    const fetchStatus: (string | null) = useApiSelector(selectFetchContactStatus);
	const dispatch = useApiDispatch();

	useEffect(() => {
		if(!fetchStatus)
		{
			dispatch(fetchContacts());
		}
	}, []);

    const [page, updatePage] = useState<number>(0);

    const totalPages: number = Math.round(contactList.length / 3);

    return ((fetchStatus !== 'fulfilled') ? <MainComponent><CircularProgress /></MainComponent> :
    <Fragment>
        <GuestCommentsBox $sidebarStatus={$sidebarStatus}>
            {(page !== 0) ? <GuestPrev onClick={() => {
                const prevPage: number = page - 1;
                if(prevPage >= 0)
                {
                    updatePage(prevPage);                    
                }
            }}><FaArrowLeft size={24} /></GuestPrev> : ''}
            {(totalPages !== page) ? <GuestNext onClick={() => {
                const nextPage: number = page + 1;
                if(nextPage <= totalPages)
                {
                    updatePage(nextPage);                    
                }
            }}><FaArrowRight size={24} /></GuestNext> : ''}
            Recent contact from Customers

            <GuestCommentList>
                {[...contactList].sort((a, b) => (a && b) ? (new Date(b.date).getTime()) - (new Date(a.date).getTime()) : -2).slice((page*3), ((page+1)*3))
                .map((contact: NullableApiContactInterface) => {
                    if(contact)
                    {
                        let subject: string = (contact.subject.length > 35) ? (contact.subject.slice(0, 35) + '...') : contact.subject;
                        let comment: string = (contact.comment.length > 135) ? (contact.comment.slice(0, 135) + '...') : contact.comment;
                        
                        return <Fragment key={contact._id}>
                            <GuestCommentItem>
                                <p className="subject">{subject}</p>
                                <div className="content">
                                    {comment} 
                                    {(contact.comment.length > 135) ? 
                                    <Fragment>
                                        <NestedViewMore content={contact.comment} />
                                    </Fragment> : ''}
                                </div>
                                <p className="customer_name">{contact.customer_name}</p>
                                <p className="customer_mail">{contact.customer_mail}</p>
                                <p className="customer_phone"><FaPhoneAlt size={12} /> {contact.customer_phone}</p>
                            </GuestCommentItem>
                        </Fragment>
                    } else {
                        return <Fragment></Fragment>;
                    }
                })}
            </GuestCommentList>
        </GuestCommentsBox>
    </Fragment>);
}