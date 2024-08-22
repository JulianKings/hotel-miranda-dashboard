/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { Fragment, useEffect, useState } from 'react';
import { BasicTable, ButtonContainer, MainComponent } from '../styledcomponents/main';
import { FaArrowLeft, FaArrowRight, FaCalendarCheck, FaChevronDown, FaChevronUp, FaPhoneAlt } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, selectFetchUserStatus, selectUsers } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

const EmployeeContainer = styled.div`
	display: flex;
	width: 100%;
`;

const EmployeeCategories = styled.div`
	display: flex;
	width: 60%;
	min-width: 20rem;

	p.selected {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

const EmployeeCategory = styled.p`
	padding: 0.1rem 1rem;
	border-bottom: 0.06rem solid #D4D4D4;

	&:hover {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

const EmployeeSearch = styled.div`
	margin-top: 1rem;
	display: flex;
	flex-direction: column;

	input {
		width: 30%;
		max-width: 30ch;
		padding: 0.25rem 0.75rem;
		border: 0 solid;
		border-radius: 0.25rem;

		&:focus {
			outline: none;
		}
	}`;

const UsersPageContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 0.95rem;
	width: 95%;
	margin-top: 0.75rem;
	`;

const UsersPrev = styled.div`
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

const UsersNext = styled.div`
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

const UserInformation = styled.td`
	display: flex;
	gap: 0.75rem;
	align-items: center;

	img {
		width: 5.5rem;
		height: 5.5rem;
		border-radius: 0.75rem;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	p {
        color: #799283;
		font-size: 0.88rem;
		line-height: 1.31rem;
	}

	p.username {
		color: #393939;
		font-weight: 600;
		font-size: 1rem;
	}
`;

const UserStatus = styled.td`
	p {
		text-transform: uppercase;
		font-size: 0.88rem;
		line-height: 1.31rem;
		font-weight: 600;
	}

	p.active {
		color: #5AD07A;
	}

	p.inactive {
		color: #E23428;
	}
`;

export default function Users()
{
	const userList = useSelector(selectUsers);
	const fetchStatus = useSelector(selectFetchUserStatus);
	const dispatch = useDispatch();

	useEffect(() => {
		if(!fetchStatus || !userList)
		{
			dispatch(fetchUsers());
		}
	}, []);

	const [nameSearch, updateNameSearch] = useState(null);
	const [basicFilter, updateBasicFilter] = useState(null);
	
	const [ascOrder, updateAscOrder] = useState(true);
	const [nameOrder, updateNameOrder] = useState(null);
	const [page, updatePage] = useState(0);
	const navigate = useNavigate();

	let basicFiltered = [];
	if(basicFilter === null)
	{
		basicFiltered = [...userList];
	} else {
		basicFiltered = userList.filter((user) => user.status.toLowerCase() === basicFilter);
	}
	
	let searchResult = [];

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
			searchResult = searchResult.sort((a, b) => (new Date(a.start)) - (new Date(b.start)));
		} else {
			searchResult = searchResult.sort((a, b) => (new Date(b.start)) - (new Date(a.start)));
		}
	} else if(nameOrder !== null) {
		if(nameOrder)
		{
			searchResult = searchResult.sort((a, b) => {
				if (a.full_name < b.full_name) {
					return -1;
				} else if (a.full_name > b.full_name) {
					return 1;
				} else {
					return 0;
				}
			});
		} else {
			searchResult = searchResult.sort((a, b) => {
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

    const totalPages = Math.round(searchResult.length / 10);

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
					searchResult.slice((page*10), ((page+1)*10)).map((user) => {
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
						const prevPage = page - 1;
						if(prevPage >= 0)
						{
							updatePage(prevPage);                    
						}
					}}><FaArrowLeft size={24} /></UsersPrev> : ''}
					{(totalPages !== page && totalPages > 1) ? <UsersNext onClick={() => {
						const nextPage = page + 1;
						if(nextPage <= totalPages)
						{
							updatePage(nextPage);                    
						}
					}}><FaArrowRight size={24} /></UsersNext> : ''}
				</UsersPageContainer>
		</Fragment>
	);
}