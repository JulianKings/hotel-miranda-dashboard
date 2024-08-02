import PropTypes from 'prop-types';
import styled from 'styled-components';
import useMultiRefs from '../util/multiRef';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { roomArray } from '../data/room';

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
	
    let { id } = useParams();
    
    let roomObject = null;
    if(editMode)
    {
        roomObject = JSON.parse(roomArray).find((room) => room.id === id);
    }

    return <>
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
            <FormSelect id='roomtype'>
                <option value='Single Bed'>Single Bed</option>
                <option value='Double Bed'>Double Bed</option>
                <option value='Double Superior'>Double Superior</option>
                <option value='Suite'>Suite</option>
            </FormSelect>

            <label htmlFor='roomcancellation'>Room Cancellation Policy</label>
            <FormInput id='roomcancellation' 
						ref={addInputList}
						showError={(inputErrorId === 'roomcancellation')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='roomamenities'>Room Amenities</label>
            <FormInput id='roomamenities'  defaultValue={(roomObject) ? roomObject.amenities : ''}  
						ref={addInputList}
						showError={(inputErrorId === 'roomamenities')} 
						onBlur={(event) => validateField(event.target)}  />

            <label htmlFor='roompicture'>Room pictures (separated by a comma)</label>
            <FormInput id='roompicture' 
						ref={addInputList} defaultValue={(roomObject) ? roomObject.images.map( (elem) => (""+elem) ).join(',') : ''}
						showError={(inputErrorId === 'roompicture')} 
						onBlur={(event) => validateField(event.target)}  />


            <label htmlFor='roomdetails'>Room Description</label>
            <textarea id='roomdetails' cols={46} rows={6}>{(roomObject) ? roomObject.description : ''}</textarea>
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

RoomForm.propTypes = {
    editMode: PropTypes.bool
}