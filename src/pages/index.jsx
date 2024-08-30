/* eslint-disable react-hooks/exhaustive-deps */
import { BsFillHouseFill } from 'react-icons/bs';
import { IoBed } from 'react-icons/io5';
import { MdLogout, MdOutlineLogin } from 'react-icons/md';
import styled from 'styled-components';
import { Fragment, useEffect, useState } from 'react';
import singleBed from '../assets/room1.png';
import doubleBed from '../assets/room2.png';
import doubleSuperior from '../assets/room3.png';
import suite from '../assets/room4.png';
import { NavLink, useOutletContext } from 'react-router-dom';
import GuestComments from '../components/GuestComments';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, selectBookings, selectFetchBookingsStatus } from '../redux/slices/bookingsSlice';
import { fetchRooms, selectFetchRoomStatus, selectRooms } from '../redux/slices/roomSlice';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';

const KPIHolder = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(20.25rem, 1fr));
	gap: 1.38rem;`;

const KPIItem = styled.div`
	display: flex;
	align-items: center;
	background-color: #FFFFFF;
	border-radius: 0.75rem;
	padding: 1.88rem 1.88rem;
	box-shadow: 0rem 0.25rem 0.25rem rgb(0, 0, 0, .05);

	font-size: 1.88rem;
	line-height: 2.88rem;
	color: #393939;
	font-weight: 600;
	transition: all 0.8s ease-in-out;

	&:hover {
		box-shadow: 0rem 1rem 1.88rem rgb(0, 0, 0, 0.14);	
	}

	&:hover div {
		background-color: #E23428;
		color: #FFFFFF;
	}
`;

const KPIItemImage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #FFEDEC;
	width: 4.06rem;
	height: 4.06rem;
	padding: 1.13rem 1.13rem;
	color: #E23428;
	border-radius: 0.5rem;
	transition: background-color 0.6s ease-in-out, color 0.6s ease-in-out;		
`

const KPIItemText = styled.p`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	margin-left: 1.38rem;

	span {
		display: block;
		color: #787878;
		font-weight: 300;
		font-size: 0.88rem;
		line-height: 1.31rem;

	}
`;

const InformationHolder = styled.div`
	margin-top: 2.5rem;
	display: grid;
	grid-template-columns: 47% 47%;
	grid-template-rows: 1fr;;
	gap: 2.44rem;
	justify-content: center;
	`;

const InformationBox = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #FFFFFF;
	border-radius: 1.25rem;
	padding: 1.88rem 1.8rem;
	width: 100%;
	gap: 0.75rem;
	box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.02);
`;

const InputBox = styled.div`
	display:flex;
	flex-direction: column;
	gap: 0.25rem;
	
	input {
		background-color: #EBF1EF;
		border: 0rem solid;
		padding: 0.5rem 0.5rem;
		border-radius: 0.25rem;

		&:focus {
			outline: none;
		}
	}`;

const RoomListBox = styled.div`
	margin-top: 2.5rem;
	margin-bottom: 2.5rem;
	display: flex;
	flex-direction: column;
	gap: 1.75rem;
	background-color: #FFFFFF;
	border-radius: 1.25rem;
	padding: 1.88rem 1.8rem;
	width: 100%;
	box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.02);
`;

const RoomListItem = styled.div`
	width: 100%;
	display: grid;
	gap: 1.31rem;
	grid-template-columns: 9.63rem 1fr 30%;
	grid-template-rows: 1fr;
	align-items: center;
	transition: transform 0.4s ease-in-out;

	a {
		text-decoration: none;
		color: #393939;

		&:hover {
			color: #135846;
		}
	}

	&:hover {
		transform: scale(1.02);
	}

	&:hover p.room_type {
		color: #EBF1EF;
		background-color: #135846;
	}

	img {
		width: 100%;
		border-radius: 0.5rem;
	}
`;

const RoomListItemInformation = styled.div`
	display:flex;
	flex-direction: column;
	gap: 0.75rem;
	align-items: flex-start;
	color: #393939;
	font-weight: 600;
	font-size: 1.25rem;
	line-height: 1.88rem;

	p.customer_name {
		font-size: 0.88rem;
		line-height: 1.31rem;
		font-weight: 300;
	}

	p.room_type {
		padding: 0.75rem 0.75rem;
		border-radius: 0.75rem;
		background-color: #EBF1EF;
		color: #135846;
		font-weight: 300;
		font-size: 1.25rem;
		line-height: 1.88rem;
		transition: background-color 0.6s ease-in-out, color 0.4s ease-in-out;
	}
`

const RoomListItemCheckInOut = styled.div`
	display:flex;
	flex-direction: column;
	gap: 0.8rem;
	align-items: flex-end;

	p {
		padding: 0.75rem 0.75rem;
		border-radius: 0.75rem;
		background-color: #135846;
		color: #FFFFFF;
		font-weight: 300;
		font-size: 1.25rem;
		line-height: 1.88rem;
	}

	p.check_out {
		background-color: #E23428;
	}
`

const RoomListMore = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 1.25rem;

	button {
		background-color: #ffffff;
		border: 0rem solid;
		color: #135846;
		font-weight: 600;
		font-size: 1rem;
		line-height: 1.56rem;
	}
`;

