import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteRoom } from '../redux/slices/room';
import { deleteUser } from '../redux/slices/user';
import { deleteBooking } from '../redux/slices/bookings';
import { ApiAbstractInterface } from '../interfaces/apiManagement';
import { useApiDispatch } from '../redux/store';

const FormButton = styled.button`
    border-radius: 0.19rem;
    border: 0.13rem solid #df0000;
    background-color: #df0000;
    color: white;
    margin: 0.45rem 0;
    padding: 0.25rem 1rem;
    width: 40%;
    max-width: 30ch;
    margin-top: 0.45rem;`

const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.45rem;

    p.warning {
        font-size: 1.66rem;
        line-height: 1.98rem;
        font-weight: 600;
    }
`;

interface PropTypes {
	deleteType: string;
}

export default function DeleteForm({deleteType}: PropTypes)
{
    const dispatch = useApiDispatch();
    const { id } = useParams<string>();
    const navigate = useNavigate();

    return <>
        <FormBox>
            <form method='post' onSubmit={executeForm}>
                <p className='warning'>Warning!</p>
                <p>Are you sure you want to delete this item? It can&quot;t be recovered after it has been deleted!</p>

                <FormButton>Delete</FormButton>
            </form>
        </FormBox>
    </>

    function executeForm(event: React.SyntheticEvent): void
    {
        event.preventDefault();

        if(id)
        {


        if(deleteType === 'room')
        {
            const deleteObject: ApiAbstractInterface = { _id: id }
            dispatch(deleteRoom(deleteObject));
            navigate('/rooms');

        } else if(deleteType === 'user')
        {
            const deleteObject: ApiAbstractInterface = { _id: id }
            dispatch(deleteUser(deleteObject));
            navigate('/users');

        } else if(deleteType === 'booking')
        {
            const deleteObject: ApiAbstractInterface = { _id: id }
            dispatch(deleteBooking(deleteObject));
            navigate('/bookings');

        } else {
            alert('Deleted successfully!')
        }

        }
    }
}

DeleteForm.propTypes = {
    deleteType: PropTypes.string
}