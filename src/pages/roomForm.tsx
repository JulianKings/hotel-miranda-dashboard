/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRoomById, postRoom, putRoom, selectCurrentRoom, selectFetchRoomStatus } from '../redux/slices/room';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';
import { useMultiRef } from '@upstatement/react-hooks';
import { ApiAmenitiesInterface, ApiRoomInterface, NullableApiRoomInterface } from '../interfaces/apiManagement';
import { useApiDispatch, useApiSelector } from '../redux/store';
import { FormModule } from '../components/FormModuleComponent';
import { EditFormPropTypes } from '../interfaces/componentProps';
import { CheckboxFormSchema, FormSchema, SelectFormSchema } from '../interfaces/formManagement';
import { selectAmenities } from '../redux/slices/amenities';

const typeSchema: SelectFormSchema = {
    id: 'type',
    type: 'select',
    options: [
        { name: 'Single Bed', value: 'Single Bed'},
        { name: 'Double Bed', value: 'Double Bed'},
        { name: 'Double Superior', value: 'Double Superior'},
        { name: 'Suite', value: 'Suite'}
    ]
}

const statusSchema: SelectFormSchema = {
    id: 'status',
    type: 'select',
    options: [
        { name: 'Booked', value: 'booked'},
        { name: 'On Maintenance', value: 'maintenance'},
        { name: 'Available', value: 'available'}
    ]
}

const descriptionSchema: FormSchema = {
    id: 'description',
    type: 'textarea'
}

    

const roomFormSchema: FormSchema[] = [typeSchema, statusSchema, descriptionSchema]

export default function RoomForm({editMode = false}: EditFormPropTypes)
{
    const navigate = useNavigate();

    const { id } = useParams<string>();

    const amenities: ApiAmenitiesInterface[] = useApiSelector(selectAmenities);
    if(amenities.length > 0)
    {
        const amenitiesSchema: CheckboxFormSchema = {
            id: 'amenities',
            type: 'checkbox',
            options: amenities
        }
        
        if(roomFormSchema.find((schema) => schema.id === 'amenities') === undefined)
        {
            roomFormSchema.push(amenitiesSchema);
        }
    }
    
    let roomObject: NullableApiRoomInterface = useApiSelector(selectCurrentRoom);
    if(editMode === false)
    {
        roomObject = null;
    }
	const fetchStatus: (string | null) = useApiSelector(selectFetchRoomStatus);
	const dispatch = useApiDispatch();

	useEffect(() => {
		if(editMode)
        {
            if(!roomObject || roomObject && roomObject._id !== id || fetchStatus === 'fulfilled')
            {
                dispatch(fetchRoomById(id));
            }
        }
	}, [id]);

    return (editMode && fetchStatus !== 'fulfilled') ? 
    <MainComponent><CircularProgress /></MainComponent>
    :
    <Fragment>
        <FormModule formType='room' editMode={editMode} formDataObject={roomObject}
            formDataSchema={roomFormSchema} onFormSubmit={sendForm}>
        </FormModule>
    </Fragment>

    function sendForm(roomObj: ApiRoomInterface): void
    {
        if(!editMode)
        {
            dispatch(postRoom(roomObj));
            navigate('/rooms');
        } else {
            dispatch(putRoom(roomObj));
            navigate('/rooms');
        }
    }

}