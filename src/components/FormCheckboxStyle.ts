import styled from "styled-components";

export const CheckboxBox = styled.div`
    padding: 0.5rem;
`;

export const CheckboxLabel = styled.label`
    padding: 0.5rem;
`;

export const CheckboxInput = styled.input.attrs({
    type: "checkbox",
})`

    border: 0;
    background-color: white;
`;