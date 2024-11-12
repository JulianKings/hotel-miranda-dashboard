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

	const labelClass = 'label ' + bookingObject?.status;

	useEffect(() => {
		if(!bookingObject || bookingObject && bookingObject._id !== id)
		{
			dispatch(fetchBookingById(id));
		}
	}, [id]);
    return ((fetchStatus !== 'fulfilled' || !bookingObject || bookingObject && bookingObject._id !== id) ? 
		<MainComponent><CircularProgress /></MainComponent>
		:
        <Fragment>
			<BookingContainer>
				<div className='booking__details'>
					<h2>Booking Details</h2>
					<div className='booking__details__extra'>
					<p><strong>ID</strong> <br /> #{bookingObject._id}</p>
					<p><strong>Client</strong> <br /> {bookingObject.client.name}</p>
					</div>
					<p><strong>Creation Date</strong> <br /> {new Date(bookingObject.date).toDateString()}</p>
					<div className='booking__details__extra'>
						<p><strong>Check In</strong> <br /> {new Date(bookingObject.check_in).toDateString()}</p>
						<p><strong>Check Out</strong> <br /> {new Date(bookingObject.check_out).toDateString()}</p>
					</div>
					<hr />
					<p><strong>Room Number</strong> <br /> {bookingObject.room.number}</p>
					<p><strong>Room Type:</strong> <br /> {bookingObject.room.type}</p>
					<p><strong>Notes</strong> <br /> {bookingObject.notes}</p>
				</div>
				<div className='room__image'>
					<p className={labelClass}>{bookingObject.status.replaceAll('_', ' ')}</p>
					<img src={roomImage} alt='Room Image' />
				</div>
			</BookingContainer>
        </Fragment>
      )
}