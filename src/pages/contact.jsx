import { Fragment, useState } from 'react'
import styled from 'styled-components';
import { BasicTable, GuestCommentsBox } from '../styledcomponents/main';
import { contactArray } from '../data/contact';

const ContactCategories = styled.div`
	margin-top: 2.5rem;
	display: flex;
	width: 60%;
	min-width: 40rem;
`;

const ContactCategory = styled.p`
	padding: 0.1rem 1rem;
	border-bottom: 0.06rem solid #D4D4D4;

	&:hover {
		border-bottom: 0.13rem solid #135846;
	}
`;

export default function Contact()
{
	const contactList = JSON.parse(contactArray);
	const [basicFilter, updateBasicFilter] = useState(null);
	
	let basicFiltered = [];
	if(basicFilter === null)
	{
		basicFiltered = [...contactList];
	} else {
		basicFiltered = contactList.filter((contact) => contact.status.toLowerCase() === basicFilter);
	}

    return (
        <>
			<GuestCommentsBox>
				Guest Comments
			</GuestCommentsBox>

			<ContactCategories>
				<ContactCategory onClick={() => { updateBasicFilter(null) }}>All Customer Reviews</ContactCategory>
				<ContactCategory onClick={() => { updateBasicFilter('archived') }}>Archived</ContactCategory>
			</ContactCategories>

			<BasicTable>
				<thead>
				<tr>
					<td>ID</td>
					<td>Date</td>
					<td>Customer</td>
					<td>Subject</td>
					<td>Comment</td>
					<td>Action</td>
					<td></td>
				</tr>
				</thead>
				<tbody>
				{
					basicFiltered.map((contact) => {
						return <Fragment key={contact.id}>
							<tr>
								<td>{contact.id}</td>
								<td>{contact.date}</td>
								<td>
									{contact.customer_name}<br />
									{contact.customer_mail}<br />
									{contact.customer_phone}
								</td>
								<td>{contact.subject}</td>
								<td>{contact.comment}</td>
								<td><button type='button'>Archive</button></td>
								<td></td>
							</tr>
						</Fragment>;
					})
				}
				</tbody>
			</BasicTable>
        </>
      )
}