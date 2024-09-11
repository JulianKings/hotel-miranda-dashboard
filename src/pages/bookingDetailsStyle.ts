import styled from "styled-components";

export const BookingContainer = styled.div`
  	display: grid;
	grid-template-columns: 50% 50%;

	img {
		width: 100%;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
`;