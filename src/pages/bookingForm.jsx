import PropTypes from 'prop-types';
import styled from 'styled-components';
import useMultiRefs from '../util/multiRef';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bookingArray } from '../data/bookings';

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

const NumInput = styled.input.attrs({
        type: "number",
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

export default function BookingForm({editMode = false})
{
    const [inputList, addInputList] = useMultiRefs();
    const [inputError, setInputError] = useState(null);
    const [inputErrorId, setInputErrorId] = useState(null);
	
    let { id } = useParams();
    
    let bookingObject = null;
    if(editMode)
    {
        bookingObject = JSON.parse(bookingArray).find((booking) => booking.id === id);
    }

    return <>
        <FormBox method='post' onSubmit={executeForm}>
            {(inputError) ? <Fragment>
                <FormError>
                    {inputError}
                </FormError>
            </Fragment> : ''}
            
            <label htmlFor='bookingcustomer'>Customer Name</label>
            <FormInput id='bookingcustomer' defaultValue={(bookingObject) ? bookingObject.customer_name : ''} 
						ref={addInputList}
						showError={(inputErrorId === 'bookingcustomer')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='check_in'>Check In</label>
            <DateInput id='check_in' defaultValue={(bookingObject) ? bookingObject.check_in : ''}
                        ref={addInputList}
						showError={(inputErrorId === 'check_in')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='check_out'>Check Out</label>
            <DateInput id='check_out' defaultValue={(bookingObject) ? bookingObject.check_out : ''}
                        ref={addInputList}
						showError={(inputErrorId === 'check_out')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='roomnumber'>Room Number</label>
            <NumInput id='roomnumber' defaultValue={(bookingObject) ? bookingObject.room_number : ''}
						ref={addInputList}
						showError={(inputErrorId === 'roomnumber')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='roomtype'>Room Type</label>
            <FormSelect id='roomtype'>
                <option value='Single Bed'>Single Bed</option>
                <option value='Double Bed'>Double Bed</option>
                <option value='Double Superior'>Double Superior</option>
                <option value='Suite'>Suite</option>
            </FormSelect>

            <label htmlFor='bookingdetails'>Room Description</label>
            <textarea id='bookingdetails' cols={46} rows={6}>{(bookingObject) ? bookingObject.notes : ''}</textarea>
            <FormButton>{(editMode) ? 'Update Booking' : 'Add new Booking'}</FormButton>
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

BookingForm.propTypes = {
    editMode: PropTypes.bool
}