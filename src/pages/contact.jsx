/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components';
import { BasicTable, ButtonContainer, MainComponent } from '../styledcomponents/main';
import GuestComments from '../components/GuestComments';
import { useOutletContext } from 'react-router-dom';
import NestedViewMore from '../components/NestedViewMore';
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp, FaPhoneAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, putContact, selectContacts, selectFetchContactStatus } from '../redux/slices/contactSlice';
import { CircularProgress } from '@mui/material';

const ContactContainer = styled.div`
	margin-top: 1.35rem;
	display: flex;
	width: 100%;
`;

const ContactCategories = styled.div`
	margin-top: 2.5rem;
	display: flex;
	width: 60%;
	min-width: 20rem;

	p.selected {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

const ContactCategory = styled.p`
	padding: 0.1rem 1.5rem;
	border-bottom: 0.06rem solid #D4D4D4;

	&:hover {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

const ContactArchiveButton = styled.button`
	background-color: #fff;
	border: 0rem solid;
	font-size: 1rem;
	line-height: 1.56rem;
	color: #E23428;
	font-weight: medium;`

const ContactUnarchiveButton = styled.button`
	background-color: #fff;
	border: 0rem solid;
	font-size: 1rem;
	line-height: 1.56rem;
	color: #00472a;
	font-weight: medium;`

const ContactID = styled.td`

	p {
		margin-top: 0.65rem;
		color: #799283;
	}

	p.customer_id {
		color: #393939;
		font-weight: 600;
		font-size: 1rem;
	}
`

const ContactCustomer = styled.td`
	min-width: 18ch;
	word-break: break-word;

	p {
		margin-top: 0.65rem;
        color: #799283;
		font-size: 0.9rem;
	}

	p.customer {
		color: #393939;
		font-weight: 600;
		font-size: 1rem;
	}
	`

const ContactSubject = styled.td`
    overflow: hidden;
	max-width: 85%;
	display: flex;
	flex-direction: column;
	gap: 0.65rem;

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
`;

const ContactPageContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 0.75rem;
	width: 95%;
	margin-top: 0.75rem;
	`;

const ContactPrev = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    background-color: #135846;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.75rem;
    z-index: 10;
`;

const ContactNext = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    background-color: #135846;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.75rem;
    z-index: 10;
`;

export default function Contact()
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

	const [basicFilter, updateBasicFilter] = useState(null);
	const [sidebar] = useOutletContext();
	const [ascOrder, updateAscOrder] = useState(true);
	
	let basicFiltered = [];
	if(basicFilter === null)
	{
		basicFiltered = [...contactList];
	} else {
		basicFiltered = contactList.filter((contact) => contact.status.toLowerCase() === basicFilter);
	}

	const [page, updatePage] = useState(0);

    const totalPages = Math.round(contactList.length / 5);

    return ((fetchStatus !== 'fulfilled') ? <MainComponent><CircularProgress /></MainComponent> :
		<Fragment>
			<GuestComments sidebarStatus={sidebar}></GuestComments>

			<ContactContainer>
				<ContactCategories>
					<ContactCategory className={(basicFilter === null) ? 'selected' : ''} onClick={() => { updateBasicFilter(null) }}>All Customer Reviews</ContactCategory>
					<ContactCategory className={(basicFilter === 'archived') ? 'selected' : ''}  onClick={() => { updateBasicFilter('archived') }}>Archived</ContactCategory>
				</ContactCategories>

				<ButtonContainer>
					<button type='button' onClick={() => {
						updateAscOrder(!ascOrder);
					}}>{ (ascOrder) ? 
						<Fragment>
							{'Newest'} <span><FaChevronDown size={14} /></span>
						</Fragment> :
						<Fragment>							
							{'Oldest'} <span><FaChevronUp size={14} /></span>
						</Fragment>} </button>
				</ButtonContainer>
			</ContactContainer>

			<BasicTable>
				<thead>
				<tr>
					<td>ID</td>
					<ContactCustomer>
						Customer
					</ContactCustomer>
					<ContactSubject>
						Subject
					</ContactSubject>
					<Fragment>
						<td>Action</td>
					</Fragment>
				</tr>
				</thead>
				<tbody>
				{
					basicFiltered.sort((a, b) => { 
						if(!ascOrder)
						{
							return (new Date(a.date)) - (new Date(b.date));
						} else {
							return (new Date(b.date)) - (new Date(a.date));
						}
					}).slice((page*5), ((page+1)*5)).map((contact) => {
						let subject = (contact.subject.length > 35) ? (contact.subject.slice(0, 35) + '...') : contact.subject;
						let comment = (contact.comment.length > 135) ? (contact.comment.slice(0, 135) + '...') : contact.comment;
						
						return <Fragment key={contact.id}>
							<tr>
								<ContactID>
									<p className='customer_id'>#{contact.id.split('-')[0]}</p>
									<p>{new Date(contact.date).toDateString()}</p>
								</ContactID>
								<ContactCustomer>
									<p className='customer'>{contact.customer_name}</p>
									<p>{contact.customer_mail}</p>
									<p><FaPhoneAlt size={12} /> {contact.customer_phone}</p>
								</ContactCustomer>
								<ContactSubject>
									<p className="subject">{subject}</p>
									<NestedViewMore content={contact.comment} filler={comment} />
								</ContactSubject>
								{(contact.status.toLowerCase() === 'archived') ? <Fragment>
										<td><ContactUnarchiveButton onClick={() => { updateArchivedStatus(contact, false)}}>Unarchive</ContactUnarchiveButton></td>
									</Fragment> : <Fragment>
										<td><ContactArchiveButton onClick={() => { updateArchivedStatus(contact, true)}}>Archive</ContactArchiveButton></td>
									</Fragment>}
							</tr>
						</Fragment>;
					})
				}
				</tbody>
			</BasicTable>

			<ContactPageContainer>
				{(page !== 0) ? <ContactPrev onClick={() => {
					const prevPage = page - 1;
					if(prevPage >= 0)
					{
						updatePage(prevPage);                    
					}
				}}><FaArrowLeft size={24} /></ContactPrev> : ''}
				{(totalPages !== page) ? <ContactNext onClick={() => {
					const nextPage = page + 1;
					if(nextPage <= totalPages)
					{
						updatePage(nextPage);                    
					}
				}}><FaArrowRight size={24} /></ContactNext> : ''}
			</ContactPageContainer>
		</Fragment>
	)


	function updateArchivedStatus(contactObject, archived)
	{
		const updatedObject = {
			...contactObject,
			status: (archived) ? 'archived' : 'active',
		}

		dispatch(putContact(updatedObject));
	}
}