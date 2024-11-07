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
    padding: 0.45rem 0.25rem;
    width: 20%;
    max-width: 30ch;`

export const FormBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 2.45rem;
    gap: 0.75rem;
`;

export const FormItem = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
`;

export const FormInputBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
`;

export const FormTextAreaBox = styled.div<ErrorPropTypes>`
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    margin: 0.75rem 0;

    & textarea {
        padding: 0.45rem 0.35rem;
        border-radius: 0.35rem;
        border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #EBF1EF'};

        &:focus {
            outline: none;
            border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #135846'};
            box-shadow: 0.063rem 0.125rem 0.25rem rgba(0,0,0,0.10);
        }
    }
`;

export const FormCheckboxBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin: 0.75rem 0;
`;

export const FormButtonBox = styled.div`
    display: flex;
    gap: 1.25rem;
    margin: 0.25rem 0.45rem;
`;

export const FormCheckboxContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    gap: 0.55rem 0.55rem;
    margin: 0.35rem 0;
`;

export const FormInput = styled.input.attrs({
        type: "text",
    })<ErrorPropTypes>`
    
    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.35rem;
    width: 70%;
    border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #EBF1EF'};

    &:focus {
        outline: none;
        border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #135846'};
        box-shadow: 0.063rem 0.125rem 0.25rem rgba(0,0,0,0.10);
    }
`;

export const FormNumberInput = styled.input.attrs({
    type: "number",
    })<ErrorPropTypes>`

    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.35rem;
    width: 70%;
    border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #EBF1EF'};

    &:focus {
        outline: none;
        border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #135846'};
        box-shadow: 0.063rem 0.125rem 0.25rem rgba(0,0,0,0.10);
    }
`;

export const FormPhoneInput = styled.input.attrs({
    type: "tel",
    })<ErrorPropTypes>`

    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.35rem;
    width: 70%;
    border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #EBF1EF'};

    &:focus {
        outline: none;
        border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #135846'};
        box-shadow: 0.063rem 0.125rem 0.25rem rgba(0,0,0,0.10);
    }
`;

export const FormPasswordInput = styled.input.attrs({
    type: "password",
    })<ErrorPropTypes>`

    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.35rem;
    width: 70%;
    border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #EBF1EF'};

    &:focus {
        outline: none;
        border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #135846'};
        box-shadow: 0.063rem 0.125rem 0.25rem rgba(0,0,0,0.10);
    }
`;

export const FormDateInput = styled.input.attrs({
    type: "date",
    })<ErrorPropTypes>`

    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.35rem;
    width: 70%;
    border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #EBF1EF'};

    &:focus {
        outline: none;
        border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #135846'};
        box-shadow: 0.063rem 0.125rem 0.25rem rgba(0,0,0,0.10);
    }
`;

export const FormMailInput = styled.input.attrs({
    type: "email",
    })<ErrorPropTypes>`

    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.35rem;
    width: 70%;
    border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #EBF1EF'};

    &:focus {
        outline: none;
        border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #135846'};
        box-shadow: 0.063rem 0.125rem 0.25rem rgba(0,0,0,0.10);
    }
`;

export const FormSelect = styled.select<ErrorPropTypes>`
    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.35rem;
    width: 70%;
    border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #EBF1EF'};

    &:focus {
        outline: none;
        border: ${props => props.$showError ? '0.16rem solid #df0000' : '0.08rem solid #135846'};
        box-shadow: 0.063rem 0.125rem 0.25rem rgba(0,0,0,0.10);
    }
`;