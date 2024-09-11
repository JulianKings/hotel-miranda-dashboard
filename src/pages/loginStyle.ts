import styled from "styled-components";
import { ErrorPropTypes } from "../interfaces/componentProps";

export const LoginButton = styled.button`
    border-radius: 0.19rem;
    border: 0.13rem solid #135846;
    background: #135846;
    color: white;
    margin: 0.45rem 0;
    padding: 0.25rem 1rem;
    width: 75%;
	`;

export const LoginBox = styled.div`
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

export const LoginInput = styled.input.attrs({
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

export const PasswordInput = styled.input.attrs({
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

export const LoginContainer = styled.div`
	display:flex;
	align-items: center;
	gap: 0.95rem;
`