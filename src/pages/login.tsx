/* eslint-disable react-hooks/exhaustive-deps */
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
import { LoginBox, LoginInput, PasswordInput, LoginContainer, LoginButton } from './loginStyle';

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
						$showError={(inputErrorId === 'username')} 
						onBlur={(event) => validateField(event)} 
					/>
					
					<label htmlFor='password'>Password</label>
					<PasswordInput data-cy='password' key={1} ref={addInputList(1)} id='password' $showError={(inputErrorId === 'password')} onBlur={(event) => validateField(event)} />
					
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
						} else {
							console.log(response.errors);
							response.errors.forEach((error: any) => {
							const result = inputList.current.find((input: HTMLInputElement) => {
								if(input.id === error.path)
								{
									return input;
								}
							})
				
							if(result)
							{                    
								setInputError(error.msg);
								setInputErrorId(result.id);
							}
							});
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
