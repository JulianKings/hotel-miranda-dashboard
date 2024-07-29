import { useState } from 'react'
import styled from 'styled-components';

export default function Index()
{
    const [count, setCount] = useState(0)

    const Button = styled.button`
        background: transparent;
        border-radius: 3px;
        border: 2px solid orange;
        color: orange;
        margin: 0.5em 1em;
        padding: 0.25em 1em;`;

    const SecondaryButton = styled.button`
    border-radius: 3px;
    border: 2px solid orange;
    background: orange;
    color: white;
    margin: 0.5em 1em;
    padding: 0.25em 1em;`

  return (
    <>
      <h1>INDEX</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          INDEX {count}
        </Button>
        <SecondaryButton onClick={() => setCount((count) => count + 1)}>
          INDEX {count}
        </SecondaryButton>
      </div>
    </>
  )
}