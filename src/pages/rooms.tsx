/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components';
import { BasicTable, ButtonContainer, MainComponent } from '../styledcomponents/main';
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, selectFetchRoomStatus, selectRooms } from '../redux/slices/room';
import { CircularProgress } from '@mui/material';

const RoomContainer = styled.div`
	display: flex;
	width: 100%;
`;

const RoomCategories = styled.div`
	display: flex;
	width: 60%;
	min-width: 40rem;

	p.selected {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

const RoomCategory = styled.p`
	padding: 0.1rem 1rem;
	border-bottom: 0.06rem solid #D4D4D4;

	&:hover {
		border-bottom: 0.13rem solid #135846;
		color: #135846;
	}
`;

const RoomsPageContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 0.95rem;
	width: 95%;
	margin-top: 0.75rem;
	`;

const RoomsPrev = styled.div`
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

const RoomsNext = styled.div`
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

const RoomInformation = styled.td`
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

const RoomStatus = styled.td`
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

export default function Rooms()
{
	const roomList = useSelector(selectRooms);
	const fetchStatus = useSelector(selectFetchRoomStatus);
	const dispatch = useDispatch();

	useEffect(() => {
		if(!fetchStatus || !roomList || fetchStatus === 'fulfilled')
		{
			dispatch(fetchRooms());
		}
	}, []);
	
	const [basicFilter, updateBasicFilter] = useState<string | null>(null);
	
	const [ascOrder, updateAscOrder] = useState<boolean | null>(true);
	const [priceOrder, updatePriceOrder] = useState<boolean | null>(null);
	const [statusOrder, updateStatusOrder] = useState<boolean | null>(null);
	const [page, updatePage] = useState(0);
	const navigate = useNavigate();

	let basicFiltered = [];
	if(basicFilter === null)
	{
		basicFiltered = [...roomList];
	} else {
		basicFiltered = roomList.filter((room) => room.status.toLowerCase() === basicFilter);
	}

	if(ascOrder !== null)
	{
		if(ascOrder)
		{
			basicFiltered = basicFiltered.sort((a, b) => (+(a.number)) - (+(b.number)));
		} else {
			basicFiltered = basicFiltered.sort((a, b) => (+(b.number)) - (+(a.number)));
		}
	} 
	
	if(priceOrder !== null)
	{
		if(priceOrder)
		{
			basicFiltered = basicFiltered.sort((a, b) => (+(a.price)) - (+(b.price)));
		} else {
			basicFiltered = basicFiltered.sort((a, b) => (+(b.price)) - (+(a.price)));
		}
	} 
	
	if(statusOrder !== null) {
		if(statusOrder)
		{
			basicFiltered = basicFiltered.sort((a, b) => {
				if (a.status < b.status) {
					return -1;
				} else if (a.status > b.status) {
					return 1;
				} else {
					return 0;
				}
			});
		} else {
			basicFiltered = basicFiltered.sort((a, b) => {
				if (a.status > b.status) {
					return -1;
				} else if (a.status < b.status) {
					return 1;
				} else {
					return 0;
				}
			});
		}
	}

	const totalPages = Math.round(basicFiltered.length / 10);

	return ((fetchStatus !== 'fulfilled') ? <MainComponent><CircularProgress /></MainComponent> :
	<Fragment>
		<RoomContainer>
			<RoomCategories>
				<RoomCategory className={(basicFilter === null) ? 'selected' : ''} onClick={() => { updateBasicFilter(null) }}>All Rooms</RoomCategory>
				<RoomCategory className={(basicFilter === 'available') ? 'selected' : ''} onClick={() => { updateBasicFilter('available') }}>Available Roooms</RoomCategory>
				<RoomCategory className={(basicFilter === 'booked') ? 'selected' : ''} onClick={() => { updateBasicFilter('booked') }}>Booked Rooms</RoomCategory>
			</RoomCategories>

			<ButtonContainer>
				<button type='button' className='alternate__button' onClick={ () => { navigate('/room/add') }}>New Room</button>
				
				<button type='button' onClick={() => {
						updateAscOrder(!ascOrder);
						updatePriceOrder(null);
						updateStatusOrder(null);
					}}>{ (ascOrder) ? 
						<Fragment>
							{'Room Number'} <span><FaChevronDown size={14} /></span>
						</Fragment> :
						<Fragment>							
							{'Room Number'} <span><FaChevronUp size={14} /></span>
						</Fragment>} </button>
			</ButtonContainer>
		</RoomContainer>

		<BasicTable>
			<thead>
			<tr>
				<td>Information</td>
				<td>Type</td>
				<td>Amenities</td>
				<td onClick={() => {
						updateAscOrder(null);
						updateStatusOrder(null);
						updatePriceOrder(!priceOrder);
					}}>{ (priceOrder) ? 
						<Fragment>
							{'Price'} <span><FaChevronDown size={14} /></span>
						</Fragment> :
						<Fragment>							
							{'Price'} <span><FaChevronUp size={14} /></span>
						</Fragment>}</td>
				<td>Offer</td>
				<td onClick={() => {
						updateAscOrder(null);
						updatePriceOrder(null);
						updateStatusOrder(!statusOrder);
					}}>{ (statusOrder) ? 
						<Fragment>
							{'Status'} <span><FaChevronDown size={14} /></span>
						</Fragment> :
						<Fragment>							
							{'Status'} <span><FaChevronUp size={14} /></span>
						</Fragment>}</td>
				<td></td>
			</tr>
			</thead>
			<tbody>
			{
				basicFiltered.slice((page*10), ((page+1)*10)).map((room) => {
					return <Fragment key={room.id}>
						<tr>
							<RoomInformation>
								<img src={room.images[0]} alt='Room Image' />
								<div>
									<p className='roomnumber'>ROOM #{room.number}</p>
									<p>#{room.id.split('-')[0]}</p>
									<p>{room.floor}</p>
								</div>
							</RoomInformation>
							<td>{room.type}</td>
							<td>None</td>
							<td><strong>${room.price}</strong> /night</td>
							<td>${Math.floor(room.price * (room.offer / 100))} ({room.offer}%)</td>
							<RoomStatus>
								<p className={room.status}>{room.status}</p>
							</RoomStatus>
							<td><BsThreeDotsVertical color={'#6E6E6E'} size={16} onClick={() => {
								navigate('/room/' + room.id + '/update');
							}} /></td>
						</tr>
					</Fragment>;
				})
			}
			</tbody>
		</BasicTable>

		<RoomsPageContainer>
			{(page !== 0) ? <RoomsPrev onClick={() => {
				const prevPage = page - 1;
				if(prevPage >= 0)
				{
					updatePage(prevPage);                    
				}
			}}><FaArrowLeft size={24} /></RoomsPrev> : ''}
			{(totalPages !== page && totalPages > 1) ? <RoomsNext onClick={() => {
				const nextPage = page + 1;
				if(nextPage <= totalPages)
				{
					updatePage(nextPage);                    
				}
			}}><FaArrowRight size={24} /></RoomsNext> : ''}
		</RoomsPageContainer>
	</Fragment>);
}