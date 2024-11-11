/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react'
import { ButtonContainer, MainComponent } from '../styledcomponents/main';
import GuestComments from '../components/GuestComments';
import { useOutletContext } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { fetchContacts, putContact, selectContacts, selectFetchContactStatus } from '../redux/slices/contact';
import { CircularProgress } from '@mui/material';
import { ApiAbstractInterface, ApiContactInterface } from '../interfaces/apiManagement';
import { ContextType } from '../interfaces/layoutManagement';
import { useApiDispatch, useApiSelector } from '../redux/store';
import { ContactContainer, ContactCategories, ContactCategory } from './contactStyle';
import { Sortable, TableSchema } from '../interfaces/tableManagement';
import { TableModule } from '../components/TableModuleComponent';

const contactTableSchema: TableSchema[] = [
	{id: 'id', type: 'contact_id', name: 'ID', sortable: false},
	{id: 'customer_name', type: 'contact_information', name: 'Customer', sortable: false},
	{id: 'subject', type: 'contact_subject', name: 'Subject', sortable: false},
	{id: 'action', type: 'contact_update', name: 'Action', sortable: false}
];

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
	
	const [currentSortFilter, updateSortFilter] = useState<Sortable>({id: 'id', type: 'asc', mode: 'number'});

	const searchResult: ApiContactInterface[] = contactList.filter((contact: ApiContactInterface) => {
		let valid = true;

		if(basicFilter && contact)
		{
			valid = (contact.status.toLowerCase() === basicFilter);
		}
		
		return valid;
	});
	

    return ((fetchStatus !== 'fulfilled') ? <MainComponent><CircularProgress /></MainComponent> :
		<Fragment>
			<GuestComments $sidebarStatus={sidebar}></GuestComments>

			<ContactContainer>
				<ContactCategories>
					<ContactCategory className={(basicFilter === null) ? 'selected' : ''} onClick={() => { updateBasicFilter(null) }}>All Customer Reviews</ContactCategory>
					<ContactCategory className={(basicFilter === 'archived') ? 'selected' : ''}  onClick={() => { updateBasicFilter('archived') }}>Archived</ContactCategory>
				</ContactCategories>

				<ButtonContainer>
					<button type='button' onClick={() => {
						updateSortFilterAction('id');
					}}>{ (currentSortFilter.type === 'asc') ? 
						<Fragment>
							{'Newest'} <span><FaChevronDown size={14} /></span>
						</Fragment> :
						<Fragment>							
							{'Oldest'} <span><FaChevronUp size={14} /></span>
						</Fragment>} </button>
				</ButtonContainer>
			</ContactContainer>

			<TableModule tableType='contact' tableDataSchema={contactTableSchema} tableContent={searchResult as ApiAbstractInterface[]} updateSortFilter={updateSortFilterAction} currentSortFilter={currentSortFilter} helperFunction={updateArchivedStatus} />		
		</Fragment>
	)

	function updateSortFilterAction(id: string): void
	{
		const sortMode = 'number';
		if(currentSortFilter.id === id)
		{
			updateSortFilter({id: id, type: (currentSortFilter.type === 'asc') ? 'desc' : 'asc', mode: sortMode});
		} else {
			updateSortFilter({id: id, type: 'asc', mode: sortMode});
		}
	}


	function updateArchivedStatus(contactObject: ApiContactInterface, archived: boolean)
	{
		const updatedObject: ApiContactInterface = {
			...contactObject,
			status: (archived) ? 'archived' : 'active',
		}

		dispatch(putContact(updatedObject));
	}
}