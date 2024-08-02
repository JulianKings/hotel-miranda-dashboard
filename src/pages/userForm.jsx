import PropTypes from 'prop-types';
import styled from 'styled-components';
import useMultiRefs from '../util/multiRef';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userArray } from '../data/user';

const FormButton = styled.button`
    border-radius: 0.19rem;
    border: 0.13rem solid #135846;
    background: #135846;
    color: white;
    margin: 0.45rem 0;
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
    const [inputList, addInputList] = useMultiRefs();
    const [inputError, setInputError] = useState(null);
    const [inputErrorId, setInputErrorId] = useState(null);
	
    let { id } = useParams();
    
    let userObject = null;
    if(editMode)
    {
        userObject = JSON.parse(userArray).find((user) => user.id === id);
    }

    return <>
        <FormBox method='post' onSubmit={executeForm}>
            {(inputError) ? <Fragment>
                <FormError>
                    {inputError}
                </FormError>
            </Fragment> : ''}
            
            <label htmlFor='username'>First name</label>
            <FormInput id='username' defaultValue={(userObject) ? userObject.name : ''} 
						ref={addInputList}
						showError={(inputErrorId === 'username')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='userlastname'>Last name</label>
            <FormInput id='userlastname' defaultValue={(userObject) ? userObject.full_name.split(' ')[1] : ''}
                        ref={addInputList}
						showError={(inputErrorId === 'userlastname')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='password'>Password</label>
            <PasswordInput id='password' 
						ref={addInputList}
						showError={(inputErrorId === 'password')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='userjob'>User Job</label>
            <FormSelect id='userjob'>
                <option value='manager'>Manager</option>
                <option value='room_service'>Room Service</option>
                <option value='reception'>Reception</option>
            </FormSelect>

            <label htmlFor='usermail'>User mail</label>
            <MailInput id='usermail' 
						ref={addInputList} defaultValue={(userObject) ? userObject.mail : ''}
						showError={(inputErrorId === 'usermail')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='userphone'>User phone</label>
            <TelInput id='userphone' 
						ref={addInputList} defaultValue={(userObject) ? userObject.contact : ''}
						showError={(inputErrorId === 'userphone')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='userdate'>Start Date</label>
            <DateInput id='userdate' defaultValue={(userObject) ? userObject.start : ''}
						ref={addInputList}
						showError={(inputErrorId === 'userdate')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='userjob'>User Status</label>
            <FormSelect id='userjob'>
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
            </FormSelect>

            <label htmlFor='userpicture'>User picture</label>
            <FormInput id='userpicture' 
						ref={addInputList} defaultValue={(userObject) ? userObject.profile_picture : ''}
						showError={(inputErrorId === 'userpicture')} 
						onBlur={(event) => validateField(event.target)}  />


            <label htmlFor='userdetails'>Job details</label>
            <textarea id='userdetails' cols={46} rows={6}>{(userObject) ? userObject.description : ''}</textarea>
            <FormButton>{(editMode) ? 'Update Employee' : 'Add new Employee'}</FormButton>
        </FormBox>
    </>

    function validateField(target)
    {
        if(target)
        {
            setInputErrorId(null);
            setInputError(null);
        }
    }

    function executeForm(event)
    {
        event.preventDefault();

        const inputs = inputList();

        let error = false;

        inputs.forEach((input) => {
            const value = input.value;
            if(value.length < 3)
            {                    
                setInputError('Please fill every field before trying to update.');
                setInputErrorId(input.id);
                error = true;
                return;
            }
        })

        if(!error)
        {
            alert('success!!');
        }
    }
}

UserForm.propTypes = {
    editMode: PropTypes.bool
}