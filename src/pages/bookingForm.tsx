/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBookingById, postBooking, putBooking, selectCurrentBooking, selectFetchBookingsStatus } from '../redux/slices/bookings';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';
import { ApiClientInterface, ApiPostBookingInterface, ApiRoomInterface, NullableApiBookingInterface } from '../interfaces/apiManagement';
import { useApiDispatch, useApiSelector } from '../redux/store';
import { EditFormPropTypes } from '../interfaces/componentProps';
import { FormSchema, SelectFormSchema, SelectFormSchemaOption } from '../interfaces/formManagement';
import { FormModule } from '../components/FormModuleComponent';
import { fetchRooms, selectRooms } from '../redux/slices/room';
import { fetchClients, selectClients } from '../redux/slices/client';

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

const statusSchema: SelectFormSchema = {
    id: 'status',
    type: 'select',
    options: [
        { name: 'Checking In', value: 'checking_in'},
        { name: 'Checking Out', value: 'checking_out'},
        { name: 'In Progress', value: 'in_progress'}
    ]
}

const bookingFormSchema: FormSchema[] = [creationDateSchema, checkInDateSchema, checkOutDateSchema, notesSchema, statusSchema];

export default function BookingForm({editMode = false}: EditFormPropTypes)
{
    const navigate = useNavigate();

    const { id } = useParams<string>();

    const roomList: ApiRoomInterface[] = useApiSelector(selectRooms);
    if(roomList.length > 0)
    {
        const translatedRooms: SelectFormSchemaOption[] = roomList.map((room: ApiRoomInterface): SelectFormSchemaOption => {
            return { name: '#' + room._id + ', Room ' + room.number + ', ' + room.type, value: room._id as string };
        });

        const roomListSchema: SelectFormSchema = {
            id: 'room',
            type: 'select',
            options: translatedRooms
        }
        
        if(bookingFormSchema.find((schema) => schema.id === 'room') === undefined)
        {
            bookingFormSchema.push(roomListSchema);
        }
    }

    const clientList: ApiClientInterface[] = useApiSelector(selectClients);
    if(clientList.length > 0)
    {
        const translatedClients: SelectFormSchemaOption[] = clientList.map((client: ApiClientInterface): SelectFormSchemaOption => {
            return { name: '#' + client._id + ', ' + client.name, value: client._id as string };
        });

        const clientListSchema: SelectFormSchema = {
            id: 'client',
            type: 'select',
            options: translatedClients
        }
        
        if(bookingFormSchema.find((schema) => schema.id === 'client') === undefined)
        {
            bookingFormSchema.push(clientListSchema);
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

        if(editMode && !clientList || editMode && clientList.length === 0)
            {
                dispatch(fetchClients());
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
        bookingObj.client_id = +(bookingObj.client as string);
        bookingObj.room_id = +(bookingObj.room as string);

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