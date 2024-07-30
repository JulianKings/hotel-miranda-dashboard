import { useState } from 'react'
import styled from 'styled-components';

export default function Logout()
{
    const [count, setCount] = useState(0)

    const Button = styled.button`
        background: transparent;
        border-radius: 3px;
        border: 2px solid #BF4F74;
        color: #BF4F74;
        margin: 0.5em 1em;
        padding: 0.25em 1em;`;

    const SecondaryButton = styled.button`
    border-radius: 3px;
    border: 2px solid #BF4F74;
    background: #BF4F74;
    color: white;
    margin: 0.5em 1em;
    padding: 0.25em 1em;`

  return (
    <>
      <h1>Vite + React - TEST SITE</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <SecondaryButton onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </SecondaryButton>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}