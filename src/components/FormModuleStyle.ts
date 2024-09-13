import styled from "styled-components";
import { ErrorPropTypes, FormButtonPropTypes } from "../interfaces/componentProps";

export const FormTitle = styled.p`
    font-size: 1.2rem;
    font-weight: 600;
    `;

export const FormButton = styled.button<FormButtonPropTypes>`
    border-radius: 0.19rem;
    border: ${props => props.buttonColor ? '0.13rem solid ' + props.buttonColor : '0.13rem solid #135846'};
    background: ${props => props.buttonColor ? props.buttonColor : '#135846'};
    color: white;
    margin: 0.75rem 0;
    padding: 0.25rem 1rem;
    width: 40%;
    max-width: 30ch;`

export const FormInput = styled.input.attrs({
        type: "text",
    })<ErrorPropTypes>`
    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.25rem;
    width: 40%;
    max-width: 30ch;
    border: ${props => props.showError ? '0.16rem solid #df0000' : '0rem solid'};

    &:focus {
        outline: none;
    }
`;