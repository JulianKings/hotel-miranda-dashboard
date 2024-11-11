/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react';
import { BasicTable, ButtonContainer, MainComponent } from '../styledcomponents/main';
import { FaArrowLeft, FaArrowRight, FaCalendarCheck, FaChevronDown, FaChevronUp, FaPhoneAlt } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, selectFetchUserStatus, selectUsers } from '../redux/slices/user';
import { CircularProgress } from '@mui/material';
import { ApiAbstractInterface, ApiUserInterface } from '../interfaces/apiManagement';
import { useApiDispatch, useApiSelector } from '../redux/store';
import { EmployeeContainer, EmployeeCategories, EmployeeCategory, EmployeeSearch, UserInformation, UserStatus, UsersPageContainer, UsersPrev, UsersNext } from './usersStyle';
import { Sortable, TableSchema } from '../interfaces/tableManagement';
import { TableModule } from '../components/TableModuleComponent';

const userTableSchema: TableSchema[] = [
	{id: 'full_name', type: 'user_information', name: 'Information', sortable: true},
	{id: 'description', type: 'default', name: 'Job Desc', sortable: false},
	{id: 'id', type: 'user_id', name: 'ID', sortable: false},
	{id: 'status', type: 'user_status', name: 'Status', sortable: false},
	{id: 'actions', type: 'actions', name: '', sortable: false}
];

export default function Users()
{
	const userList: ApiUserInterface[] = useApiSelector(selectUsers);
	const fetchStatus: (string | null) = useApiSelector(selectFetchUserStatus);
	const dispatch = useApiDispatch();

	useEffect(() => {
		if(!fetchStatus || !userList || fetchStatus === 'fulfilled')
		{
			dispatch(fetchUsers());
		}
	}, []);

	const [currentSortFilter, updateSortFilter] = useState<Sortable>({id: 'start', type: 'desc', mode: 'date'});
	
	const [nameSearch, updateNameSearch] = useState<string | null>(null);
	const [basicFilter, updateBasicFilter] = useState<string | null>(null);
	
	const navigate = useNavigate();

	const searchResult: ApiUserInterface[] = userList.filter((user: ApiUserInterface) => {
		let valid = true;

		if(basicFilter && user)
		{
			valid = (user.status.toLowerCase() === basicFilter);
		}
		
		if(nameSearch && nameSearch !== '' && user)
		{
			valid = valid && user.full_name.toLowerCase().includes(nameSearch.toLowerCase());
		}
		
		return valid;
	});

	return ((fetchStatus !== 'fulfilled') ? <MainComponent><CircularProgress /></MainComponent> :
		<Fragment>
			<EmployeeContainer>
				<EmployeeCategories>
					<EmployeeCategory className={(basicFilter === null) ? 'selected' : ''} onClick={() => { updateBasicFilter(null) }}>All Employee</EmployeeCategory>
					<EmployeeCategory className={(basicFilter === 'active') ? 'selected' : ''} onClick={() => { updateBasicFilter('active') }}>Active Employee</EmployeeCategory>
					<EmployeeCategory className={(basicFilter === 'inactive') ? 'selected' : ''} onClick={() => { updateBasicFilter('inactive') }}>Inactive Employee</EmployeeCategory>
				</EmployeeCategories>

				<ButtonContainer>
					<button type='button' className='alternate__button' onClick={ () => { navigate('/user/add') }}>New Employee</button>
					
					<button type='button' onClick={() => {
							updateSortFilterAction('start');
						}}>{ (currentSortFilter.type !== 'asc') ? 
							<Fragment>
								{'Start Date'} <span><FaChevronDown size={14} /></span>
							</Fragment> :
							<Fragment>							
								{'Start Date'} <span><FaChevronUp size={14} /></span>
							</Fragment>} </button>
				</ButtonContainer>
			</EmployeeContainer>

			<EmployeeSearch>
				<input type='text' placeholder='Employee name' id='employeename' onChange={(event) => {
					const target = event.target;
					if(target.value !== null)
					{
						updateNameSearch(target.value);
					}
				}} />
			</EmployeeSearch>
				
			<TableModule tableType='user' tableDataSchema={userTableSchema} tableContent={searchResult as ApiAbstractInterface[]} updateSortFilter={updateSortFilterAction} currentSortFilter={currentSortFilter} />
		</Fragment>
	);

	function updateSortFilterAction(id: string): void
	{
		const sortMode = (id.includes('date') || id.includes('start')) ? 'date' : 'string';
		if(currentSortFilter.id === id)
		{
			updateSortFilter({id: id, type: (currentSortFilter.type === 'asc') ? 'desc' : 'asc', mode: sortMode});
		} else {
			updateSortFilter({id: id, type: 'asc', mode: sortMode});
		}
	}
}