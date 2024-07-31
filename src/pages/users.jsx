import styled from 'styled-components';
import { userArray } from '../data/user';
import { Fragment, useState } from 'react';
import { BasicTable } from '../styledcomponents/main';

const EmployeeCategories = styled.div`
	display: flex;
	width: 60%;
	min-width: 40rem;
`;

const EmployeeCategory = styled.p`
	padding: 0.1rem 1rem;
	border-bottom: 0.06rem solid #D4D4D4;

	&:hover {
		border-bottom: 0.13rem solid #135846;
	}
`;

const EmployeeSearch = styled.div`
	margin-top: 1rem;
	display: flex;
	flex-direction: column;

	input {
		width: 30%;
		max-width: 30ch;
	}`;

export default function Users()
{
	const userList = JSON.parse(userArray);
	const [nameSearch, updateNameSearch] = useState(null);
	const [basicFilter, updateBasicFilter] = useState(null);
	
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

	return (<>
		<EmployeeCategories>
			<EmployeeCategory onClick={() => { updateBasicFilter(null) }}>All Employee</EmployeeCategory>
			<EmployeeCategory onClick={() => { updateBasicFilter('active') }}>Active Employee</EmployeeCategory>
			<EmployeeCategory onClick={() => { updateBasicFilter('inactive') }}>Inactive Employee</EmployeeCategory>
		</EmployeeCategories>

		<EmployeeSearch>
			<label htmlFor='employeename'>Search by employee name</label>
			<input type='text' placeholder='Employee name' id='employeename' onChange={(event) => {
				const target = event.target;
				if(target.value !== null)
				{
					updateNameSearch(target.value);
				}
			}} />
		</EmployeeSearch>

		<BasicTable>
			<thead>
			<tr>
				<td>Name</td>
				<td>Job Desc</td>
				<td>Contact</td>
				<td>Status</td>
				<td></td>
			</tr>
			</thead>
			<tbody>
			{
				searchResult.map((user) => {
					return <Fragment key={user.id}>
						<tr>
							<td>
								{user.full_name} <br/>
								{user.mail} <br />
								
							</td>
							<td>{user.description}</td>
							<td>{user.contact}</td>
							<td>{user.status}</td>
							<td></td>
						</tr>
					</Fragment>;
				})
			}
			</tbody>
		</BasicTable>
	</>);
}