import styled from "styled-components";

export const KPIHolder = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(20.25rem, 1fr));
	gap: 1.38rem;`;

export const KPIItem = styled.div`
	display: flex;
	align-items: center;
	background-color: #FFFFFF;
	border-radius: 0.75rem;
	padding: 1.88rem 1.88rem;
	box-shadow: 0rem 0.25rem 0.25rem rgb(0, 0, 0, .05);

	font-size: 1.88rem;
	line-height: 2.88rem;
	color: #393939;
	font-weight: 600;
	transition: all 0.8s ease-in-out;

	&:hover {
		box-shadow: 0rem 1rem 1.88rem rgb(0, 0, 0, 0.14);	
	}

	&:hover div {
		background-color: #E23428;
		color: #FFFFFF;
	}
`;

export const KPIItemImage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #FFEDEC;
	width: 4.06rem;
	height: 4.06rem;
	padding: 1.13rem 1.13rem;
	color: #E23428;
	border-radius: 0.5rem;
	transition: background-color 0.6s ease-in-out, color 0.6s ease-in-out;		
`

export const KPIItemText = styled.p`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	margin-left: 1.38rem;

	span {
		display: block;
		color: #787878;
		font-weight: 300;
		font-size: 0.88rem;
		line-height: 1.31rem;

	}
`;

export const InformationHolder = styled.div`
	margin-top: 2.5rem;
	display: grid;
	grid-template-columns: 47% 47%;
	grid-template-rows: 1fr;;
	gap: 2.44rem;
	justify-content: center;
	`;

export const InformationBox = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #FFFFFF;
	border-radius: 1.25rem;
	padding: 1.88rem 1.8rem;
	width: 100%;
	gap: 0.75rem;
	box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.02);
`;

export const InputBox = styled.div`
	display:flex;
	flex-direction: column;
	gap: 0.25rem;
	
	input {
		background-color: #EBF1EF;
		border: 0rem solid;
		padding: 0.5rem 0.5rem;
		border-radius: 0.25rem;

		&:focus {
			outline: none;
		}
	}`;

export const RoomListBox = styled.div`
	margin-top: 2.5rem;
	margin-bottom: 2.5rem;
	display: flex;
	flex-direction: column;
	gap: 1.75rem;
	background-color: #FFFFFF;
	border-radius: 1.25rem;
	padding: 1.88rem 1.8rem;
	width: 100%;
	box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.02);
`;

export const RoomListItem = styled.div`
	width: 100%;
	display: grid;
	gap: 1.31rem;
	grid-template-columns: 9.63rem 1fr 30%;
	grid-template-rows: 1fr;
	align-items: center;
	transition: transform 0.4s ease-in-out;

	a {
		text-decoration: none;
		color: #393939;

		&:hover {
			color: #135846;
		}
	}

	&:hover {
		transform: scale(1.02);
	}

	&:hover p.room_type {
		color: #EBF1EF;
		background-color: #135846;
	}

	img {
		width: 100%;
		border-radius: 0.5rem;
	}
`;

export const RoomListItemInformation = styled.div`
	display:flex;
	flex-direction: column;
	gap: 0.75rem;
	align-items: flex-start;
	color: #393939;
	font-weight: 600;
	font-size: 1.25rem;
	line-height: 1.88rem;

	p.customer_name {
		font-size: 0.88rem;
		line-height: 1.31rem;
		font-weight: 300;
	}

	p.room_type {
		padding: 0.75rem 0.75rem;
		border-radius: 0.75rem;
		background-color: #EBF1EF;
		color: #135846;
		font-weight: 300;
		font-size: 1.25rem;
		line-height: 1.88rem;
		transition: background-color 0.6s ease-in-out, color 0.4s ease-in-out;
	}
`

export const RoomListItemCheckInOut = styled.div`
	display:flex;
	flex-direction: column;
	gap: 0.8rem;
	align-items: flex-end;

	p {
		padding: 0.75rem 0.75rem;
		border-radius: 0.75rem;
		background-color: #135846;
		color: #FFFFFF;
		font-weight: 300;
		font-size: 1.25rem;
		line-height: 1.88rem;
	}

	p.check_out {
		background-color: #E23428;
	}
`

export const RoomListMore = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 1.25rem;

	button {
		background-color: #ffffff;
		border: 0rem solid;
		color: #135846;
		font-weight: 600;
		font-size: 1rem;
		line-height: 1.56rem;
	}
`;