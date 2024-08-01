import styled from "styled-components";

export const MainComponent = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const BasicTable = styled.table`
    width: 98%;
    margin: 0 auto;
    margin-top: 1.88rem;
    background-color: #ffffff;
    border-radius: 1.25rem;
    border-spacing:0; 
    border-collapse: collapse;

    font-weight: 400;
    font-size: 1rem;
    line-height: 1.56rem;
    color: #393939;

    td {
        border-top: 0.06rem solid rgb(0, 0, 0, 0.05);
        padding: 1.25rem 1.88rem;
    }

    thead td {
        border: 0 solid;
        font-size: 1.13rem;
        line-height: 1.69rem;
        font-weight: 600;
    }
`;

export const ButtonContainer = styled.div`
	flex: 1 0 auto;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;

	button {
		padding: 0.81rem 2.06rem;
		padding-bottom: 0.60rem;
		background-color: #F8F8F8;
		border: 0.06rem solid #135846;
		border-radius: 0.75rem;
		font-size: 1rem;
		line-height: 1.56rem;
		font-weight: 600;
		color: #135846;
	}

	span {
		color: #CCCCCC;
		margin-left: 0.75rem;
	}
`;