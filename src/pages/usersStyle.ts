import styled from "styled-components";

export const EmployeeContainer = styled.div`
	display: flex;
	width: 100%;
`;

export const EmployeeCategories = styled.div`
	display: flex;
	width: 60%;
	min-width: 20rem;

	p.selected {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

export const EmployeeCategory = styled.p`
	padding: 0.1rem 1rem;
	border-bottom: 0.06rem solid #D4D4D4;

	&:hover {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

export const EmployeeSearch = styled.div`
	margin-top: 1rem;
	display: flex;
	flex-direction: column;

	input {
		width: 30%;
		max-width: 30ch;
		padding: 0.25rem 0.75rem;
		border: 0 solid;
		border-radius: 0.25rem;

		&:focus {
			outline: none;
		}
	}`;

export const UsersPageContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 0.95rem;
	width: 95%;
	margin-top: 0.75rem;
	`;

export const UsersPrev = styled.div`
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

export const UsersNext = styled.div`
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

export const UserInformation = styled.td`
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

	p.username {
		color: #393939;
		font-weight: 600;
		font-size: 1rem;
	}
`;

export const UserStatus = styled.td`
	p {
		text-transform: uppercase;
		font-size: 0.88rem;
		line-height: 1.31rem;
		font-weight: 600;
	}

	p.active {
		color: #5AD07A;
	}

	p.inactive {
		color: #E23428;
	}
`;