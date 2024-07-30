/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import '../style/style.css';
import '../style/pages/login.css';
import useMultiRefs from '../util/multiRef';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userArray } from '../data/user';
import bcrypt from 'bcryptjs/dist/bcrypt';
import * as jwt from 'jose';
import { useLocalStorage } from '@uidotdev/usehooks';

const LoginButton = styled.button`
    border-radius: 0.19rem;
    border: 0.13rem solid #135846;
    background: #135846;
    color: white;
    margin: 0.45rem 0;
    padding: 0.25rem 1rem;
    width: 75%`;

const LoginBox = styled.div`
	background-color: white;
	display: flex;
	flex-direction: column;
	min-width: 18rem;
	padding: 1.25rem 1.88rem;
	border-radius: 0.75rem;
	font-size: 1.25rem;
	font-weight: 400;
	line-height: 1.88rem;
	box-shadow: 0 0.25rem 0.25rem rgb(0, 0, 0, .05);`;

const LoginInput = styled.input.attrs({
		type: "text",
	})`
	border: 0;
	background-color: rgba(243, 243, 243, 0.65);
	padding: 0.45rem 0.35rem;
	border-radius: 0.25rem;
	width: 90%;
	border: ${props => props.showError ? '0.16rem solid #df0000' : '0rem solid'};

	&:focus {
		outline: none;
	}`;

const PasswordInput = styled.input.attrs({
	type: "password",
	})`
	border: 0;
	background-color: rgba(243, 243, 243, 0.65);
	padding: 0.45rem 0.35rem;
	border-radius: 0.25rem;
	width: 90%;
	border: ${props => props.showError ? '0.16rem solid #df0000' : '0rem solid'};

	&:focus {
		outline: none;
	}`;

export default function Login()
{
    

    const [inputList, addInputList] = useMultiRefs();
    const navigate = useNavigate();
    const [inputError, setInputError] = useState(null);
    const [inputErrorId, setInputErrorId] = useState(null);
	const [ssoToken] = useLocalStorage('sso_token');

    useEffect(() => {
		if(ssoToken)
		{
			navigate('/');
		}
	}, ssoToken);

    /*const InvisibleError = styled.div`
        display: none;`;
    
    const ErrorBox = styled.div`
        display: block;
        white-space: pre-line;
        background-color: #bd0000;
        color: white;
        margin: 0.4rem 0.6rem;
        padding: 0.4rem 0.4rem;
        font-size: 0.8rem;
        line-height: 1.1rem;
        border-radius: 0.25rem;
        margin-bottom: 1.5rem;`;

    const errorComponent = (inputError !== null) ? <ErrorBox>{inputError}</ErrorBox> : <InvisibleError></InvisibleError>*/

    return (
        <>
        <main className='login'>
			<LoginBox>
				<form method='post' className='login__form' onSubmit={handleForm}>
					<p className={(inputError) ? 'login__box__error' : 'login__box__error login__box__error--hidden'}>{inputError}</p>
					
					<label htmlFor='username'>User name</label>
					<LoginInput ref={addInputList} 
						id='username' 
						showError={(inputErrorId === 'username')} 
						onBlur={(event) => validateField(event.target)} 
					/>
					
					<label htmlFor='password'>Password</label>
					<PasswordInput ref={addInputList} id='password' showError={(inputErrorId === 'password')} onBlur={(event) => validateField(event.target)} />
					
					<LoginButton type='submit'>
						Login
					</LoginButton>
				</form>
			</LoginBox>
	</main>
        </>
    )

    function validateField(target)
    {
        if(target)
        {
            setInputErrorId(null);
			setInputError(null);
        }
    }

    function handleForm(event)
    {
        event.preventDefault();
        const user = {};
        const userObject = JSON.parse(userArray);

        inputList().forEach((input) => {
            input.classList.toggle('login__box__input--error', false);
            
            // check user
            if(input.id === 'username')
            {
                const value = input.value;
                if(value.length < 3)
                {                    
                    setInputError('Invalid user name');
                    setInputErrorId(input.id);
                    return;
                } else if(userObject.find((user) => user.name === value) === undefined)
                {
                    setInputError('User not found');
                    setInputErrorId(input.id);
                    return;
                } else {
					user[input.id] = input.value;
				}
            } else if(input.id === 'password')
            {
                const value = input.value;
                if(user.username)
                {
                    const userObj = userObject.find((usr) => usr.name === user.username);
                    if(userObj !== undefined)
                    {
						bcrypt.compare(value, userObj.password).then(res => {
						if(!res)
						{
							setInputError('Password is incorrect');
							setInputErrorId(input.id);
							return;
						} else {            
							// valid user
							const userObj = userObject.find((usr) => usr.name === user.username);
							if(userObj !== undefined)
							{
								const finalUser = {
									id: userObj.id,
									name: userObj.name,
									full_name: userObj.full_name
								}
								const secret = jwt.base64url.decode('28CIzmTGN8u8wHIu3kOT+Mdmq47BcF32lS7oyMlJZRM=')
								const token = new jwt.EncryptJWT(finalUser)	
									.setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
									.setExpirationTime('30s')
									.encrypt(secret);
								
								token.then((result) => 
								{
									localStorage.setItem('sso_token', JSON.stringify(result));
									navigate('/');
								})
							}
						}
                      })
                    }
                }
            }
        });
    }
}