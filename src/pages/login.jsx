import styled from 'styled-components';
import '../style/style.css';
import '../style/pages/login.css';

export default function Login()
{
    const LoginButton = styled.button`
    border-radius: 3px;
    border: 2px solid #BF4F74;
    background: #BF4F74;
    color: white;
    margin: 0.5em 1em;
    padding: 0.25em 1em;`

  return (
    <>
    <main className='login'>
        <section className='login__box'>
            <label htmlFor='userName'>User name:</label>
            <input type='text' id='userName' className='login__box__input' />
            
            <label htmlFor='password'>Password:</label>
            <input type='text' id='password' className='login__box__input' />
            
            <LoginButton>
            b
            </LoginButton>
        </section>

    </main>
    </>
  )
}