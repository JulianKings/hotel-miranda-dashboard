import styled from "styled-components";

export const BookingContainer = styled.div`
	display: flex;
	width: 100%;
`;

export const BookingCategories = styled.div`
	display: flex;
	width: 60%;
	min-width: 40rem;

	p.selected {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

export const BookingCategory = styled.p`
	padding: 0.1rem 1rem;
	border-bottom: 0.06rem solid #D4D4D4;

	&:hover {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

export const BookingStatus = styled.td`
	p {
		background-color: #fffae1;
		font-size: 0.88rem;
		line-height: 1.56rem;
		color: #ffca3a;
		font-weight: 400;
		padding: 0.75rem 1.5rem;
		border-radius: 0.75rem;
		text-align: center;
		max-width: 17ch;
		text-transform: capitalize;
	}

	p.checking_in {
		color: #5AD07A;
		background-color: #E8FFEE;
	}

	p.checking_out {
		background-color: #FFEDEC;
		color: #E23428;
	}
`;

export const BookingSearch = styled.div`
	display: flex;
	flex-direction: column;

	input {
		margin-top: 1.5rem;
		width: 30%;
		max-width: 30ch;
		padding: 0.25rem 0.75rem;
		border: 0 solid;
		border-radius: 0.25rem;

		&:focus {
			outline: none;
		}
	}`;