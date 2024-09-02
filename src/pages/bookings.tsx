/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { BasicTable, ButtonContainer, MainComponent } from '../styledcomponents/main';
import { Fragment, useEffect, useState } from 'react';
import NestedViewNotes from '../components/NestedViewNotes';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { fetchBookings, selectBookings, selectFetchBookingsStatus } from '../redux/slices/bookings';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

const BookingContainer = styled.div`
	display: flex;
	width: 100%;
`;

const BookingCategories = styled.div`
	display: flex;
	width: 60%;
	min-width: 40rem;

	p.selected {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

const BookingCategory = styled.p`
	padding: 0.1rem 1rem;
	border-bottom: 0.06rem solid #D4D4D4;

	&:hover {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

const BookingStatus = styled.td`
	p {
		background-color: #fffae1;
		font-size: 0.88rem;
		line-height: 1.56rem;
		color: #ffca3a;
		font-weight: 400;
		padding: 0.75rem 1.5rem;
		border-radius: 0.75rem;
		text-align: center;
		max-width: 17ch;
		text-transform: capitalize;
	}

	p.checking_in {
		color: #5AD07A;
		background-color: #E8FFEE;
	}

	p.checking_out {
		background-color: #FFEDEC;
		color: #E23428;
	}
`;

const BookingSearch = styled.div`
	display: flex;
	flex-direction: column;

	input {
		margin-top: 1.5rem;
		width: 30%;
		max-width: 30ch;
		padding: 0.25rem 0.75rem;
		border: 0 solid;
		border-radius: 0.25rem;

		&:focus {
			outline: none;
		}
	}`;

const BookingPageContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 0.95rem;
	width: 95%;
	margin-top: 0.75rem;
	`;

const BookingPrev = styled.div`
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

const BookingNext = styled.div`
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

export default function Bookings()
{
	const roomList = useSelector(selectBookings);
	const fetchStatus = useSelector(selectFetchBookingsStatus);
	const dispatch = useDispatch();

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
	const [page, updatePage] = useState(0);
	const navigate = useNavigate();

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

	if(dateOrder !== null)
	{
		if(dateOrder)
		{
			searchResult = searchResult.sort((a, b) => {
				if (new Date(a.date) < new Date(b.date)) {
					return -1;
				} else if (new Date(a.date) > new Date(b.date)) {
					return 1;
				} else {
					return 0;
				}
			});
		} else {
			searchResult = searchResult.sort((a, b) => {
				if (new Date(a.date) > new Date(b.date)) {
					return -1;
				} else if (new Date(a.date) < new Date(b.date)) {
					return 1;
				} else {
					return 0;
				}
			});
		}
	} 
	
	if(checkInOrder !== null) {
		if(checkInOrder)
		{
			searchResult = searchResult.sort((a, b) => {
				if (new Date(a.check_in) < new Date(b.check_in)) {
					return -1;
				} else if (new Date(a.check_in) > new Date(b.check_in)) {
					return 1;
				} else {
					return 0;
				}
			});
		} else {
			searchResult = searchResult.sort((a, b) => {
				if (new Date(a.check_in) > new Date(b.check_in)) {
					return -1;
				} else if (new Date(a.check_in) < new Date(b.check_in)) {
					return 1;
				} else {
					return 0;
				}
			});
		}
	}

	if(checkOutOrder !== null) {
		if(checkOutOrder)
		{
			searchResult = searchResult.sort((a, b) => {
				if (new Date(a.check_out) < new Date(b.check_out)) {
					return -1;
				} else if (new Date(a.check_in) > new Date(b.check_in)) {
					return 1;
				} else {
					return 0;
				}
			});
		} else {
			searchResult = searchResult.sort((a, b) => {
				if (new Date(a.check_out) > new Date(b.check_out)) {
					return -1;
				} else if (new Date(a.check_out) < new Date(b.check_out)) {
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
					searchResult.slice((page*10), ((page+1)*10)).map((booking) => {
						return <Fragment key={booking.id}>
							<tr>
								<td><NavLink to={'/booking/' + booking.id}>{booking.customer_name}</NavLink></td>
								<td>{new Date(booking.date).toDateString()}</td>
								<td>{new Date(booking.check_in).toDateString()}</td>
								<td>{new Date(booking.check_out).toDateString()}</td>
								<td>
									<NestedViewNotes content={booking.notes} />
								</td>
								<td>
									Room #{booking.room_number}<br />
									{booking.room_type}
								</td>
								<BookingStatus>
									<p className={booking.status}>
										{booking.status.replace('_', ' ')}
									</p>
								</BookingStatus>
								<td><BsThreeDotsVertical color={'#6E6E6E'} size={16} onClick={() => {
									navigate('/booking/' + booking.id + '/update');
								}} /></td>
							</tr>
						</Fragment>;
					})
				}
				</tbody>
			</BasicTable>
			
			<BookingPageContainer>
				{(page !== 0) ? <BookingPrev onClick={() => {
					const prevPage = page - 1;
					if(prevPage >= 0)
					{
						updatePage(prevPage);                    
					}
				}}><FaArrowLeft size={24} /></BookingPrev> : ''}
				{(totalPages !== page && totalPages > 1) ? <BookingNext onClick={() => {
					const nextPage = page + 1;
					if(nextPage <= totalPages)
					{
						updatePage(nextPage);                    
					}
				}}><FaArrowRight size={24} /></BookingNext> : ''}
			</BookingPageContainer>
		</Fragment>
	)
}