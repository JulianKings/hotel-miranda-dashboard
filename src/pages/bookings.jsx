import styled from 'styled-components';
import { BasicTable } from '../styledcomponents/main';
import { bookingArray } from '../data/bookings';
import { Fragment, useState } from 'react';

const BookingContainer = styled.div`
	display: flex;
	width: 100%;
`;

const BookingButtonContainer = styled.div`
	flex: 1 0 auto;
	display: flex;
	justify-content: flex-end;`;

const BookingCategories = styled.div`
	display: flex;
	width: 70%;
	min-width: 40rem;
`;

const BookingCategory = styled.p`
	padding: 0.1rem 1rem;
	border-bottom: 0.06rem solid #D4D4D4;

	&:hover {
		border-bottom: 0.13rem solid #135846;
	}
`;

const BookingSearch = styled.div`
	margin-top: 1rem;
	display: flex;
	flex-direction: column;

	input {
		width: 30%;
		max-width: 30ch;
	}`;

export default function Bookings()
{
	const roomList = JSON.parse(bookingArray);
	const [nameSearch, updateNameSearch] = useState(null);
	const [basicFilter, updateBasicFilter] = useState(null);
	
	let basicFiltered = [];
	if(basicFilter === null)
	{
		basicFiltered = [...roomList];
	} else {
		basicFiltered = roomList.filter((booking) => booking.status.toLowerCase() === basicFilter);
	}

	let searchResult = [];

	if(nameSearch && nameSearch !== '')
	{
		searchResult = basicFiltered.filter((booking) => {
			return booking.customer_name.toLowerCase().includes(nameSearch.toLowerCase())
		})
	} else {
		searchResult = [...basicFiltered];
	}

    return (
	<>
		<BookingContainer>
			<BookingCategories>
				<BookingCategory onClick={() => { updateBasicFilter(null) }}>All Bookings</BookingCategory>
				<BookingCategory onClick={() => { updateBasicFilter('checking_in') }}>Checking In</BookingCategory>
				<BookingCategory onClick={() => { updateBasicFilter('checking_out') }}>Checking Out</BookingCategory>
				<BookingCategory onClick={() => { updateBasicFilter('in_progress') }}>In Progress</BookingCategory>
			</BookingCategories>

			<BookingButtonContainer>
				<button type='button'>New Booking</button>
			</BookingButtonContainer>
		</BookingContainer>

		<BookingSearch>
			<label htmlFor='guestname'>Search by guest name</label>
			<input type='text' placeholder='Guest name' id='guestname' onChange={(event) => {
				const target = event.target;
				if(target.value !== null)
				{
					updateNameSearch(target.value);
				}
			}} />
		</BookingSearch>

		<BasicTable>
			<thead>
			<tr>
				<td>Guest</td>
				<td>Order Date</td>
				<td>Check in</td>
				<td>Check out</td>
				<td>Special Request</td>
				<td>Room Type</td>
				<td>Status</td>
				<td></td>
			</tr>
			</thead>
			<tbody>			
			{
				searchResult.map((booking) => {
					return <Fragment key={booking.id}>
						<tr>
							<td>{booking.customer_name}</td>
							<td>{booking.date}</td>
							<td>{booking.check_in}</td>
							<td>{booking.check_out}</td>
							<td>
								<button type='button'>View notes</button>
							</td>
							<td>
								{booking.room_number}<br />
								{booking.room_type}
							</td>
							<td>{booking.status}</td>
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