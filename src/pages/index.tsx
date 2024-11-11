/* eslint-disable react-hooks/exhaustive-deps */
import { BsFillHouseFill } from 'react-icons/bs';
import { IoBed } from 'react-icons/io5';
import { MdLogout, MdOutlineLogin } from 'react-icons/md';
import { Fragment, useEffect, useState } from 'react';
import singleBed from '../assets/room1.png';
import doubleBed from '../assets/room2.png';
import doubleSuperior from '../assets/room3.png';
import suite from '../assets/room4.png';
import { NavLink, useOutletContext } from 'react-router-dom';
import GuestComments from '../components/GuestComments';
import { fetchBookings, selectBookings, selectFetchBookingsStatus } from '../redux/slices/bookings';
import { fetchRooms, selectFetchRoomStatus, selectRooms } from '../redux/slices/room';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';
import { ContextType } from '../interfaces/layoutManagement';
import { useApiDispatch, useApiSelector } from '../redux/store';
import { ApiBookingInterface, ApiRoomInterface } from '../interfaces/apiManagement';
import { KPIHolder, KPIItem, KPIItemImage, KPIItemText, InformationHolder, InformationBox, InputBox, RoomListBox, RoomListItem, RoomListItemInformation, RoomListItemCheckInOut, RoomListMore } from './indexStyle';
import { DatePicker } from '@mantine/dates';

export default function Index()
{
	const bookingList: ApiBookingInterface[] = useApiSelector(selectBookings);
	const fetchBookingStatus: (string | null) = useApiSelector(selectFetchBookingsStatus);
	const roomList: ApiRoomInterface[] = useApiSelector(selectRooms);
	const fetchRoomStatus: (string | null) = useApiSelector(selectFetchRoomStatus);
	const dispatch = useApiDispatch();

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

	const [startDate, updateStartDate] = useState<Date | null>(null);
	const [endDate, updateEndDate] = useState<Date | null>(null);
	const [viewMore, updateViewMore] = useState<number>(0);
	const {sidebar} = useOutletContext<ContextType>();

	const [filteredBookings, updateFilteredBookings] = useState<ApiBookingInterface[]>(bookingList);
	
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
					<KPIItemImage className='imageDiv'><IoBed size={28} /></KPIItemImage>
					<KPIItemText>
						<p>{filteredBookings.length}</p>
						<span>Bookings</span>
					</KPIItemText>
				</KPIItem>

				<KPIItem>
					<KPIItemImage className='imageDiv'><BsFillHouseFill size={28} /></KPIItemImage>
					<KPIItemText>
						<p>{scheduledRooms}%</p>
						<span>Scheduled Rooms</span>
					</KPIItemText>
				</KPIItem>

				<KPIItem>
					<KPIItemImage className='imageDiv'><MdOutlineLogin size={28} /></KPIItemImage>
					<KPIItemText>
						<p>{filteredBookings.filter((booking) => new Date(booking.check_in) > (new Date())).length}</p>
						<span>Check In</span>
					</KPIItemText>
				</KPIItem>
				
				<KPIItem>
					<KPIItemImage className='imageDiv'><MdLogout size={28} /></KPIItemImage>
					<KPIItemText>
						<p>{filteredBookings.filter((booking) => new Date(booking.check_out) < (new Date())).length}</p>
						<span>Check Out</span>
					</KPIItemText>
				</KPIItem>
			</KPIHolder>

			<InformationHolder>
				<InformationBox>
					<DatePicker type='range' onChange={(date) => { 
						if(date && date.length === 2 && date[0] && date[1])
						{
							updateStartDate(date[0]);
							updateEndDate(date[1]);
						}
					 }} />
				</InformationBox>

				<InformationBox>
					Graph
				</InformationBox>
			</InformationHolder>

			<RoomListBox>
				{
					(startDate && endDate) ? ((filteredBookings.length > 0) ?
						filteredBookings.slice(0, (3 + viewMore)).map((booking: ApiBookingInterface) => {
							return <Fragment key={booking._id}>
								<RoomListItem>
									<img src={(booking.room.type === 'Suite') ? suite : 
										(booking.room.type === 'Double Superior') ? doubleSuperior :
											(booking.room.type === 'Double Bed') ? doubleBed : singleBed
									} alt='Room Image' />
								
									<RoomListItemInformation>
										<p><NavLink to={'/booking/' + booking._id}>Room #{booking.room.number}</NavLink></p>
										<p className='customer_name'>{booking.client.name}</p>
										<p className='room_type'>{booking.room.type}</p>
									</RoomListItemInformation>
									<RoomListItemCheckInOut>
										<p>{new Date(booking.check_in).toDateString()}</p>
										<p className='check_out'>{new Date(booking.check_out).toDateString()}</p>
									</RoomListItemCheckInOut>
								</RoomListItem>
							</Fragment>
						}) : 'There are no bookings scheduled for the selected date range.')
					: 'Please select a valid date on the calendar to showcase bookings.'
				}

				{
					(endDate && startDate && (viewMore + 3) <= filteredBookings.length) ? 
					(<RoomListMore>
						<button type='button' onClick={() => {
							const increase: number = viewMore + 3;
							updateViewMore(increase);
						}}>View More</button>
					</RoomListMore>) : ''
				}
			</RoomListBox>

			<GuestComments $sidebarStatus={sidebar}></GuestComments>
		</Fragment>
	)
}