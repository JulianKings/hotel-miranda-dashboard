/* eslint-disable react-hooks/exhaustive-deps */
import { BasicTable, ButtonContainer, MainComponent } from '../styledcomponents/main';
import { Fragment, useEffect, useState } from 'react';
import NestedViewNotes from '../components/NestedViewNotes';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { fetchBookings, selectBookings, selectFetchBookingsStatus } from '../redux/slices/bookings';
import { CircularProgress } from '@mui/material';
import { useApiDispatch, useApiSelector } from '../redux/store';
import { NullableApiBookingInterface } from '../interfaces/apiManagement';
import { BookingCategories, BookingCategory, BookingContainer, BookingNext, BookingPageContainer, BookingPrev, BookingSearch, BookingStatus } from './bookingsStyle';

export default function Bookings()
{
	const roomList: NullableApiBookingInterface[] = useApiSelector(selectBookings);
	const fetchStatus: (string | null) = useApiSelector(selectFetchBookingsStatus);
	const dispatch = useApiDispatch();

	useEffect(() => {
		if(!fetchStatus || !roomList || fetchStatus === 'fulfilled')
		{
			dispatch(fetchBookings());
		}
	}, []);
	
	const [nameSearch, updateNameSearch] = useState<string | null>(null);
	const [basicFilter, updateBasicFilter] = useState<string | null>(null);
	
	const [dateOrder, updateDateOrder] = useState<boolean | null>(true);
	const [checkInOrder, updateCheckInOrder] = useState<boolean | null>(null);
	const [checkOutOrder, updateCheckOutOrder] = useState<boolean | null>(null);
	const [page, updatePage] = useState<number>(0);
	const navigate = useNavigate();

	let basicFiltered: NullableApiBookingInterface[] = [];
	if(basicFilter === null)
	{
		basicFiltered = [...roomList];
	} else {
		basicFiltered = roomList.filter((booking: NullableApiBookingInterface) => (booking) ? booking.status.toLowerCase() === basicFilter : false);
	}

	let searchResult: NullableApiBookingInterface[] = [];

	if(nameSearch && nameSearch !== '')
	{
		searchResult = basicFiltered.filter((booking: NullableApiBookingInterface) => {
			return ((booking) ? booking.customer_name.toLowerCase().includes(nameSearch.toLowerCase()) : false)
		})
	} else {
		searchResult = [...basicFiltered];
	}

	if(dateOrder !== null)
	{
		if(dateOrder)
		{
			searchResult = searchResult.sort((a: NullableApiBookingInterface, b: NullableApiBookingInterface) => {
				if(a && b)
				{
					if (new Date(a.date) < new Date(b.date)) {
						return -1;
					} else if (new Date(a.date) > new Date(b.date)) {
						return 1;
					} else {
						return 0;
					}
				} else {
					return -2;
				}
			});
		} else {
			searchResult = searchResult.sort((a: NullableApiBookingInterface, b: NullableApiBookingInterface) => {
				if(a && b)
				{
					if (new Date(a.date) > new Date(b.date)) {
						return -1;
					} else if (new Date(a.date) < new Date(b.date)) {
						return 1;
					} else {
						return 0;
					}
				} else {
					return -2;
				}
			});
		}
	} 
	
	if(checkInOrder !== null) {
		if(checkInOrder)
		{
			searchResult = searchResult.sort((a: NullableApiBookingInterface, b: NullableApiBookingInterface) => {
				if(a && b)
				{
					if (new Date(a.check_in) < new Date(b.check_in)) {
						return -1;
					} else if (new Date(a.check_in) > new Date(b.check_in)) {
						return 1;
					} else {
						return 0;
					}
				} else {
					return -2;
				}
			});
		} else {
			searchResult = searchResult.sort((a: NullableApiBookingInterface, b: NullableApiBookingInterface) => {
				if(a && b)
				{
					if (new Date(a.check_in) > new Date(b.check_in)) {
						return -1;
					} else if (new Date(a.check_in) < new Date(b.check_in)) {
						return 1;
					} else {
						return 0;
					}
				} else {
					return -2;
				}
			});
		}
	}

	if(checkOutOrder !== null) {
		if(checkOutOrder)
		{
			searchResult = searchResult.sort((a: NullableApiBookingInterface, b: NullableApiBookingInterface) => {
				if(a && b)
				{
					if (new Date(a.check_out) < new Date(b.check_out)) {
						return -1;
					} else if (new Date(a.check_in) > new Date(b.check_in)) {
						return 1;
					} else {
						return 0;
					}
				} else {
					return -2;
				}
			});
		} else {
			searchResult = searchResult.sort((a: NullableApiBookingInterface, b: NullableApiBookingInterface) => {
				if(a && b)
				{
					if (new Date(a.check_out) > new Date(b.check_out)) {
						return -1;
					} else if (new Date(a.check_out) < new Date(b.check_out)) {
						return 1;
					} else {
						return 0;
					}
				} else {
					return -2;
				}
			});
		}
	}
	
	const totalPages: number = Math.round(searchResult.length / 10);

    return ((fetchStatus !== 'fulfilled') ? <MainComponent><CircularProgress /></MainComponent> :
		<Fragment>
			<BookingContainer>
				<BookingCategories>
					<BookingCategory className={(basicFilter === null) ? 'selected' : ''} onClick={() => { updateBasicFilter(null) }}>All Bookings</BookingCategory>
					<BookingCategory className={(basicFilter === 'checking_in') ? 'selected' : ''} onClick={() => { updateBasicFilter('checking_in') 
						updateDateOrder(null);
						updateCheckInOrder(true);
						updateCheckOutOrder(null);
					}}>Checking In</BookingCategory>
					<BookingCategory className={(basicFilter === 'checking_out') ? 'selected' : ''} onClick={() => { updateBasicFilter('checking_out')
						updateDateOrder(null);
						updateCheckInOrder(null);
						updateCheckOutOrder(true);
					}}>Checking Out</BookingCategory>
					<BookingCategory className={(basicFilter === 'in_progress') ? 'selected' : ''} onClick={() => { updateBasicFilter('in_progress') 
						updateDateOrder(true);
						updateCheckInOrder(null);
						updateCheckOutOrder(null);
					}}>In Progress</BookingCategory>
				</BookingCategories>

				<ButtonContainer>
					<button type='button' className='alternate__button' onClick={ () => { navigate('/booking/add') }}>New Booking</button>
				</ButtonContainer>
			</BookingContainer>

			<BookingSearch>
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
					<td onClick={() => {
						updateDateOrder(!dateOrder);
						updateCheckInOrder(null);
						updateCheckOutOrder(null);
					}}>{ (dateOrder) ? 
						<Fragment>
							{'Order Date'} <span><FaChevronDown size={14} /></span>
						</Fragment> :
						<Fragment>							
							{'Order Date'} <span><FaChevronUp size={14} /></span>
						</Fragment>}</td>
					<td onClick={() => {
						updateDateOrder(null);
						updateCheckInOrder(!checkInOrder);
						updateCheckOutOrder(null);
					}}>{ (checkInOrder) ? 
						<Fragment>
							{'Check in'} <span><FaChevronDown size={14} /></span>
						</Fragment> :
						<Fragment>							
							{'Check in'} <span><FaChevronUp size={14} /></span>
						</Fragment>}</td>
					<td onClick={() => {
						updateDateOrder(null);
						updateCheckInOrder(null);
						updateCheckOutOrder(!checkOutOrder);
					}}>{ (checkOutOrder) ? 
						<Fragment>
							{'Check out'} <span><FaChevronDown size={14} /></span>
						</Fragment> :
						<Fragment>							
							{'Check out'} <span><FaChevronUp size={14} /></span>
						</Fragment>}</td>
					<td>Special Request</td>
					<td>Room Information</td>
					<td>Status</td>
					<td></td>
				</tr>
				</thead>
				<tbody>			
				{
					searchResult.slice((page*10), ((page+1)*10)).map((booking: NullableApiBookingInterface) => {
						return (booking) ? <Fragment key={booking._id}>
							<tr>
								<td><NavLink to={'/booking/' + booking._id}>{booking.customer_name}</NavLink></td>
								<td>{new Date(booking.date).toDateString()}</td>
								<td>{new Date(booking.check_in).toDateString()}</td>
								<td>{new Date(booking.check_out).toDateString()}</td>
								<td>
									<NestedViewNotes content={booking.notes} />
								</td>
								<td>
									Room #{booking.room.number}<br />
									{booking.room.type}
								</td>
								<BookingStatus>
									<p className={booking.status}>
										{booking.status.replace('_', ' ')}
									</p>
								</BookingStatus>
								<td><BsThreeDotsVertical color={'#6E6E6E'} size={16} onClick={() => {
									navigate('/booking/' + booking._id + '/update');
								}} /></td>
							</tr>
						</Fragment> : <Fragment></Fragment>;
					})
				}
				</tbody>
			</BasicTable>
			
			<BookingPageContainer>
				{(page !== 0) ? <BookingPrev onClick={() => {
					const prevPage: number = page - 1;
					if(prevPage >= 0)
					{
						updatePage(prevPage);                    
					}
				}}><FaArrowLeft size={24} /></BookingPrev> : ''}
				{(totalPages !== page && totalPages > 1) ? <BookingNext onClick={() => {
					const nextPage: number = page + 1;
					if(nextPage <= totalPages)
					{
						updatePage(nextPage);                    
					}
				}}><FaArrowRight size={24} /></BookingNext> : ''}
			</BookingPageContainer>
		</Fragment>
	)
}