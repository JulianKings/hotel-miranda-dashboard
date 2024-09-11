/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react';
import { BasicTable, ButtonContainer, MainComponent } from '../styledcomponents/main';
import { FaArrowLeft, FaArrowRight, FaCalendarCheck, FaChevronDown, FaChevronUp, FaPhoneAlt } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, selectFetchUserStatus, selectUsers } from '../redux/slices/user';
import { CircularProgress } from '@mui/material';
import { ApiUserInterface } from '../interfaces/apiManagement';
import { useApiDispatch, useApiSelector } from '../redux/store';
import { EmployeeContainer, EmployeeCategories, EmployeeCategory, EmployeeSearch, UserInformation, UserStatus, UsersPageContainer, UsersPrev, UsersNext } from './usersStyle';

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

	const [nameSearch, updateNameSearch] = useState<string | null>(null);
	const [basicFilter, updateBasicFilter] = useState<string | null>(null);
	
	const [ascOrder, updateAscOrder] = useState<boolean | null>(true);
	const [nameOrder, updateNameOrder] = useState<boolean | null>(null);
	const [page, updatePage] = useState<number>(0);
	const navigate = useNavigate();

	let basicFiltered: ApiUserInterface[] = [];
	if(basicFilter === null)
	{
		basicFiltered = [...userList];
	} else {
		basicFiltered = userList.filter((user) => user.status.toLowerCase() === basicFilter);
	}
	
	let searchResult: ApiUserInterface[] = [];

	if(nameSearch && nameSearch !== '')
	{
		searchResult = basicFiltered.filter((user) => {
			return user.full_name.toLowerCase().includes(nameSearch.toLowerCase())
		})
	} else {
		searchResult = [...basicFiltered];
	}

	if(ascOrder !== null)
	{
		if(ascOrder)
		{
			searchResult = searchResult.sort((a: ApiUserInterface, b: ApiUserInterface) => (new Date(a.start)).getTime() - (new Date(b.start)).getTime());
		} else {
			searchResult = searchResult.sort((a: ApiUserInterface, b: ApiUserInterface) => (new Date(b.start)).getTime() - (new Date(a.start)).getTime());
		}
	} else if(nameOrder !== null) {
		if(nameOrder)
		{
			searchResult = searchResult.sort((a: ApiUserInterface, b: ApiUserInterface) => {
				if (a.full_name < b.full_name) {
					return -1;
				} else if (a.full_name > b.full_name) {
					return 1;
				} else {
					return 0;
				}
			});
		} else {
			searchResult = searchResult.sort((a: ApiUserInterface, b: ApiUserInterface) => {
				if (a.full_name > b.full_name) {
					return -1;
				} else if (a.full_name < b.full_name) {
					return 1;
				} else {
					return 0;
				}
			});
		}
	}

    const totalPages: number = Math.round(searchResult.length / 10);

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
							updateAscOrder(!ascOrder);
							updateNameOrder(null);
						}}>{ (ascOrder) ? 
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
						updatePage(0);
					}
				}} />
			</EmployeeSearch>

			<BasicTable>
				<thead>
				<tr>
					<td onClick={() => {
							updateAscOrder(null);
							updateNameOrder(!nameOrder);
						}}>{ (nameOrder) ? 
							<Fragment>
								{'Information'} <span><FaChevronDown size={14} /></span>
							</Fragment> :
							<Fragment>							
								{'Information'} <span><FaChevronUp size={14} /></span>
							</Fragment>}</td>
					<td>Job Desc</td>
					<td>ID</td>
					<td>Status</td>
					<td></td>
				</tr>
				</thead>
				<tbody>
				{
					searchResult.slice((page*10), ((page+1)*10)).map((user: ApiUserInterface) => {
						return <Fragment key={user.id}>
							<tr>
								<UserInformation>
									<img src={user.profile_picture} alt='User Image' />
									<div>
										<p className='username'>{user.full_name}</p>
										<p>{user.mail}</p>
										<p><FaPhoneAlt size={12} /> {user.contact}</p> 
										<p><FaCalendarCheck size={12} /> Started {new Date(user.start).toDateString()}</p> 
									</div>
								</UserInformation>
								<td>{user.description}</td>
								<td>#{user.id.split('-')[0]}</td>
								<UserStatus>
									<p className={user.status}>{user.status}</p>
								</UserStatus>
								<td><BsThreeDotsVertical color={'#6E6E6E'} size={16} onClick={() => {
									navigate('/user/' + user.id + '/update');
								}} /></td>
							</tr>
						</Fragment>;
					})
				}
				</tbody>
			</BasicTable>

			<UsersPageContainer>
					{(page !== 0) ? <UsersPrev onClick={() => {
						const prevPage: number = page - 1;
						if(prevPage >= 0)
						{
							updatePage(prevPage);                    
						}
					}}><FaArrowLeft size={24} /></UsersPrev> : ''}
					{(totalPages !== page && totalPages > 1) ? <UsersNext onClick={() => {
						const nextPage: number = page + 1;
						if(nextPage <= totalPages)
						{
							updatePage(nextPage);                    
						}
					}}><FaArrowRight size={24} /></UsersNext> : ''}
				</UsersPageContainer>
		</Fragment>
	);
}