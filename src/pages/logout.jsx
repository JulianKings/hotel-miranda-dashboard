/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { MainComponent } from '../styledcomponents/main';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';

export default function Logout()
{
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.removeItem('sso_token');
		navigate('/');
	}, []);	

	return (<>
		<MainComponent><CircularProgress /></MainComponent>
	</>)
}