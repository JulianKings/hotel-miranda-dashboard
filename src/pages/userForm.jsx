/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useMultiRefs from '../util/multiRef';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserById, postUser, putUser, selectCurrentUser, selectFetchUserStatus } from '../redux/slices/userSlice';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import getRandomInt from '../util/util';
import bcrypt from 'bcryptjs/dist/bcrypt';

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
    })`
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
})`
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
})`
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
})`
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
})`
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

const FormSelect = styled.select`
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

export default function UserForm({editMode = false})
{
    const navigate = useNavigate();
    const [inputList, addInputList] = useMultiRefs();
    const [inputError, setInputError] = useState(null);
    const [inputErrorId, setInputErrorId] = useState(null);

    const { id } = useParams();
    
    let dataObject = useSelector(selectCurrentUser);
    if(!editMode)
    {
        dataObject = null;
    }
	const fetchStatus = useSelector(selectFetchUserStatus);
	const dispatcher = useDispatch();

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
        <FormBox method='post' onSubmit={(event) => { executeForm(event, dataObject) }}>
            {(inputError) ? <Fragment>
                <FormError>
                    {inputError}
                </FormError>
            </Fragment> : ''}
            
            <label htmlFor='username'>User name</label>
            <FormInput id='username' defaultValue={(dataObject) ? dataObject.name : ''} 
						ref={addInputList}
						showError={(inputErrorId === 'username')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='userfirstname'>First name</label>
            <FormInput id='userfirstname' defaultValue={(dataObject) ? dataObject.full_name.split(' ')[0] : ''} 
						ref={addInputList}
						showError={(inputErrorId === 'userfirstname')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='userlastname'>Last name</label>
            <FormInput id='userlastname' defaultValue={(dataObject) ? dataObject.full_name.split(' ')[1] : ''}
                        ref={addInputList}
						showError={(inputErrorId === 'userlastname')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='password'>Password</label>
            <PasswordInput id='password' 
						ref={addInputList}
						showError={(inputErrorId === 'password')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='userjob'>User Job</label>
            <FormSelect id='userjob' ref={addInputList}>
                {(dataObject && dataObject.position === 'manager') ? 
                    <Fragment><option value='manager' selected>Manager</option></Fragment> : 
                    <Fragment><option value='manager'>Manager</option></Fragment>
                }
                {(dataObject && dataObject.position === 'manager') ? 
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
						ref={addInputList} defaultValue={(dataObject) ? dataObject.mail : ''}
						showError={(inputErrorId === 'usermail')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='userphone'>User phone</label>
            <TelInput id='userphone' 
						ref={addInputList} defaultValue={(dataObject) ? dataObject.contact : ''}
						showError={(inputErrorId === 'userphone')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='userdate'>Start Date</label>
            <DateInput id='userdate' defaultValue={(dataObject) ? (new Date(dataObject.start).toISOString().split('T')[0]) : ''}
						ref={addInputList}
						showError={(inputErrorId === 'userdate')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='userstatus'>User Status</label>
            <FormSelect ref={addInputList} id='userstatus'>
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
						ref={addInputList} defaultValue={(dataObject) ? dataObject.profile_picture : ''}
						showError={(inputErrorId === 'userpicture')} 
						onBlur={(event) => validateField(event.target)}  />


            <label htmlFor='userdetails'>Job details</label>
            <textarea ref={addInputList} id='userdetails' cols={46} rows={6}>{(dataObject) ? dataObject.description : ''}</textarea>
            <FormButton>{(editMode) ? 'Update Employee' : 'Add new Employee'}</FormButton>
            {(editMode) ? <Fragment>
                <DeleteButton type='button'
                    onClick={() => {
                        navigate('/user/' + dataObject.id + '/delete');
                    }}>Delete room</DeleteButton>
            </Fragment> : ''}
        </FormBox>
    </Fragment>

    function validateField(target)
    {
        if(target)
        {
            setInputErrorId(null);
            setInputError(null);
        }
    }

    async function executeForm(event, dataObject)
    {
        event.preventDefault();

        const inputs = inputList();
        const inputUser = {};
        let error = false;
        let updatedPassword = (dataObject !== null);

        inputs.forEach((input) => {
            const value = input.value;
            if(value.length < 3 && input.id !== 'password')
            {                    
                setInputError('Please fill every field before trying to update.');
                setInputErrorId(input.id);
                error = true;
                return;
            } else {
                inputUser[input.id] = input.value;
            }

            if(input.id === 'password' && value.length > 0)
            {
                updatedPassword = true;
            }
        })

        if(!error)
        {
            bcrypt.hash(inputUser.password, 10).then(function(hashedPassword) {
                if(!editMode)
                {
                    const updatedObject = {
                        id: getRandomInt(10) + "ebb1d15-d047-" + getRandomInt(10500) + "-85c9-63c3ed856afb-" + getRandomInt(25000),
                        name: inputUser.username,
                        full_name: inputUser.userfirstname + " " + inputUser.userlastname,
                        password: (updatedPassword) ? hashedPassword : '',
                        mail: inputUser.usermail,
                        profile_picture: inputUser.userpicture,
                        start: (new Date(Date.parse(inputUser.userdate))),
                        description: inputUser.userdetails,
                        contact: inputUser.userphone,
                        status: inputUser.userstatus,
                        position: inputUser.userjob
                    }
    
                    dispatcher(postUser(updatedObject));
                    navigate('/users');
                } else {
                    const updatedObject = {
                        id: id,
                        name: inputUser.username,
                        full_name: inputUser.userfirstname + " " + inputUser.userlastname,
                        password: (updatedPassword) ? hashedPassword : dataObject.password,
                        mail: inputUser.usermail,
                        profile_picture: inputUser.userpicture,
                        start: (new Date(Date.parse(inputUser.userdate))),
                        description: inputUser.userdetails,
                        contact: inputUser.userphone,
                        status: inputUser.userstatus,
                        position: inputUser.userjob
                    }
    
                    dispatcher(putUser(updatedObject));
                    navigate('/users');
                }
            });
        }
    }
}

UserForm.propTypes = {
    editMode: PropTypes.bool
}