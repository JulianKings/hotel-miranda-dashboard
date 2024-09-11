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

export const RoomsPageContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 0.95rem;
	width: 95%;
	margin-top: 0.75rem;
	`;

export const RoomsPrev = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    background-color: #135846;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.75rem;
    z-index: 10;
`;

export const RoomsNext = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    background-color: #135846;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.75rem;
    z-index: 10;
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