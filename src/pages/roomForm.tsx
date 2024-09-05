/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FocusEvent, Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRoomById, postRoom, putRoom, selectCurrentRoom, selectFetchRoomStatus } from '../redux/slices/room';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';
import getRandomInt from '../util/util';
import { useMultiRef } from '@upstatement/react-hooks';
import { ApiRoomInterface, NullableApiRoomInterface } from '../interfaces/apiManagement';
import { useApiDispatch, useApiSelector } from '../redux/store';

interface ErrorPropTypes {
    showError: boolean;
}

interface FormButtonPropTypes {
    buttonColor: string | null;
}

const FormButton = styled.button<FormButtonPropTypes>`
    border-radius: 0.19rem;
    border: ${props => props.buttonColor ? '0.13rem solid ' + props.buttonColor : '0.13rem solid #135846'};
    background: ${props => props.buttonColor ? props.buttonColor : '#135846'};
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

const NumInput = styled.input.attrs({
    type: "number",
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

export default function RoomForm({editMode = false}: PropTypes)
{
    const [inputList, addInputList] = useMultiRef<HTMLInputElement>();
    const [selectList, addSelectList] = useMultiRef<HTMLSelectElement>();
    const [textAreaList, addTextAreaList] = useMultiRef<HTMLTextAreaElement>();
    const [inputError, setInputError] = useState<string | null>(null);
    const [inputErrorId, setInputErrorId] = useState<string | null>(null);
    const navigate = useNavigate();

    const { id } = useParams<string>();

    let roomObject: NullableApiRoomInterface = useApiSelector(selectCurrentRoom);
    if(!editMode)
    {
        roomObject = null;
    }
	const fetchStatus: (string | null) = useApiSelector(selectFetchRoomStatus);
	const dispatch = useApiDispatch();

	useEffect(() => {
		if(editMode && !roomObject || editMode && roomObject && roomObject.id !== id)
		{
			dispatch(fetchRoomById(id));
		}
	}, [id]);

    return (editMode && fetchStatus !== 'fulfilled') ? 
    <MainComponent><CircularProgress /></MainComponent>
    :
    <Fragment>
        <FormBox method='post' onSubmit={executeForm}>
            {(inputError) ? <Fragment>
                <FormError>
                    {inputError}
                </FormError>
            </Fragment> : ''}
            
            <label htmlFor='roomid'>Room Number</label>
            <NumInput id='roomid' defaultValue={(roomObject) ? roomObject.number : ''} 
						key={0} ref={addInputList(0)}
						showError={(inputErrorId === 'roomid')} 
						onBlur={(event) => validateField(event)}  />

            <label htmlFor='roomprice'>Room Price</label>
            <NumInput id='roomprice' defaultValue={(roomObject) ? roomObject.price : ''}
                        key={1} ref={addInputList(1)}
						showError={(inputErrorId === 'roomprice')} 
						onBlur={(event) => validateField(event)}  />

            <label htmlFor='roomdiscount'>Discount</label>
            <NumInput id='roomdiscount' defaultValue={(roomObject) ? roomObject.offer : ''}
						key={2} ref={addInputList(2)}
						showError={(inputErrorId === 'roomdiscount')} 
						onBlur={(event) => validateField(event)}  />

            <label htmlFor='roomtype'>Room Type</label>
            <FormSelect key={3} ref={addSelectList(3)} id='roomtype' showError={(inputErrorId === 'roomtype')}>
                {(roomObject && roomObject.type === 'Single Bed') ? 
                    <Fragment><option value='Single Bed' selected>Single Bed</option></Fragment> : 
                    <Fragment><option value='Single Bed'>Single Bed</option></Fragment>
                }
                {(roomObject && roomObject.type === 'Double Bed') ? 
                    <Fragment><option value='Double Bed' selected>Double Bed</option></Fragment> : 
                    <Fragment><option value='Double Bed'>Double Bed</option></Fragment>
                }
                {(roomObject && roomObject.type === 'Double Superior') ? 
                    <Fragment><option value='Double Superior' selected>Double Superior</option></Fragment> : 
                    <Fragment><option value='Double Superior'>Double Superior</option></Fragment>
                }
                {(roomObject && roomObject.type === 'Suite') ? 
                    <Fragment><option value='Suite' selected>Suite</option></Fragment> : 
                    <Fragment><option value='Suite'>Suite</option></Fragment>
                }
            </FormSelect>

            <label htmlFor='roomstatus'>Room Status</label>
            <FormSelect key={4} ref={addSelectList(4)} showError={(inputErrorId === 'roomstatus')} id='roomstatus'>                
                {(roomObject && roomObject.status === 'available') ? 
                    <Fragment><option value='available' selected>Available</option></Fragment> : 
                    <Fragment><option value='available'>Available</option></Fragment>
                }
                {(roomObject && roomObject.status === 'maintenance') ? 
                    <Fragment><option value='maintenance' selected>Maintenance</option></Fragment> : 
                    <Fragment><option value='maintenance'>Maintenance</option></Fragment>
                }
                {(roomObject && roomObject.status === 'booked') ? 
                    <Fragment><option value='booked' selected>Booked</option></Fragment> : 
                    <Fragment><option value='booked'>Booked</option></Fragment>
                }
            </FormSelect>

            <label htmlFor='roomfloor'>Room Floor</label>
            <FormInput id='roomfloor' defaultValue={(roomObject) ? roomObject.floor : ''}
						key={5} ref={addInputList(5)}
						showError={(inputErrorId === 'roomfloor')} 
						onBlur={(event) => validateField(event)}  />

            <label htmlFor='roomcancellation'>Room Cancellation Policy</label>
            <FormInput id='roomcancellation' 
						key={6} ref={addInputList(6)}
						showError={(inputErrorId === 'roomcancellation')} 
						onBlur={(event) => validateField(event)}  />

            <label htmlFor='roomamenities'>Room Amenities</label>
            <FormInput id='roomamenities' defaultValue={(roomObject) ? roomObject.amenities : ''}  
						key={7} ref={addInputList(7)}
						showError={(inputErrorId === 'roomamenities')} 
						onBlur={(event) => validateField(event)}  />

            <label htmlFor='roompicture'>Room pictures (separated by a comma)</label>
            <FormInput id='roompicture' 
						key={8} ref={addInputList(8)} defaultValue={(roomObject) ? roomObject.images.map( (elem) => (""+elem) ).join(',') : ''}
						showError={(inputErrorId === 'roompicture')} 
						onBlur={(event) => validateField(event)}  />


            <label htmlFor='roomdetails'>Room Description</label>
            <textarea key={9} ref={addTextAreaList(9)} id='roomdetails' cols={46} rows={6}>{(roomObject) ? roomObject.description : ''}</textarea>
            <FormButton buttonColor={null}>{(editMode) ? 'Update Room' : 'Add new Room'}</FormButton>
            {(editMode) ? <Fragment>
                <FormButton buttonColor='#df0000' type='button'
                    onClick={() => {
                        if(roomObject)
                        {
                            navigate('/room/' + roomObject.id + '/delete');
                        }
                    }}>Delete room</FormButton>
            </Fragment> : ''}
        </FormBox>
    </Fragment>;

    function validateField(event: FocusEvent<HTMLInputElement>): void
    {
        if(event.target)
        {
            setInputErrorId(null);
            setInputError(null);
        }
    }

    function validInput(inputs: (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[], inputObject: any): boolean {
        let error = false;

        inputs.forEach((input: (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)) => {
            const value = input.value;
            if(value.length < 1 && input.id !== 'roomcancellation')
            {                    
                setInputError('Please fill every field before trying to update.');
                setInputErrorId(input.id);
                error = true;
                return;
            } else if(input.id === 'roompicture' && !value.includes(','))
            {
                setInputError('Please input a valid image list.');
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
            const pictures = [];
            const inputPictures = inputObject.roompicture.split(',');
            for(const pic of inputPictures)
            {
                if(pic.length > 0)
                {
                    pictures.push(pic);
                }
            }

            if(!editMode)
            {
                const roomObject:ApiRoomInterface = {
                    id: getRandomInt(10) + "ebb1d15-d047-" + getRandomInt(10500) + "-85c9-63c3ed856afb-" + getRandomInt(25000),
                    type: inputObject.roomtype,
                    floor: inputObject.roomfloor,
                    number: inputObject.roomid,        
                    amenities: inputObject.roomamenities,
                    images: pictures,
                    price: inputObject.roomprice,
                    offer: inputObject.roomdiscount,
                    status: inputObject.roomstatus,
                    description: inputObject.roomdetails
                }

                dispatch(postRoom(roomObject));
                navigate('/rooms');
            } else {
                const roomObject:ApiRoomInterface = {
                    id: ""+id,
                    type: inputObject.roomtype,
                    floor: inputObject.roomfloor,
                    number: inputObject.roomid,        
                    amenities: inputObject.roomamenities,
                    images: pictures,
                    price: inputObject.roomprice,
                    offer: inputObject.roomdiscount,
                    status: inputObject.roomstatus,
                    description: inputObject.roomdetails
                }

                dispatch(putRoom(roomObject));
                navigate('/rooms');
            }
        }
    }

}