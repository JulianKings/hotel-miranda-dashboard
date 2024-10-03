/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react'
import { BasicTable, ButtonContainer, MainComponent } from '../styledcomponents/main';
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { fetchRooms, selectFetchRoomStatus, selectRooms } from '../redux/slices/room';
import { CircularProgress } from '@mui/material';
import { ApiRoomInterface } from '../interfaces/apiManagement';
import { useApiDispatch, useApiSelector } from '../redux/store';
import { RoomContainer, RoomCategories, RoomCategory, RoomInformation, RoomStatus, RoomsPageContainer, RoomsPrev, RoomsNext } from './roomsStyle';

export default function Rooms()
{
	const roomList: ApiRoomInterface[] = useApiSelector(selectRooms);
	const fetchStatus: (string | null) = useApiSelector(selectFetchRoomStatus);
	const dispatch = useApiDispatch();

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
	const [page, updatePage] = useState<number>(0);
	const navigate = useNavigate();

	let basicFiltered: ApiRoomInterface[] = [];
	if(basicFilter === null)
	{
		basicFiltered = [...roomList];
	} else {
		basicFiltered = roomList.filter((room: ApiRoomInterface) => room.status.toLowerCase() === basicFilter);
	}

	if(ascOrder !== null)
	{
		if(ascOrder)
		{
			basicFiltered = basicFiltered.sort((a: ApiRoomInterface, b: ApiRoomInterface) => (+(a.number)) - (+(b.number)));
		} else {
			basicFiltered = basicFiltered.sort((a: ApiRoomInterface, b: ApiRoomInterface) => (+(b.number)) - (+(a.number)));
		}
	} 
	
	if(priceOrder !== null)
	{
		if(priceOrder)
		{
			basicFiltered = basicFiltered.sort((a: ApiRoomInterface, b: ApiRoomInterface) => (+(a.price)) - (+(b.price)));
		} else {
			basicFiltered = basicFiltered.sort((a: ApiRoomInterface, b: ApiRoomInterface) => (+(b.price)) - (+(a.price)));
		}
	} 
	
	if(statusOrder !== null) {
		if(statusOrder)
		{
			basicFiltered = basicFiltered.sort((a: ApiRoomInterface, b: ApiRoomInterface) => {
				if (a.status < b.status) {
					return -1;
				} else if (a.status > b.status) {
					return 1;
				} else {
					return 0;
				}
			});
		} else {
			basicFiltered = basicFiltered.sort((a: ApiRoomInterface, b: ApiRoomInterface) => {
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

	const totalPages: number = Math.round(basicFiltered.length / 10);

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
				basicFiltered.slice((page*10), ((page+1)*10)).map((room: ApiRoomInterface) => {
					return <Fragment key={room._id}>
						<tr>
							<RoomInformation>
								<img src={room.images[0]} alt='Room Image' />
								<div>
									<p className='roomnumber'>ROOM #{room.number}</p>
									<p>#{(room._id !== undefined) ? room._id.split('-')[0] : ''}</p>
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
								navigate('/room/' + room._id + '/update');
							}} /></td>
						</tr>
					</Fragment>;
				})
			}
			</tbody>
		</BasicTable>

		<RoomsPageContainer>
			{(page !== 0) ? <RoomsPrev onClick={() => {
				const prevPage: number = page - 1;
				if(prevPage >= 0)
				{
					updatePage(prevPage);                    
				}
			}}><FaArrowLeft size={24} /></RoomsPrev> : ''}
			{(totalPages !== page && totalPages > 1) ? <RoomsNext onClick={() => {
				const nextPage: number = page + 1;
				if(nextPage <= totalPages)
				{
					updatePage(nextPage);                    
				}
			}}><FaArrowRight size={24} /></RoomsNext> : ''}
		</RoomsPageContainer>
	</Fragment>);
}