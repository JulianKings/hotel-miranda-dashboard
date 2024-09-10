/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';
import { useContext, useEffect } from 'react';
import { SessionContext } from '../logic/sessionManagement';
import { SessionActionTypes } from '../interfaces/sessionManagement';

export default function Logout()
{
	const navigate = useNavigate();
    const {userObject, dispatch} = useContext(SessionContext);

	useEffect(() => {
		if(userObject)
		{
			dispatch({ type: SessionActionTypes.LOGOUT});
		}
		navigate(0);
	}, []);	

	return (<>
		<MainComponent><CircularProgress /></MainComponent>
	</>)
}