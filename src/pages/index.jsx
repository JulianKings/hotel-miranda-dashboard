import { BsFillHouseFill } from 'react-icons/bs';
import { IoBed } from 'react-icons/io5';
import { MdLogout, MdOutlineLogin } from 'react-icons/md';
import styled from 'styled-components';

const KPIHolder = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(21.25rem, 1fr));
	gap: 1.38rem;`;

const KPIItem = styled.div`
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

const KPIItemImage = styled.div`
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

const KPIItemText = styled.p`
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

export default function Index()
{
	return (
		<>
			<KPIHolder>
				<KPIItem>
					<KPIItemImage><IoBed size={28} /></KPIItemImage>
					<KPIItemText>
						<p>8,461</p>
						<span>Bookings</span>
					</KPIItemText>
				</KPIItem>

				<KPIItem>
					<KPIItemImage><BsFillHouseFill size={28} /></KPIItemImage>
					<KPIItemText>
						<p>76,5%</p>
						<span>Scheduled Rooms</span>
					</KPIItemText>
				</KPIItem>

				<KPIItem>
					<KPIItemImage><MdOutlineLogin size={28} /></KPIItemImage>
					<KPIItemText>
						<p>753</p>
						<span>Check In</span>
					</KPIItemText>
				</KPIItem>
				
				<KPIItem>
					<KPIItemImage><MdLogout size={28} /></KPIItemImage>
					<KPIItemText>
						<p>516</p>
						<span>Check Out</span>
					</KPIItemText>
				</KPIItem>
			</KPIHolder>
		</>
	)
}