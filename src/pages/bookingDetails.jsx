/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import roomImage from '../assets/room1.png';
import { useParams } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { fetchBookingById, selectCurrentBooking, selectFetchBookingsStatus } from '../redux/slices/bookingsSlice';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const BookingContainer = styled.div`
  	display: grid;
	grid-template-columns: 50% 50%;

	img {
		width: 100%;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
`;

export default function BookingDetails()
{
	const { id } = useParams();
    
    let bookingObject = useSelector(selectCurrentBooking);
    const fetchStatus = useSelector(selectFetchBookingsStatus);
	const dispatch = useDispatch();

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