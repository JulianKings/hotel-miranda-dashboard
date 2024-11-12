import styled from "styled-components";

export const BookingContainer = styled.div`
  	display: grid;
	width: 100%;
	grid-template-columns: 50% 1fr;
	gap: 0.75rem;
	justify-items: center;
	align-items: center;

	img {
		width: 100%;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.booking__details {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;

		p {
			font-size: 0.88rem;
			line-height: 1.31rem;
			font-weight: 300;
			color: #799283;
		}

		.booking__details__extra {
			display: flex;
			flex-direction: row;
			width: 100%;
			gap: 20%;

			p {
				font-size: 0.88rem;
				line-height: 1.31rem;
				font-weight: 300;
				color: #799283;
			}
		}

		hr {
			width: 100%;
			border: 0.06rem solid #135846;
			margin-top: 0.38rem;
			margin-bottom: 0.38rem;
			opacity: 0.2;
		}
	}

	.room__image {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		max-width: 35rem;
		border-top-right-radius: 0.75rem;
		border-bottom-right-radius: 0.75rem;
		position: relative;
		overflow: hidden;

		.label {
			font-size: 0.88rem;
			line-height: 1.31rem;
			font-weight: 300;
			color: white;
			background-color: #135846;
			padding: 0.25rem 5.5rem;
			position: absolute;
			top: 1.5rem;
			right: -5rem;
			z-index: 1;
			transform: rotate(35deg);
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

		img {
			width: 100%;
			height: 100%;
			border-top-right-radius: 0.75rem;
			border-bottom-right-radius: 0.75rem;
		}
	}
`;