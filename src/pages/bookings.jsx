import { useState } from 'react'
import styled from 'styled-components';

export default function Bookings()
{
    const [count, setCount] = useState(0)

    const Button = styled.button`
        background: transparent;
        border-radius: 3px;
        border: 2px solid purple;
        color: purple;
        margin: 0.5em 1em;
        padding: 0.25em 1em;`;

    const SecondaryButton = styled.button`
    border-radius: 3px;
    border: 2px solid purple;
    background: purple;
    color: white;
    margin: 0.5em 1em;
    padding: 0.25em 1em;`

    return (
        <>
          <h1>BOOKINGS</h1>
          <div className="card">
            <Button onClick={() => setCount((count) => count + 1)}>
              BOOKINGS {count}
            </Button>
            <SecondaryButton onClick={() => setCount((count) => count + 1)}>
              BOOKINGS {count}
            </SecondaryButton>
          </div>
        </>
      )
}