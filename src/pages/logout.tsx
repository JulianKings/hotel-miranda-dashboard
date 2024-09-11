/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';
import { useContext, useEffect } from 'react';
import { SessionContext } from '../logic/sessionManagement';
import { LocalStorageLoginInformation, SessionActionTypes } from '../interfaces/sessionManagement';
import { useLocalStorage } from '@uidotdev/usehooks';

export default function Logout()
{
	const navigate = useNavigate();
    const {userObject, dispatch} = useContext(SessionContext);

	useEffect(() => {
		if(userObject)
		{
			dispatch({ type: SessionActionTypes.LOGOUT});
			navigate(0);
		} else {
			navigate('/login');
		}
	}, []);	

	return (<>
		<MainComponent><CircularProgress /></MainComponent>
	</>)
}