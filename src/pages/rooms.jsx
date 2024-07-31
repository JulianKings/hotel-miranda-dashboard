import { Fragment, useState } from 'react'
import styled from 'styled-components';
import { roomArray } from '../data/room';
import { BasicTable } from '../styledcomponents/main';

const RoomCategories = styled.div`
	display: flex;
	width: 60%;
	min-width: 40rem;
`;

const RoomCategory = styled.p`
	padding: 0.1rem 1rem;
	border-bottom: 0.06rem solid #D4D4D4;

	&:hover {
		border-bottom: 0.13rem solid #135846;
	}
`;

export default function Rooms()
{
	const roomList = JSON.parse(roomArray);
	const [basicFilter, updateBasicFilter] = useState(null);
	
	let basicFiltered = [];
	if(basicFilter === null)
	{
		basicFiltered = [...roomList];
	} else {
		basicFiltered = roomList.filter((room) => room.status.toLowerCase() === basicFilter);
	}

	return (<>
		<RoomCategories>
			<RoomCategory onClick={() => { updateBasicFilter(null) }}>All Rooms</RoomCategory>
			<RoomCategory onClick={() => { updateBasicFilter('available') }}>Available Roooms</RoomCategory>
			<RoomCategory onClick={() => { updateBasicFilter('booked') }}>Booked Rooms</RoomCategory>
		</RoomCategories>

		<BasicTable>
			<thead>
			<tr>
				<td>Name</td>
				<td>Type</td>
				<td>Room Floor</td>
				<td>Facilities</td>
				<td>Price</td>
				<td>Offer</td>
				<td>Status</td>
				<td></td>
			</tr>
			</thead>
			<tbody>
			{
				basicFiltered.map((room) => {
					return <Fragment key={room.id}>
						<tr>
            <td>ROOM {room.number}</td>
            <td>{room.type}</td>
            <td>{room.floor}</td>
            <td>None</td>
            <td>${room.price}</td>
            <td>${Math.floor(room.price * (room.offer / 100))}</td>
            <td>{room.status}</td>
            <td></td>
						</tr>
					</Fragment>;
				})
			}
			</tbody>
		</BasicTable>
	</>);
}