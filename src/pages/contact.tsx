/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react'
import { BasicTable, ButtonContainer, MainComponent } from '../styledcomponents/main';
import GuestComments from '../components/GuestComments';
import { useOutletContext } from 'react-router-dom';
import NestedViewMore from '../components/NestedViewMore';
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp, FaPhoneAlt } from 'react-icons/fa';
import { fetchContacts, putContact, selectContacts, selectFetchContactStatus } from '../redux/slices/contact';
import { CircularProgress } from '@mui/material';
import { ApiContactInterface } from '../interfaces/apiManagement';
import { ContextType } from '../interfaces/layoutManagement';
import { useApiDispatch, useApiSelector } from '../redux/store';
import { ContactContainer, ContactCategories, ContactCategory, ContactCustomer, ContactSubject, ContactID, ContactUnarchiveButton, ContactArchiveButton, ContactPageContainer, ContactPrev, ContactNext } from './contactStyle';

export default function Contact()
{
	const contactList: ApiContactInterface[] = useApiSelector(selectContacts);
	const fetchStatus: string | null = useApiSelector(selectFetchContactStatus);
	const dispatch = useApiDispatch();

	useEffect(() => {
		if(!fetchStatus)
		{
			dispatch(fetchContacts());
		}
	}, []);

	const [basicFilter, updateBasicFilter] = useState<string | null>(null);
	const { sidebar } = useOutletContext<ContextType>();
	const [ascOrder, updateAscOrder] = useState<boolean>(true);
	
	let basicFiltered: ApiContactInterface[] = [];
	if(basicFilter === null)
	{
		basicFiltered = [...contactList];
	} else {
		basicFiltered = contactList.filter((contact) => contact.status.toLowerCase() === basicFilter);
	}

	const [page, updatePage] = useState<number>(0);

    const totalPages: number = Math.round(contactList.length / 5);

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
							return (new Date(a.date).getTime()) - (new Date(b.date).getTime());
						} else {
							return (new Date(b.date).getTime()) - (new Date(a.date).getTime());
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
					const prevPage: number = page - 1;
					if(prevPage >= 0)
					{
						updatePage(prevPage);                    
					}
				}}><FaArrowLeft size={24} /></ContactPrev> : ''}
				{(totalPages !== page) ? <ContactNext onClick={() => {
					const nextPage: number = page + 1;
					if(nextPage <= totalPages)
					{
						updatePage(nextPage);                    
					}
				}}><FaArrowRight size={24} /></ContactNext> : ''}
			</ContactPageContainer>
		</Fragment>
	)


	function updateArchivedStatus(contactObject: ApiContactInterface, archived: boolean)
	{
		const updatedObject: ApiContactInterface = {
			...contactObject,
			status: (archived) ? 'archived' : 'active',
		}

		dispatch(putContact(updatedObject));
	}
}