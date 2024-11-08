/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonContainer, MainComponent } from '../styledcomponents/main';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBookings, selectBookings, selectFetchBookingsStatus } from '../redux/slices/bookings';
import { CircularProgress } from '@mui/material';
import { useApiDispatch, useApiSelector } from '../redux/store';
import { ApiAbstractInterface, NullableApiBookingInterface } from '../interfaces/apiManagement';
import { BookingCategories, BookingCategory, BookingContainer, BookingSearch } from './bookingsStyle';
import { TableModule } from '../components/TableModuleComponent';
import { Sortable, TableSchema } from '../interfaces/tableManagement';

const bookingTableSchema: TableSchema[] = [
	{id: 'client', type: 'booking_client', name: 'Guest', sortable: false},
	{id: 'date', type: 'date', name: 'Order Date', sortable: true},
	{id: 'check_in', type: 'date', name: 'Check in', sortable: true},
	{id: 'check_out', type: 'date', name: 'Check out', sortable: true},
	{id: 'notes', type: 'view_notes', name: 'Special Request', sortable: false},
	{id: 'room', type: 'booking_room', name: 'Room Information', sortable: false},
	{id: 'status', type: 'booking_status', name: 'Status', sortable: false},
	{id: 'actions', type: 'actions', name: '', sortable: false}
];

export default function Bookings()
{
	const bookingList: NullableApiBookingInterface[] = useApiSelector(selectBookings);
	const fetchStatus: (string | null) = useApiSelector(selectFetchBookingsStatus);
	const dispatch = useApiDispatch();

	useEffect(() => {
		if(!fetchStatus || !bookingList || fetchStatus === 'fulfilled')
		{
			dispatch(fetchBookings());
		}
	}, []);

	const [currentSortFilter, updateSortFilter] = useState<Sortable>({id: 'date', type: 'asc', mode: 'date'});
	
	const [nameSearch, updateNameSearch] = useState<string | null>(null);
	const [basicFilter, updateBasicFilter] = useState<string | null>(null);
	
	const navigate = useNavigate();

	const searchResult: NullableApiBookingInterface[] = bookingList.filter((booking: NullableApiBookingInterface) => {
		let valid = true;

		if(basicFilter && booking)
		{
			valid = (booking.status.toLowerCase() === basicFilter);
		}
		
		if(nameSearch && nameSearch !== '' && booking)
		{
			valid = valid && booking.client.name.toLowerCase().includes(nameSearch.toLowerCase());
		}
		
		return valid;
	});

    return ((fetchStatus !== 'fulfilled') ? <MainComponent><CircularProgress /></MainComponent> :
		<Fragment>
			<BookingContainer>
				<BookingCategories>
					<BookingCategory className={(basicFilter === null) ? 'selected' : ''} onClick={() => { updateBasicFilter(null) }}>
						All Bookings</BookingCategory>
					<BookingCategory className={(basicFilter === 'checking_in') ? 'selected' : ''} onClick={() => { updateBasicFilter('checking_in'); updateSortFilterAction('check_in');}}>
						Checking In</BookingCategory>
					<BookingCategory className={(basicFilter === 'checking_out') ? 'selected' : ''} onClick={() => { updateBasicFilter('checking_out'); updateSortFilterAction('check_out')}}>
						Checking Out</BookingCategory>
					<BookingCategory className={(basicFilter === 'in_progress') ? 'selected' : ''} onClick={() => { updateBasicFilter('in_progress'); updateSortFilterAction('date')}}>
						In Progress</BookingCategory>
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

			<TableModule tableType='booking' tableDataSchema={bookingTableSchema} tableContent={searchResult as ApiAbstractInterface[]} updateSortFilter={updateSortFilterAction} currentSortFilter={currentSortFilter} />
		</Fragment>
	)

	function updateSortFilterAction(id: string): void
	{
		const sortMode = (id.includes('date') || id.includes('check_in') || id.includes('check_out')) ? 'date' : 'number';
		if(currentSortFilter.id === id)
		{
			updateSortFilter({id: id, type: (currentSortFilter.type === 'asc') ? 'desc' : 'asc', mode: sortMode});
		} else {
			updateSortFilter({id: id, type: 'asc', mode: sortMode});
		}
	}
}