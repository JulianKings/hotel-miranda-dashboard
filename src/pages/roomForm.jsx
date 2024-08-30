/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useMultiRefs from '../util/multiRef';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomById, postRoom, putRoom, selectCurrentRoom, selectFetchRoomStatus } from '../redux/slices/roomSlice';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';

export const FormButton = styled.button`
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

export default function RoomForm({editMode = false})
{
    const [inputList, addInputList] = useMultiRefs();
    const [inputError, setInputError] = useState(null);
    const [inputErrorId, setInputErrorId] = useState(null);
	const navigate = useNavigate();

    const { id } = useParams();

    let roomObject = useSelector(selectCurrentRoom);
    if(!editMode)
    {
        roomObject = null;
    }
	const fetchStatus = useSelector(selectFetchRoomStatus);
	const dispatch = useDispatch();

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
						ref={addInputList}
						showError={(inputErrorId === 'roomid')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='roomprice'>Room Price</label>
            <NumInput id='roomprice' defaultValue={(roomObject) ? roomObject.price : ''}
                        ref={addInputList}
						showError={(inputErrorId === 'roomprice')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='roomdiscount'>Discount</label>
            <NumInput id='roomdiscount' defaultValue={(roomObject) ? roomObject.offer : ''}
						ref={addInputList}
						showError={(inputErrorId === 'roomdiscount')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='roomtype'>Room Type</label>
            <FormSelect ref={addInputList} id='roomtype'>
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
            <FormSelect ref={addInputList} id='roomstatus'>                
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
						ref={addInputList}
						showError={(inputErrorId === 'roomfloor')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='roomcancellation'>Room Cancellation Policy</label>
            <FormInput id='roomcancellation' 
						ref={addInputList}
						showError={(inputErrorId === 'roomcancellation')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='roomamenities'>Room Amenities</label>
            <FormInput id='roomamenities' defaultValue={(roomObject) ? roomObject.amenities : ''}  
						ref={addInputList}
						showError={(inputErrorId === 'roomamenities')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='roompicture'>Room pictures (separated by a comma)</label>
            <FormInput id='roompicture' 
						ref={addInputList} defaultValue={(roomObject) ? roomObject.images.map( (elem) => (""+elem) ).join(',') : ''}
						showError={(inputErrorId === 'roompicture')} 
						onBlur={(event) => validateField(event.target)}  />


            <label htmlFor='roomdetails'>Room Description</label>
            <textarea ref={addInputList} id='roomdetails' cols={46} rows={6}>{(roomObject) ? roomObject.description : ''}</textarea>
            <FormButton>{(editMode) ? 'Update Room' : 'Add new Room'}</FormButton>
            {(editMode) ? <Fragment>
                <FormButton buttonColor='#df0000' type='button'
                    onClick={() => {
                        navigate('/room/' + roomObject.id + '/delete');
                    }}>Delete room</FormButton>
            </Fragment> : ''}
        </FormBox>
    </Fragment>;

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
                const roomObject = {
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
                const roomObject = {
                    id: id,
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

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}

RoomForm.propTypes = {
    editMode: PropTypes.bool
}