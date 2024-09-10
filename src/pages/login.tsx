/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import '../style/style.css';
import '../style/pages/login.css';
import { useNavigate } from 'react-router-dom';
import { FocusEvent, Fragment, useEffect, useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { MainComponent } from '../styledcomponents/main';
import { IoMdHelpCircle } from 'react-icons/io';
import { Box, Button, Modal } from '@mui/material';
import { useMultiRef } from '@upstatement/react-hooks';
import { LocalStorageLoginInformation } from '../interfaces/sessionManagement';

interface ErrorPropTypes {
	showError: boolean;
}

const LoginButton = styled.button`
    border-radius: 0.19rem;
    border: 0.13rem solid #135846;
    background: #135846;
    color: white;
    margin: 0.45rem 0;
    padding: 0.25rem 1rem;
    width: 75%;
	`;

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
	box-shadow: 0 0.25rem 0.25rem rgb(0, 0, 0, .05);
	`;

const LoginInput = styled.input.attrs({
		type: "text",
	})<ErrorPropTypes>`
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
	})<ErrorPropTypes>`
	border: 0;
	background-color: rgba(243, 243, 243, 0.65);
	padding: 0.45rem 0.35rem;
	border-radius: 0.25rem;
	width: 90%;
	border: ${props => props.showError ? '0.16rem solid #df0000' : '0rem solid'};

	&:focus {
		outline: none;
	}`;

const LoginContainer = styled.div`
	display:flex;
	align-items: center;
	gap: 0.95rem;
`

export default function Login()
{
	const navigate = useNavigate();
    const [ssoToken] = useLocalStorage<LocalStorageLoginInformation>('sso_token');

    useEffect(() => {
		if(ssoToken)
		{
			navigate('/');
		}
	}, [ssoToken]);    

    const [inputList, addInputList] = useMultiRef<HTMLInputElement>();
    const [inputError, setInputError] = useState<string | null>(null);
    const [inputErrorId, setInputErrorId] = useState<string | null>(null);
	
    return (
	<Fragment>
        <MainComponent>
			<LoginBox>
				<form method='post' className='login__form' onSubmit={handleForm}>
					<p data-cy='error' className={(inputError) ? 'login__box__error' : 'login__box__error login__box__error--hidden'}>{inputError}</p>
					
					<label htmlFor='username'>User name</label>
					<LoginInput data-cy='username' id='username' 
						key={0} ref={addInputList(0)}
						showError={(inputErrorId === 'username')} 
						onBlur={(event) => validateField(event)} 
					/>
					
					<label htmlFor='password'>Password</label>
					<PasswordInput data-cy='password' key={1} ref={addInputList(1)} id='password' showError={(inputErrorId === 'password')} onBlur={(event) => validateField(event)} />
					
					<LoginContainer>
						<LoginButton type='submit'>
							Login
						</LoginButton>

						<UserHelper />
					</LoginContainer>
				</form>
			</LoginBox>
		</MainComponent>
        </Fragment>
    )

    function validateField(event: FocusEvent<HTMLInputElement>): void
    {
        if(event.target)
        {
            setInputErrorId(null);
            setInputError(null);
        }
    }

	interface UserFormValidation {
		username: string | null;
		password: string | null;
	}

    function handleForm(event: React.SyntheticEvent): void
    {
        event.preventDefault();
        const user: UserFormValidation = {
			username: null,
			password: null
		};

        inputList.current.forEach((input: HTMLInputElement) => {
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
                } else {
					user[input.id] = input.value;
				}
            } else if(input.id === 'password')
            {
				user.password = input.value;

                if(user.username)
                {
                    fetch("http://localhost:3000/login", { 
						method: 'POST',
						headers: {'Content-Type': 'application/json'},
						mode: "cors",
						body: JSON.stringify(user),
					})
					.then((response) => {
					if (response.status >= 400) {
						throw new Error("server error");
					}
					return response.json();
					})
					.then((response) => {
						if(response.responseStatus)
						{
							if(response.responseStatus === 'validLogin')
							{
								// Do JWT stuff
								localStorage.setItem('sso_token', JSON.stringify({jwt_token: response.token}));
								navigate(0);
							}
						}            
					})
					.catch((error) => {
						throw new Error(error);
					});
                }
            }
        });
    }
}

// modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#000',
    color: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

function UserHelper() {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <span className='help_icon'><IoMdHelpCircle onClick={handleOpen} /></span>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 600 }}>
            <h2 id="parent-modal-title">Login Help</h2>
            <p style={{margin: '0.95rem 0'}} id="parent-modal-description">
              User: admin
            </p> <p style={{margin: '0.95rem 0'}} id="parent-modal-description">
              Password: admin
            </p>
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Modal>
      </div>
    );
}
