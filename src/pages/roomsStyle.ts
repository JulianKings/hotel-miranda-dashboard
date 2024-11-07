import styled from "styled-components";

export const RoomContainer = styled.div`
	display: flex;
	width: 100%;
`;

export const RoomCategories = styled.div`
	display: flex;
	width: 60%;
	min-width: 40rem;

	p.selected {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

export const RoomCategory = styled.p`
	padding: 0.1rem 1rem;
	border-bottom: 0.06rem solid #D4D4D4;

	&:hover {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

export const RoomInformation = styled.td`
	display: flex;
	gap: 0.75rem;
	align-items: center;

	img {
		width: 5.5rem;
		height: 5.5rem;
		border-radius: 0.75rem;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	p {
        color: #799283;
		font-size: 0.88rem;
		line-height: 1.31rem;
	}

	p.roomnumber {
		color: #393939;
		font-weight: 600;
		font-size: 1rem;
	}
`;

export const RoomStatus = styled.td`
	p {
		background-color: #FF9C3A;
		font-size: 0.88rem;
		line-height: 1.56rem;
		color: black;
		font-weight: 400;
		padding: 0.75rem 1.5rem;
		border-radius: 0.75rem;
		text-align: center;
		max-width: 17ch;
		text-transform: capitalize;
	}

	p.available {
		color: white;
		background-color: #5AD07A;
	}

	p.booked {
		color: white;
		background-color: #E23428;
	}
`;