/* eslint-disable react-hooks/exhaustive-deps */
import roomImage from '../assets/room1.png';
import { useParams } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { fetchBookingById, selectCurrentBooking, selectFetchBookingsStatus } from '../redux/slices/bookings';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';
import { NullableApiBookingInterface } from '../interfaces/apiManagement';
import { useApiDispatch, useApiSelector } from '../redux/store';
import { BookingContainer } from './bookingDetailsStyle';

export default function BookingDetails()
{
	const { id } = useParams<string>();
    
    let bookingObject: NullableApiBookingInterface = useApiSelector(selectCurrentBooking);
    const fetchStatus: (string | null) = useApiSelector(selectFetchBookingsStatus);
	const dispatch = useApiDispatch();

	useEffect(() => {
		if(!bookingObject || bookingObject && bookingObject.id !== id)
		{
			dispatch(fetchBookingById(id));
		}
	}, [id]);
    return ((fetchStatus !== 'fulfilled' || !bookingObject || bookingObject && bookingObject.id !== id) ? 
		<MainComponent><CircularProgress /></MainComponent>
		:
        <Fragment>
			<BookingContainer>
				<div>
					<h1>Booking Details</h1>
					<p>#{bookingObject.id}</p>
					<p>Owner: {bookingObject.customer_name}</p>
					<p>Date: {new Date(bookingObject.date).toDateString()}</p>
					<p>Check In: {new Date(bookingObject.check_in).toDateString()}</p>
					<p>Check Out: {new Date(bookingObject.check_out).toDateString()}</p>
					<p>Room Number: {bookingObject.room_number}</p>
					<p>Room Type: {bookingObject.room_type}</p>
					<p>Status: {bookingObject.status}</p>
					<p>Notes: {bookingObject.notes}</p>
				</div>
				<div>
					<img src={roomImage} alt='Room Image' />
				</div>
			</BookingContainer>
        </Fragment>
      )
}