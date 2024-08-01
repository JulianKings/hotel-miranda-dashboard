import { Fragment, useState } from 'react'
import styled from 'styled-components';
import { BasicTable } from '../styledcomponents/main';
import { contactArray } from '../data/contact';
import GuestComments from '../components/GuestComments';
import { useOutletContext } from 'react-router-dom';

const ContactCategories = styled.div`
	margin-top: 2.5rem;
	display: flex;
	width: 60%;
	min-width: 40rem;

	p.selected {
		border-bottom: 0.13rem solid #135846;
	}
`;

const ContactCategory = styled.p`
	padding: 0.1rem 1rem;
	border-bottom: 0.06rem solid #D4D4D4;

	&:hover {
		border-bottom: 0.13rem solid #135846;
	}
`;

const ContactArchiveButton = styled.button`
	background-color: #fff;
	border: 0rem solid;
	font-size: 1rem;
	line-height: 1.56rem;
	color: #E23428;
	font-weight: medium;`

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

export default function Contact()
{
	const contactList = JSON.parse(contactArray);
	const [basicFilter, updateBasicFilter] = useState(null);
	const [sidebar] = useOutletContext();
	
	let basicFiltered = [];
	if(basicFilter === null)
	{
		basicFiltered = [...contactList];
	} else {
		basicFiltered = contactList.filter((contact) => contact.status.toLowerCase() === basicFilter);
	}

    return (
        <>
			<GuestComments sidebarStatus={sidebar}></GuestComments>

			<ContactCategories>
				<ContactCategory className={(basicFilter === null) ? 'selected' : ''} onClick={() => { updateBasicFilter(null) }}>All Customer Reviews</ContactCategory>
				<ContactCategory className={(basicFilter === 'archived') ? 'selected' : ''}  onClick={() => { updateBasicFilter('archived') }}>Archived</ContactCategory>
			</ContactCategories>

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
					{(basicFilter === 'archived') ? `` : <Fragment>
							<td>Action</td>
						</Fragment>}
				</tr>
				</thead>
				<tbody>
				{
					basicFiltered.slice(0,10).map((contact) => {
						let subject = (contact.subject.length > 35) ? (contact.subject.slice(0, 35) + '...') : contact.subject;
						let comment = (contact.comment.length > 135) ? (contact.comment.slice(0, 135) + '...') : contact.comment;
						
						return <Fragment key={contact.id}>
							<tr>
								<td>{contact.id} <br />
									{contact.date}</td>
								<ContactCustomer>
									<p className='customer'>{contact.customer_name}</p>
									<p>{contact.customer_mail}</p>
									<p>{contact.customer_phone}</p>
								</ContactCustomer>
								<ContactSubject>
									<p className="subject">{subject}</p>
									<p className="content">{comment} {(contact.comment.length > 135) ? <Fragment>
										<span className="content_more">View more</span>
									</Fragment> : ''}</p>
								</ContactSubject>
								{(basicFilter === 'archived') ? `` : <Fragment>
										<td><ContactArchiveButton>Archive</ContactArchiveButton></td>
									</Fragment>}
							</tr>
						</Fragment>;
					})
				}
				</tbody>
			</BasicTable>
        </>
      )
}