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
	min-width: 18rem;
	border-radius: 0.75rem;
	box-shadow: 0 0.25rem 0.25rem rgb(0, 0, 0, .05);

	&	label {
		font-size: 0.95rem;
		line-height: 1.69rem;
		text-transform: uppercase;
	}
	`;
	
export const ImageBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;	
	max-width: 25rem;
	border-top-left-radius: 0.75rem;
	border-bottom-left-radius: 0.75rem;

	& img {
		width: 100%;
		height: 100%;
		border-top-left-radius: 0.75rem;
		border-bottom-left-radius: 0.75rem;
	}
`;

export const FormBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	padding: 1.25rem 1.88rem;
	font-size: 1.25rem;
	font-weight: 400;
	line-height: 1.88rem;
	gap: 1.5rem;

	.information {
		font-size: 0.88rem;
		line-height: 1.31rem;
		font-weight: 300;
		color: #799283;
	}
`;

export const LoginInput = styled.input.attrs({
		type: "text",
	})<ErrorPropTypes>`
	border: 0;
	background-color: rgba(243, 243, 243, 0.65);
	padding: 0.45rem 0.35rem;
	border-radius: 0.25rem;
	width: 90%;
	border: ${props => props.$showError ? '0.16rem solid #df0000' : '0rem solid'};

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
	border: ${props => props.$showError ? '0.16rem solid #df0000' : '0rem solid'};

	&:focus {
		outline: none;
	}`;

export const LoginContainer = styled.div`
	display:flex;
	align-items: center;
	gap: 0.95rem;
`