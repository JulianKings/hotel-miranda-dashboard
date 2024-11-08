/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react'
import { ButtonContainer, MainComponent } from '../styledcomponents/main';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchRooms, selectFetchRoomStatus, selectRooms } from '../redux/slices/room';
import { CircularProgress } from '@mui/material';
import { ApiAbstractInterface, ApiAmenitiesInterface, ApiRoomInterface } from '../interfaces/apiManagement';
import { useApiDispatch, useApiSelector } from '../redux/store';
import { RoomContainer, RoomCategories, RoomCategory } from './roomsStyle';
import { Sortable, TableSchema } from '../interfaces/tableManagement';
import { TableModule } from '../components/TableModuleComponent';
import { selectAmenities } from '../redux/slices/amenities';

const roomTableSchema: TableSchema[] = [
	{id: 'room', type: 'room_information', name: 'Information', sortable: false},
	{id: 'type', type: 'default', name: 'Type', sortable: false},
	{id: 'amenities', type: 'room_amenities', name: 'Amenities', sortable: false},
	{id: 'price', type: 'price', name: 'Price', sortable: true},
	{id: 'offer', type: 'room_offer', name: 'Offer', sortable: false},
	{id: 'status', type: 'room_status', name: 'Status', sortable: true},
	{id: 'action', type: 'actions', name: '', sortable: false}
];

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
	const [currentSortFilter, updateSortFilter] = useState<Sortable>({id: 'number', type: 'asc', mode: 'number'});
	
	const navigate = useNavigate();

	const amenities: ApiAmenitiesInterface[] = useApiSelector(selectAmenities);
    let improvedSearchResult: ApiRoomInterface[] = [];
	if(amenities.length > 0)
    {
        improvedSearchResult = roomList.map((room: ApiRoomInterface) => {
			return {...room, 
				amenities: room.amenities.map((amenity: string) => {
					const result = amenities.find((item: ApiAmenitiesInterface) => {
						return item._id === amenity;
					});
					return (result) ? result.name : amenity;
				})
			};
		})
    } else {
		improvedSearchResult = roomList;
	}

	const searchResult: ApiRoomInterface[] = improvedSearchResult.filter((room: ApiRoomInterface) => {
		let valid = true;

		if(basicFilter && room)
		{
			valid = (room.status.toLowerCase() === basicFilter);
		}
		
		return valid;
	});

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
						updateSortFilterAction('number');
					}}>{ (currentSortFilter.id === 'number' && currentSortFilter.type === 'asc') ? 
						<Fragment>
							{'Room Number'} <span><FaChevronUp size={14} /></span>
						</Fragment> :
						<Fragment>							
							{'Room Number'} <span><FaChevronDown size={14} /></span>
						</Fragment>} </button>
			</ButtonContainer>
		</RoomContainer>

		<TableModule tableType='room' tableDataSchema={roomTableSchema} tableContent={searchResult as ApiAbstractInterface[]} updateSortFilter={updateSortFilterAction} currentSortFilter={currentSortFilter} />		
	</Fragment>);

	function updateSortFilterAction(id: string): void
	{
		const sortMode = (id.includes('status')) ? 'string' : 'number';
		if(currentSortFilter.id === id)
		{
			updateSortFilter({id: id, type: (currentSortFilter.type === 'asc') ? 'desc' : 'asc', mode: sortMode});
		} else {
			updateSortFilter({id: id, type: 'asc', mode: sortMode});
		}
	}
}