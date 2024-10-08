/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FocusEvent, FormEvent, FormEventHandler, Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getRandomInt from '../util/util';
import { fetchBookingById, postBooking, putBooking, selectCurrentBooking, selectFetchBookingsStatus } from '../redux/slices/bookings';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';
import { useMultiRef } from '@upstatement/react-hooks';
import { ApiBookingInterface, ApiPostBookingInterface, NullableApiBookingInterface } from '../interfaces/apiManagement';
import { useApiDispatch, useApiSelector } from '../redux/store';

interface ErrorPropTypes {
    $showError: boolean;
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
    border: ${props => props.$showError ? '0.16rem solid #df0000' : '0rem solid'};

    &:focus {
        outline: none;
    }
`;

const NumInput = styled.input.attrs({
        type: "number",
    })<ErrorPropTypes>`
    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.25rem;
    width: 40%;
    max-width: 30ch;
    border: ${props => props.$showError ? '0.16rem solid #df0000' : '0rem solid'};

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
    border: ${props => props.$showError ? '0.16rem solid #df0000' : '0rem solid'};

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
    border: ${props => props.$showError ? '0.16rem solid #df0000' : '0rem solid'};

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

export default function BookingForm({editMode = false}: PropTypes)
{
    const [inputList, addInputList] = useMultiRef<HTMLInputElement>();
    const [selectList, addSelectList] = useMultiRef<HTMLSelectElement>();
    const [textAreaList, addTextAreaList] = useMultiRef<HTMLTextAreaElement>();
    const [inputError, setInputError] = useState<string | null>(null);
    const [inputErrorId, setInputErrorId] = useState<string | null>(null);
    const navigate = useNavigate();

    const { id } = useParams<string>();
    
    let bookingObject: NullableApiBookingInterface = useApiSelector(selectCurrentBooking);
    if(!editMode)
    {
        bookingObject = null;
    }
	const fetchStatus: (string | null) = useApiSelector(selectFetchBookingsStatus);
	const dispatch = useApiDispatch();

	useEffect(() => {
        console.log(fetchStatus);
		if(editMode && !bookingObject || editMode && bookingObject && bookingObject._id !== id || fetchStatus === 'fulfilled')
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
                <FormInput key={0} id='bookingcustomer' defaultValue={(bookingObject) ? bookingObject.customer_name : ''} 
                            ref={addInputList(0)}
                            $showError={(inputErrorId === 'bookingcustomer')} 
                            onBlur={(event) => validateField(event)}  />

                <label htmlFor='order_date'>Order Date</label>
                <DateInput key={1} id='order_date' defaultValue={(bookingObject) ? (new Date(bookingObject.check_in).toISOString().split('T')[0]) : (new Date().toISOString().split('T')[0])}
                            ref={addInputList(1)}
                            $showError={(inputErrorId === 'order_date')} 
                            onBlur={(event) => validateField(event)}  />

                <label htmlFor='check_in'>Check In</label>
                <DateInput key={2} id='check_in' defaultValue={(bookingObject) ? (new Date(bookingObject.check_in).toISOString().split('T')[0]) : ''}
                            ref={addInputList(2)}
                            $showError={(inputErrorId === 'check_in')} 
                            onBlur={(event) => validateField(event)}  />

                <label htmlFor='check_out'>Check Out</label>
                <DateInput key={3} id='check_out' defaultValue={(bookingObject) ? (new Date(bookingObject.check_out).toISOString().split('T')[0]) : ''}
                            ref={addInputList(3)}
                            $showError={(inputErrorId === 'check_out')} 
                            onBlur={(event) => validateField(event)}  />

                <label htmlFor='roomnumber'>Room Number</label>
                <NumInput key={4} id='roomnumber' defaultValue={(bookingObject) ? bookingObject.room.number : ''}
                            ref={addInputList(4)}
                            $showError={(inputErrorId === 'roomnumber')} 
                            onBlur={(event) => validateField(event)}  />

                <label htmlFor='roomtype'>Room Type</label>
                <FormSelect key={5} ref={addSelectList(5)} id='roomtype' $showError={(inputErrorId === 'roomtype')}>
                    {(bookingObject && bookingObject.room.type === 'Single Bed') ? 
                        <Fragment><option value='Single Bed' selected>Single Bed</option></Fragment> : 
                        <Fragment><option value='Single Bed'>Single Bed</option></Fragment>
                    }
                    {(bookingObject && bookingObject.room.type === 'Double Bed') ? 
                        <Fragment><option value='Double Bed' selected>Double Bed</option></Fragment> : 
                        <Fragment><option value='Double Bed'>Double Bed</option></Fragment>
                    }
                    {(bookingObject && bookingObject.room.type === 'Double Superior') ? 
                        <Fragment><option value='Double Superior' selected>Double Superior</option></Fragment> : 
                        <Fragment><option value='Double Superior'>Double Superior</option></Fragment>
                    }
                    {(bookingObject && bookingObject.room.type === 'Suite') ? 
                        <Fragment><option value='Suite' selected>Suite</option></Fragment> : 
                        <Fragment><option value='Suite'>Suite</option></Fragment>
                    }
                </FormSelect>

                <label htmlFor='bookingstatus'>Booking Status</label>
                <FormSelect key={6} ref={addSelectList(6)} id='bookingstatus' $showError={(inputErrorId === 'bookingstatus')}>                
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
                <textarea key={7} ref={addTextAreaList(7)}  id='bookingdetails' cols={46} rows={6}>{(bookingObject) ? bookingObject.notes : ''}</textarea>
                <FormButton>{(editMode) ? 'Update Booking' : 'Add new Booking'}</FormButton>
                {(editMode) ? <Fragment>
                    <DeleteButton type='button'
                        onClick={() => {
                            if(bookingObject)
                            {
                                navigate('/booking/' + (bookingObject._id) + '/delete');
                            }
                        }}>Delete booking</DeleteButton>
                </Fragment> : ''}
            </FormBox>
        </Fragment>
    );

    function validateField(event: FocusEvent<HTMLInputElement>): void
    {
        if(event.target)
        {
            setInputErrorId(null);
            setInputError(null);
        }
    }

    function validInput(inputs: (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[], inputObject: any): boolean {
        let error: boolean = false;

        inputs.forEach((input: (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)) => {
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

        return error;
    }

    function executeForm(event: React.SyntheticEvent): void
    {
        event.preventDefault();

        const inputObject: any = {};
        const inputs: boolean = validInput(inputList.current, inputObject);
        const selects: boolean = validInput(selectList.current, inputObject);
        const textareas: boolean = validInput(textAreaList.current, inputObject);

        let error: boolean = (inputs && selects && textareas);

        if(!error)
        {
            if(!editMode)
                {
                    const updatedObject: ApiPostBookingInterface = {
                        _id: undefined,
                        customer_name: inputObject.bookingcustomer,
                        date: (new Date(Date.parse(inputObject.order_date))),
                        status: inputObject.bookingstatus,
                        room: '',
                        check_in: (new Date(Date.parse(inputObject.check_in))),
                        check_out: (new Date(Date.parse(inputObject.check_out))),
                        notes: inputObject.bookingdetails
                    }
    
                    dispatch(postBooking(updatedObject));
                    navigate('/bookings');
                } else {
                    const updatedObject: ApiPostBookingInterface = {
                        _id: ""+id,
                        customer_name: inputObject.bookingcustomer,
                        date: (new Date(Date.parse(inputObject.order_date))),
                        status: inputObject.bookingstatus,
                        room: '',
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