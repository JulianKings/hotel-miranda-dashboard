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

interface ErrorPropTypes {
    showError: boolean;
}

const FormButton = styled.button`
    border-radius: 0.19rem;
    border: 0.13rem solid #135846;
    background: #135846;
    color: white;
    margin: 0.45rem 0;
    padding: 0.25rem 1rem;
    width: 40%;
    max-width: 30ch;`

const DeleteButton = styled.button`
    border-radius: 0.19rem;
    border: 0.13rem solid #df0000;
    background: #df0000;
    color: white;
    margin: 0.75rem 0;
    padding: 0.25rem 1rem;
    width: 40%;
    max-width: 30ch;`

const FormInput = styled.input.attrs({
        type: "text",
    })<ErrorPropTypes>`
    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.25rem;
    width: 40%;
    max-width: 30ch;
    border: ${props => props.showError ? '0.16rem solid #df0000' : '0rem solid'};

    &:focus {
        outline: none;
    }
`;

const DateInput = styled.input.attrs({
    type: "date",
})<ErrorPropTypes>`
    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.25rem;
    width: 40%;
    max-width: 30ch;
    border: ${props => props.showError ? '0.16rem solid #df0000' : '0rem solid'};

    &:focus {
        outline: none;
    }
`;

const TelInput = styled.input.attrs({
    type: "tel",
})<ErrorPropTypes>`
    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.25rem;
    width: 40%;
    max-width: 30ch;
    border: ${props => props.showError ? '0.16rem solid #df0000' : '0rem solid'};

    &:focus {
        outline: none;
    }
`;

const MailInput = styled.input.attrs({
    type: "mail",
})<ErrorPropTypes>`
    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.25rem;
    width: 40%;
    max-width: 30ch;
    border: ${props => props.showError ? '0.16rem solid #df0000' : '0rem solid'};

    &:focus {
        outline: none;
    }
`;

const PasswordInput = styled.input.attrs({
    type: "password",
})<ErrorPropTypes>`
    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.25rem;
    width: 40%;
    max-width: 30ch;
    border: ${props => props.showError ? '0.16rem solid #df0000' : '0rem solid'};

    &:focus {
        outline: none;
    }
`;

const FormSelect = styled.select<ErrorPropTypes>`
    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.25rem;
    width: 40%;
    max-width: 30ch;
    border: ${props => props.showError ? '0.16rem solid #df0000' : '0rem solid'};

    &:focus {
        outline: none;
    }
`;

const FormError = styled.div`
    display: block;
    white-space: pre-line;
    background-color: #df0000;
    color: white;
    margin: 0 0.3rem;
    padding: 0.4rem 0.4rem;
    font-size: 0.8rem;
    line-height: 1.1rem;
    border-radius: 0.25rem;
    margin-bottom: 0.25rem;
    width: 40%;
    max-width: 30ch;
`

const FormBox = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    justify-content: center;
    align-items: center;