export default function Index()
{
	const bookingList = useSelector(selectBookings);
	const fetchBookingStatus = useSelector(selectFetchBookingsStatus);
	const roomList = useSelector(selectRooms);
	const fetchRoomStatus = useSelector(selectFetchRoomStatus);
	const dispatch = useDispatch();

	useEffect(() => {
		if(!fetchRoomStatus || !roomList || fetchRoomStatus === 'fulfilled')
		{
			dispatch(fetchRooms());
		}

		if(!fetchBookingStatus || !bookingList || fetchBookingStatus === 'fulfilled')
		{
			dispatch(fetchBookings());
		}
	}, []);

	const [startDate, updateStartDate] = useState(null);
	const [endDate, updateEndDate] = useState(null);
	const [viewMore, updateViewMore] = useState(0);
	const [sidebar] = useOutletContext();

	const [filteredBookings, updateFilteredBookings] = useState(bookingList);
	
	useEffect(() => {
		if(bookingList.length > 0)
		{
			updateFilteredBookings(bookingList);
		}
	}, [bookingList])
	
	useEffect(() => {
		if(endDate)
		{	
			if(startDate)
			{
				const filtered = bookingList.filter((booking) => new Date(booking.check_out) < endDate);
				updateFilteredBookings(filtered.filter((booking) => new Date(booking.check_in) > startDate));	
			} else {
				updateFilteredBookings(bookingList.filter((booking) => new Date(booking.check_out) < endDate))
			}

			updateViewMore(0);
		} else {
			updateFilteredBookings([...bookingList]);
		}		
	}, [startDate, endDate]);

	let scheduledRooms = 0;
	if(roomList)
	{
		scheduledRooms = Math.round((((roomList.filter((room) => room.status === 'booked')).length) / roomList.length) * 100);
	}

	return ((fetchRoomStatus !== 'fulfilled' || fetchBookingStatus !== 'fulfilled') ? <MainComponent><CircularProgress /></MainComponent> :
		<Fragment>
			<KPIHolder>
				<KPIItem>
					<KPIItemImage><IoBed size={28} /></KPIItemImage>
					<KPIItemText>
						<p>{filteredBookings.length}</p>
						<span>Bookings</span>
					</KPIItemText>
				</KPIItem>

				<KPIItem>
					<KPIItemImage><BsFillHouseFill size={28} /></KPIItemImage>
					<KPIItemText>
						<p>{scheduledRooms}%</p>
						<span>Scheduled Rooms</span>
					</KPIItemText>
				</KPIItem>

				<KPIItem>
					<KPIItemImage><MdOutlineLogin size={28} /></KPIItemImage>
					<KPIItemText>
						<p>{filteredBookings.filter((booking) => new Date(booking.check_in) > (new Date())).length}</p>
						<span>Check In</span>
					</KPIItemText>
				</KPIItem>
				
				<KPIItem>
					<KPIItemImage><MdLogout size={28} /></KPIItemImage>
					<KPIItemText>
						<p>{filteredBookings.filter((booking) => new Date(booking.check_out) < (new Date())).length}</p>
						<span>Check Out</span>
					</KPIItemText>
				</KPIItem>
			</KPIHolder>

			<InformationHolder>
				<InformationBox>
					<InputBox>
						<label htmlFor='start_date'>Start date: </label>
						<input type='date' id='start_date' onChange={(event) => {
							updateStartDate(new Date(event.target.value));
						}} />
					</InputBox>

					<InputBox>
						<label htmlFor='end_date'>End date: </label>
						<input type='date' id='end_date' onChange={(event) => {
							updateEndDate(new Date(event.target.value));
						}} />
					</InputBox>
				</InformationBox>

				<InformationBox>
					Graph
				</InformationBox>
			</InformationHolder>

			<RoomListBox>
				{
					(startDate && endDate) ? (
						filteredBookings.sort((a, b) => (new Date(a.check_in)) - (new Date(b.check_in))).slice(0, (3 + viewMore)).map((booking) => {
							return <Fragment key={booking.id}>
								<RoomListItem>
									<img src={(booking.room_type === 'Suite') ? suite : 
										(booking.room_type === 'Double Superior') ? doubleSuperior :
											(booking.room_type === 'Double Bed') ? doubleBed : singleBed
									} alt='Room Image' />
								
									<RoomListItemInformation>
										<p><NavLink to={'/booking/' + booking.id}>Room #{booking.room_number}</NavLink></p>
										<p className='customer_name'>{booking.customer_name}</p>
										<p className='room_type'>{booking.room_type}</p>
									</RoomListItemInformation>
									<RoomListItemCheckInOut>
										<p>{new Date(booking.check_in).toDateString()}</p>
										<p className='check_out'>{new Date(booking.check_out).toDateString()}</p>
									</RoomListItemCheckInOut>
								</RoomListItem>
							</Fragment>
						})
					) : 'Please select a valid date on the calendar to showcase bookings.'
				}

				{
					(endDate && startDate && (viewMore + 3) <= filteredBookings.length) ? 
					(<RoomListMore>
						<button type='button' onClick={() => {
							const increase = viewMore + 3;
							updateViewMore(increase);
						}}>View More</button>
					</RoomListMore>) : ''
				}
			</RoomListBox>

			<GuestComments sidebarStatus={sidebar}></GuestComments>
		</Fragment>
	)
}