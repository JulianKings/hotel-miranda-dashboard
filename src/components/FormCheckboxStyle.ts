import styled from "styled-components";

export const CheckboxBox = styled.div`
    padding: 0.5rem;
    margin: 0 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CheckboxLabel = styled.label`
    padding: 0.75rem;
    background-color: #EBF1EF;
    color: #135846;
    border-radius: 0.5rem;

    &:hover {
        background-color: #135846;
        color: white;
        cursor: pointer;
    }

    &:active {
        background-color: #135846;
        color: white;
    }
`;

export const CheckboxInput = styled.input.attrs({
    type: "checkbox",
})`

    border: 0;
    background-color: white;
    display: none;

    &:checked + ${CheckboxLabel} {
        background-color: #135846;
        color: white;
    }
`;