`;

interface PropTypes {
    editMode: boolean;
}

export default function UserForm({editMode = false}: PropTypes)
{
    const [inputList, addInputList] = useMultiRef<HTMLInputElement>();
    const [selectList, addSelectList] = useMultiRef<HTMLSelectElement>();
    const [textAreaList, addTextAreaList] = useMultiRef<HTMLTextAreaElement>();
    const [inputError, setInputError] = useState<string | null>(null);
    const [inputErrorId, setInputErrorId] = useState<string | null>(null);
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
		if(editMode && !dataObject || editMode && dataObject && dataObject.id !== id)
		{
			dispatcher(fetchUserById(id));
		}
	}, [id]);

    return (editMode && fetchStatus !== 'fulfilled') ? 
    <MainComponent><CircularProgress /></MainComponent>
    :
    <Fragment>
        <FormBox method='post' onSubmit={(event) => { executeForm(event) }}>
            {(inputError) ? <Fragment>
                <FormError>
                    {inputError}
                </FormError>
            </Fragment> : ''}
            
            <label htmlFor='username'>User name</label>
            <FormInput id='username' defaultValue={(dataObject) ? dataObject.name : ''} 
						key={0} ref={addInputList(0)}
						showError={(inputErrorId === 'username')} 
						onBlur={(event) => validateField(event)}  />

            <label htmlFor='userfirstname'>First name</label>
            <FormInput id='userfirstname' defaultValue={(dataObject) ? dataObject.full_name.split(' ')[0] : ''} 
						key={1} ref={addInputList(1)}
						showError={(inputErrorId === 'userfirstname')} 
						onBlur={(event) => validateField(event)}  />

            <label htmlFor='userlastname'>Last name</label>
            <FormInput id='userlastname' defaultValue={(dataObject) ? dataObject.full_name.split(' ')[1] : ''}
                        key={2} ref={addInputList(2)}
						showError={(inputErrorId === 'userlastname')} 
						onBlur={(event) => validateField(event)}  />

            <label htmlFor='password'>Password</label>
            <PasswordInput id='password' 
						key={3} ref={addInputList(3)}
						showError={(inputErrorId === 'password')} 
						onBlur={(event) => validateField(event)}  />

            <label htmlFor='userjob'>User Job</label>
            <FormSelect id='userjob' key={4} ref={addSelectList(4)} 
						showError={(inputErrorId === 'userjob')} >
                {(dataObject && dataObject.position === 'manager') ? 
                    <Fragment><option value='manager' selected>Manager</option></Fragment> : 
                    <Fragment><option value='manager'>Manager</option></Fragment>
                }
                {(dataObject && dataObject.position === 'room_service') ? 
                    <Fragment><option value='room_service' selected>Room Service</option></Fragment> : 
                    <Fragment><option value='room_service'>Room Service</option></Fragment>
                }
                {(dataObject && dataObject.position === 'reception') ? 
                    <Fragment><option value='reception' selected>Reception</option></Fragment> : 
                    <Fragment><option value='reception'>Reception</option></Fragment>
                }
            </FormSelect>

            <label htmlFor='usermail'>User mail</label>
            <MailInput id='usermail' 
						key={5} ref={addInputList(5)} defaultValue={(dataObject) ? dataObject.mail : ''}
						showError={(inputErrorId === 'usermail')} 
						onBlur={(event) => validateField(event)}  />

            <label htmlFor='userphone'>User phone</label>
            <TelInput id='userphone' 
						key={6} ref={addInputList(6)} defaultValue={(dataObject) ? dataObject.contact : ''}
						showError={(inputErrorId === 'userphone')} 
						onBlur={(event) => validateField(event)}  />

            <label htmlFor='userdate'>Start Date</label>
            <DateInput id='userdate' defaultValue={(dataObject) ? (new Date(dataObject.start).toISOString().split('T')[0]) : ''}
						key={7} ref={addInputList(7)}
						showError={(inputErrorId === 'userdate')} 
						onBlur={(event) => validateField(event)}  />

            <label htmlFor='userstatus'>User Status</label>
            <FormSelect key={8} ref={addSelectList(8)} id='userstatus' 
						showError={(inputErrorId === 'userstatus')} >
                {(dataObject && dataObject.status === 'active') ? 
                    <Fragment><option value='active' selected>Active</option></Fragment> : 
                    <Fragment><option value='active'>Active</option></Fragment>
                }
                {(dataObject && dataObject.status === 'inactive') ? 
                    <Fragment><option value='inactive' selected>Inactive</option></Fragment> : 
                    <Fragment><option value='inactive'>Inactive</option></Fragment>
                }
            </FormSelect>

            <label htmlFor='userpicture'>User picture</label>
            <FormInput id='userpicture' 
						key={9} ref={addInputList(9)} defaultValue={(dataObject) ? dataObject.profile_picture : ''}
						showError={(inputErrorId === 'userpicture')} 
						onBlur={(event) => validateField(event)}  />


            <label htmlFor='userdetails'>Job details</label>
            <textarea key={10} ref={addTextAreaList(10)} id='userdetails' cols={46} rows={6}>{(dataObject) ? dataObject.description : ''}</textarea>
            <FormButton>{(editMode) ? 'Update Employee' : 'Add new Employee'}</FormButton>
            {(editMode) ? <Fragment>
                <DeleteButton type='button'
                    onClick={() => {
                        if(dataObject)
                        {
                            navigate('/user/' + dataObject.id + '/delete');
                        }
                    }}>Delete user</DeleteButton>
            </Fragment> : ''}
        </FormBox>
    </Fragment>

    function validateField(event: FocusEvent<HTMLInputElement>): void
    {
        if(event.target)
        {
            setInputErrorId(null);
            setInputError(null);
        }
    }

    function validInput(inputs: (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[], inputObject: any, updatedPassword: boolean): boolean {
        let error = false;

        inputs.forEach((input: (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)) => {
            const value = input.value;
            if(value.length < 3 && input.id !== 'password')
            {                    
                setInputError('Please fill every field before trying to update.');
                setInputErrorId(input.id);
                error = true;
                return;
            } else {
                inputObject[input.id] = input.value;
            }

            if(input.id === 'password' && value.length > 0)
            {
                updatedPassword = true;
            } else if(input.id === 'password' && value.length === 0) {
                updatedPassword = false;
            }
        })

        return error;
    }

    function executeForm(event: React.SyntheticEvent): void
    {
        event.preventDefault();

        const inputObject: any = {};
        let updatedPassword = (dataObject !== null);
        const inputs = validInput(inputList.current, inputObject, updatedPassword);
        const selects = validInput(selectList.current, inputObject, updatedPassword);
        const textareas = validInput(textAreaList.current, inputObject, updatedPassword);

        let error = (inputs && selects && textareas);
        
        if(!error)
        {
            hash(inputObject.password, 10).then(function(hashedPassword: string) {
                if(!editMode)
                {
                    const updatedObject: ApiUserInterface = {
                        id: getRandomInt(10) + "ebb1d15-d047-" + getRandomInt(10500) + "-85c9-63c3ed856afb-" + getRandomInt(25000),
                        name: inputObject.username,
                        full_name: inputObject.userfirstname + " " + inputObject.userlastname,
                        password: (updatedPassword) ? hashedPassword : '',
                        mail: inputObject.usermail,
                        profile_picture: inputObject.userpicture,
                        start: (new Date(Date.parse(inputObject.userdate))),
                        description: inputObject.userdetails,
                        contact: inputObject.userphone,
                        status: inputObject.userstatus,
                        position: inputObject.userjob
                    }
    
                    dispatcher(postUser(updatedObject));
                    navigate('/users');
                } else {
                    const updatedObject: ApiUserInterface = {
                        id: ""+(id),
                        name: inputObject.username,
                        full_name: inputObject.userfirstname + " " + inputObject.userlastname,
                        password: (updatedPassword) ? hashedPassword : '',
                        mail: inputObject.usermail,
                        profile_picture: inputObject.userpicture,
                        start: (new Date(Date.parse(inputObject.userdate))),
                        description: inputObject.userdetails,
                        contact: inputObject.userphone,
                        status: inputObject.userstatus,
                        position: inputObject.userjob
                    }

                    if(userObject && id === userObject.id)
                    {
                        dispatch({ type: SessionActionTypes.UPDATE_CONTENT})
                    }
    
                    dispatcher(putUser(updatedObject));
                    navigate('/users');
                }
            });
        }
    }
}