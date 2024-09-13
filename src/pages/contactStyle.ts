import styled from "styled-components";

export const ContactContainer = styled.div`
	margin-top: 1.35rem;
	display: flex;
	width: 100%;
`;

export const ContactCategories = styled.div`
	margin-top: 2.5rem;
	display: flex;
	width: 60%;
	min-width: 20rem;

	p.selected {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

export const ContactCategory = styled.p`
	padding: 0.1rem 1.5rem;
	border-bottom: 0.06rem solid #D4D4D4;

	&:hover {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

export const ContactArchiveButton = styled.button`
	background-color: #fff;
	border: 0rem solid;
	font-size: 1rem;
	line-height: 1.56rem;
	color: #E23428;
	font-weight: medium;`

export const ContactUnarchiveButton = styled.button`
	background-color: #fff;
	border: 0rem solid;
	font-size: 1rem;
	line-height: 1.56rem;
	color: #00472a;
	font-weight: medium;`

export const ContactID = styled.td`

	p {
		margin-top: 0.65rem;
		color: #799283;
	}

	p.customer_id {
		color: #393939;
		font-weight: 600;
		font-size: 1rem;
	}
`

export const ContactCustomer = styled.td`
	min-width: 18ch;
	word-break: break-word;

	p {
		margin-top: 0.65rem;
        color: #799283;
		font-size: 0.9rem;
	}

	p.customer {
		color: #393939;
		font-weight: 600;
		font-size: 1rem;
	}
	`

export const ContactSubject = styled.td`
    overflow: hidden;
	max-width: 85%;
	display: flex;
	flex-direction: column;
	gap: 0.65rem;

    p {
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 400;
        font-size: 1rem;
    }

    p.subject {
        font-weight: 600;
        max-width: 90%;
        font-size: 1.1rem;
    }

    span.content_more {
        color: #135846;
		font-weight: 600;
		font-size: 1rem;
		line-height: 1.56rem;
        cursor: pointer;
    }
`;

export const ContactPageContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 0.75rem;
	width: 95%;
	margin-top: 0.75rem;
	`;

export const ContactPrev = styled.div`
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

export const ContactNext = styled.div`
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