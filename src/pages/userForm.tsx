/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FocusEvent, Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserById, postUser, putUser, selectCurrentUser, selectFetchUserStatus } from '../redux/slices/user';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';
import getRandomInt from '../util/util';
import { SessionContext } from '../logic/sessionManagement';
import { useMultiRef } from '@upstatement/react-hooks';
import { hash } from 'bcrypt-ts';
import { ApiUserInterface, NullableApiUserInterface } from '../interfaces/apiManagement';
import { SessionActionTypes } from '../interfaces/sessionManagement';
import { useApiDispatch, useApiSelector } from '../redux/store';
import { EditFormPropTypes } from '../interfaces/componentProps';
import { FormModule } from '../components/FormModuleComponent';
import { FormSchema, SelectFormSchema } from '../interfaces/formManagement';

const statusSchema: SelectFormSchema = {
    id: 'status',
    type: 'select',
    options: [
        { name: 'Active', value: 'active'},
        { name: 'Inactive', value: 'inactive'}
    ]
}

const positionSchema: SelectFormSchema = {
    id: 'position',
    type: 'select',
    options: [
        { name: 'Manager', value: 'manager'},
        { name: 'Room service', value: 'room_service'},
        { name: 'Reception', value: 'reception'}
    ]
}

const mailSchema: FormSchema = {
    id: 'mail',
    type: 'mail'
}

const passwordSchema: FormSchema = {
    id: 'password',
    type: 'password'
}

const phoneSchema: FormSchema = {
    id: 'contact',
    type: 'tel'
}

const startDateSchema: FormSchema = {
    id: 'start',
    type: 'date'
}

const descriptionSchema: FormSchema = {
    id: 'description',
    type: 'textarea'
}

const userFormSchema: FormSchema[] = [statusSchema, positionSchema, descriptionSchema, 
    mailSchema, passwordSchema, phoneSchema, startDateSchema]

export default function UserForm({editMode = false}: EditFormPropTypes)
{
    const navigate = useNavigate();
    const {userObject, dispatch} = useContext(SessionContext);

    const { id } = useParams();
    
    let dataObject: NullableApiUserInterface = useApiSelector(selectCurrentUser);
    if(!editMode)
    {
        dataObject = null;
    }
	const fetchStatus: (string | null) = useApiSelector(selectFetchUserStatus);
	const dispatcher = useApiDispatch();

	useEffect(() => {
		if(editMode && !dataObject || editMode && dataObject && dataObject._id !== id || editMode && fetchStatus === 'fulfilled')
		{
			dispatcher(fetchUserById(id));
		}
	}, [id]);

    return (editMode && fetchStatus !== 'fulfilled') ? 
    <MainComponent><CircularProgress /></MainComponent>
    :
    <Fragment>
        <FormModule formType='user' editMode={editMode} formDataObject={dataObject}
            formDataSchema={userFormSchema} onFormSubmit={sendForm}>
        </FormModule>
    </Fragment>

    function sendForm(userObj: ApiUserInterface): void
    {
        let updatedPassword = (userObj.password !== '') ? true : false;

        hash(userObj.password, 10).then(function(hashedPassword: string) {
            if(!editMode)
            {
                const updatedObject: ApiUserInterface = {
                    ...userObj,
                    password: (updatedPassword) ? hashedPassword : ''
                }

                dispatcher(postUser(updatedObject));
                navigate('/users');
            } else {
                const updatedObject: ApiUserInterface = {
                    ...userObj,
                    password: (updatedPassword) ? hashedPassword : ''
                }

                if(userObject && userObject.userObj && id === userObject.userObj._id)
                {
                    dispatch({ type: SessionActionTypes.UPDATE_CONTENT})
                }

                dispatcher(putUser(updatedObject));
                navigate('/users');
            }
        });
    }
}