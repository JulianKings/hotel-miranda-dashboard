/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useMultiRefs from '../util/multiRef';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getRandomInt from '../util/util';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingById, postBooking, putBooking, selectCurrentBooking, selectFetchBookingsStatus } from '../redux/slices/bookingsSlice';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';

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
    const navigate = useNavigate();

    const { id } = useParams();
    
    let bookingObject = useSelector(selectCurrentBooking);
    if(!editMode)
    {
        bookingObject = null;
    }
	const fetchStatus = useSelector(selectFetchBookingsStatus);
	const dispatch = useDispatch();

	useEffect(() => {
		if(editMode && !bookingObject || editMode && bookingObject && bookingObject.id !== id)
		{
			dispatch(fetchBookingById(id));
		}
	}, [id]);

    return ((editMode && fetchStatus !== 'fulfilled') ? 
        <MainComponent><CircularProgress /></MainComponent>
        :    
        <Fragment>
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

                <label htmlFor='order_date'>Order Date</label>
                <DateInput id='order_date' defaultValue={(bookingObject) ? (new Date(bookingObject.check_in).toISOString().split('T')[0]) : (new Date().toISOString().split('T')[0])}
                            ref={addInputList}
                            showError={(inputErrorId === 'order_date')} 
                            onBlur={(event) => validateField(event.target)}  />

                <label htmlFor='check_in'>Check In</label>
                <DateInput id='check_in' defaultValue={(bookingObject) ? (new Date(bookingObject.check_in).toISOString().split('T')[0]) : ''}
                            ref={addInputList}
                            showError={(inputErrorId === 'check_in')} 
                            onBlur={(event) => validateField(event.target)}  />

                <label htmlFor='check_out'>Check Out</label>
                <DateInput id='check_out' defaultValue={(bookingObject) ? (new Date(bookingObject.check_out).toISOString().split('T')[0]) : ''}
                            ref={addInputList}
                            showError={(inputErrorId === 'check_out')} 
                            onBlur={(event) => validateField(event.target)}  />

                <label htmlFor='roomnumber'>Room Number</label>
                <NumInput id='roomnumber' defaultValue={(bookingObject) ? bookingObject.room_number : ''}
                            ref={addInputList}
                            showError={(inputErrorId === 'roomnumber')} 
                            onBlur={(event) => validateField(event.target)}  />

                <label htmlFor='roomtype'>Room Type</label>
                <FormSelect ref={addInputList} id='roomtype'>
                    {(bookingObject && bookingObject.room_type === 'Single Bed') ? 
                        <Fragment><option value='Single Bed' selected>Single Bed</option></Fragment> : 
                        <Fragment><option value='Single Bed'>Single Bed</option></Fragment>
                    }
                    {(bookingObject && bookingObject.room_type === 'Double Bed') ? 
                        <Fragment><option value='Double Bed' selected>Double Bed</option></Fragment> : 
                        <Fragment><option value='Double Bed'>Double Bed</option></Fragment>
                    }
                    {(bookingObject && bookingObject.room_type === 'Double Superior') ? 
                        <Fragment><option value='Double Superior' selected>Double Superior</option></Fragment> : 
                        <Fragment><option value='Double Superior'>Double Superior</option></Fragment>
                    }
                    {(bookingObject && bookingObject.room_type === 'Suite') ? 
                        <Fragment><option value='Suite' selected>Suite</option></Fragment> : 
                        <Fragment><option value='Suite'>Suite</option></Fragment>
                    }
                </FormSelect>

                <label htmlFor='bookingstatus'>Booking Status</label>
                <FormSelect ref={addInputList} id='bookingstatus'>                
                    {(bookingObject && bookingObject.status === 'checking_in') ? 
                        <Fragment><option value='checking_in' selected>Checking In</option></Fragment> : 
                        <Fragment><option value='checking_in'>Checking In</option></Fragment>
                    }
                    {(bookingObject && bookingObject.status === 'checking_out') ? 
                        <Fragment><option value='checking_out' selected>Checking Out</option></Fragment> : 
                        <Fragment><option value='checking_out'>Checking Out</option></Fragment>
                    }
                    {(bookingObject && bookingObject.status === 'in_progress') ? 
                        <Fragment><option value='in_progress' selected>In Progress</option></Fragment> : 
                        <Fragment><option value='in_progress'>In Progress</option></Fragment>
                    }
                </FormSelect>

                <label htmlFor='bookingdetails'>Booking Notes</label>
                <textarea ref={addInputList} id='bookingdetails' cols={46} rows={6}>{(bookingObject) ? bookingObject.notes : ''}</textarea>
                <FormButton>{(editMode) ? 'Update Booking' : 'Add new Booking'}</FormButton>
                {(editMode) ? <Fragment>
                    <DeleteButton type='button'
                        onClick={() => {
                            navigate('/booking/' + bookingObject.id + '/delete');
                        }}>Delete booking</DeleteButton>
                </Fragment> : ''}
            </FormBox>
        </Fragment>
    );

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
        const inputObject = {};

        let error = false;

        inputs.forEach((input) => {
            const value = input.value;
            if(value.length < 3)
            {                    
                setInputError('Please fill every field before trying to update.');
                setInputErrorId(input.id);
                error = true;
                return;
            } else {
                inputObject[input.id] = input.value;
            }
        })

        if(!error)
        {
            if(!editMode)
                {
                    const updatedObject = {
                        id: getRandomInt(10) + "ebb1d15-d047-" + getRandomInt(10500) + "-85c9-63c3ed856afb-" + getRandomInt(25000),
                        customer_name: inputObject.bookingcustomer,
                        date: (new Date(Date.parse(inputObject.order_date))),
                        status: inputObject.bookingstatus,
                        room_number: inputObject.roomnumber,
                        room_type: inputObject.roomtype,
                        check_in: (new Date(Date.parse(inputObject.check_in))),
                        check_out: (new Date(Date.parse(inputObject.check_out))),
                        notes: inputObject.bookingdetails
                    }
    
                    dispatch(postBooking(updatedObject));
                    navigate('/bookings');
                } else {
                    const updatedObject = {
                        id: id,
                        customer_name: inputObject.bookingcustomer,
                        date: (new Date(Date.parse(inputObject.order_date))),
                        status: inputObject.bookingstatus,
                        room_number: inputObject.roomnumber,
                        room_type: inputObject.roomtype,
                        check_in: (new Date(Date.parse(inputObject.check_in))),
                        check_out: (new Date(Date.parse(inputObject.check_out))),
                        notes: inputObject.bookingdetails
                    }
    
                    dispatch(putBooking(updatedObject));
                    navigate('/bookings');
                }
        }
    }
}

BookingForm.propTypes = {
    editMode: PropTypes.bool
}