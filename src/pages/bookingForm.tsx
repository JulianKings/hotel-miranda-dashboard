/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBookingById, postBooking, putBooking, selectCurrentBooking, selectFetchBookingsStatus } from '../redux/slices/bookings';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';
import { ApiPostBookingInterface, ApiRoomInterface, NullableApiBookingInterface } from '../interfaces/apiManagement';
import { useApiDispatch, useApiSelector } from '../redux/store';
import { EditFormPropTypes } from '../interfaces/componentProps';
import { FormSchema, SelectFormSchema, SelectFormSchemaOption } from '../interfaces/formManagement';
import { FormModule } from '../components/FormModuleComponent';
import { fetchRooms, selectRooms } from '../redux/slices/room';

const creationDateSchema: FormSchema = {
    id: 'date',
    type: 'date'
}

const checkInDateSchema: FormSchema = {
    id: 'check_in',
    type: 'date'
}

const checkOutDateSchema: FormSchema = {
    id: 'check_out',
    type: 'date'
}

const notesSchema: FormSchema = {
    id: 'notes',
    type: 'textarea'
}

const bookingFormSchema: FormSchema[] = [creationDateSchema, checkInDateSchema, checkOutDateSchema, notesSchema];

export default function BookingForm({editMode = false}: EditFormPropTypes)
{
    const navigate = useNavigate();

    const { id } = useParams<string>();

    const roomList: ApiRoomInterface[] = useApiSelector(selectRooms);
    if(roomList.length > 0)
    {
        const translatedRooms: SelectFormSchemaOption[] = roomList.map((room: ApiRoomInterface): SelectFormSchemaOption => {
            return { name: '#' + room.number + ', Room ' + room.type, value: room._id as string };
        });

        const amenitiesSchema: SelectFormSchema = {
            id: 'room',
            type: 'select',
            options: translatedRooms
        }
        
        if(bookingFormSchema.find((schema) => schema.id === 'amenities') === undefined)
        {
            bookingFormSchema.push(amenitiesSchema);
        }
    }
    
    let bookingObject: NullableApiBookingInterface = useApiSelector(selectCurrentBooking);
    if(!editMode)
    {
        bookingObject = null;
    }
	const fetchStatus: (string | null) = useApiSelector(selectFetchBookingsStatus);
	const dispatch = useApiDispatch();

	useEffect(() => {
        if(editMode && !bookingObject || editMode && bookingObject && bookingObject._id !== id || editMode && fetchStatus === 'fulfilled')
		{
			dispatch(fetchBookingById(id));
		}

        if(editMode && !roomList || editMode && roomList.length === 0)
        {
            dispatch(fetchRooms());
        }
	}, [id]);

    return (editMode && fetchStatus !== 'fulfilled') ? 
    <MainComponent><CircularProgress /></MainComponent>
    :
    <Fragment>
        <FormModule formType='booking' editMode={editMode} formDataObject={bookingObject}
            formDataSchema={bookingFormSchema} onFormSubmit={sendForm}>
        </FormModule>
    </Fragment>

    function sendForm(bookingObj: ApiPostBookingInterface): void
    {
        if(!editMode)
        {
            dispatch(postBooking(bookingObj));
            navigate('/bookings');
        } else {
            dispatch(putBooking(bookingObj));
            navigate('/bookings');
        }
    }
}