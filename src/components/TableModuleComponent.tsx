import { Fragment } from "react/jsx-runtime";
import { TableModuleProp } from "../interfaces/componentTableProps";
import { TableSchema } from "../interfaces/tableManagement";
import { BasicTable } from "../styledcomponents/main";
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ApiAbstractInterface, ApiClientInterface, ApiRoomInterface } from "../interfaces/apiManagement";
import NestedViewNotes from "./NestedViewNotes";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BookingStatus } from "../pages/bookingsStyle";
import { TablePageContainer, TablePrev, TableNext } from "./TableModuleStyle";
import { useState } from "react";
import { RoomInformation, RoomStatus } from "../pages/roomsStyle";
import NestedViewMore from "./NestedViewMore";

export function TableModule({ tableType, tableDataSchema, tableContent, updateSortFilter, currentSortFilter }: TableModuleProp)
{
    const navigate = useNavigate();
    const [page, updatePage] = useState<number>(0);		
	const totalPages: number = Math.round(tableContent.length / 10);

    if(tableContent.length > 0)
    {
        tableContent = tableContent.slice().sort((a: ApiAbstractInterface, b: ApiAbstractInterface) => {
            if(a && b)
            {
                type KeyOfA = keyof typeof a;
                const aK = currentSortFilter.id as KeyOfA;
                const aV: string | number | Date | ApiAbstractInterface = a[aK] as string | number | Date | ApiAbstractInterface;
                type KeyOfB = keyof typeof b;
                const bK = currentSortFilter.id as KeyOfB;
                const bV: string | number | Date | ApiAbstractInterface = b[bK] as string | number | Date | ApiAbstractInterface;

                if(currentSortFilter.mode === 'date')
                {
                    if(aV instanceof Date && bV instanceof Date)
                    {
                        if (new Date(aV) < new Date(bV)) {
                            return -1;
                        } else if (new Date(aV) > new Date(bV)) {
                            return 1;
                        } else {
                            return 0;
                        }
                    } else if(aV && bV) {
                        if (new Date(Date.parse(aV as string)) < new Date(Date.parse(bV as string))) {
                            return -1;
                        } else if (new Date(Date.parse(aV as string)) > new Date(Date.parse(bV as string))) {
                            return 1;
                        } else {
                            return 0;
                        }
                    } else {
                        return -2;
                    }
                } else if(currentSortFilter.mode === 'string') {
                    if(aV !== null && bV !== null) {
                        return (bV as string).localeCompare((aV as string))
                    } else if(aV === null && bV === null) {
                        return 0;
                    }
                } else {
                    return (aV as number) - (bV as number);
                }
            }

            return -3;
        });

        if(currentSortFilter.type === 'desc')
        {
            tableContent = tableContent.reverse();
        }
    }

    return (<>
    <BasicTable>
        <thead>
            <tr>
                {
                    tableDataSchema.map((schema: TableSchema) => {
                        return <Fragment key={schema.id}>
                            <td onClick={() => { if(schema.sortable) { updateSortFilter(schema.id) } }}>
                                {schema.name}

                                {(schema.sortable ? currentSortFilter.id === schema.id ? 
                                    (currentSortFilter.type === 'asc' ? 
                                        <span> <FaChevronUp size={14} /></span> : 
                                        <span> <FaChevronDown size={14} /></span>)
                                    : <span> <FaChevronDown size={14} /></span> 
                                : "")}
                            </td>
                        </Fragment>
                    })
                }
            </tr>
        </thead>

        <tbody>
            {
                (tableContent.length > 0) ? 
                tableContent.slice((page*10), ((page+1)*10)).map((item: ApiAbstractInterface) => {
                    console.log(item);
                    return <Fragment key={item._id}>
                        <tr>
                            {
                                tableDataSchema.map((schema: TableSchema) => {
                                    type KeyOf = keyof typeof item;
                                    const K = schema.id as KeyOf;
                                    const value: string | number | Date | ApiAbstractInterface | string[] = item[K] as string | number | Date | ApiAbstractInterface | string[];

                                    switch(schema.type)
                                    {
                                        case 'booking_client':
                                            return <Fragment key={schema.id}>
                                                <td>{(value as ApiClientInterface).name}</td>
                                            </Fragment>
                                        case 'booking_room':
                                            const room = value as ApiRoomInterface;
                                            return <Fragment key={schema.id}>
                                                <td>Room #{room.number}<br />
                                                {room.type}</td>
                                            </Fragment>
                                        case 'date':
                                            return <Fragment key={schema.id}>
                                                <td>{new Date(value as Date).toDateString()}</td>
                                            </Fragment>
                                        case 'view_notes':
                                            return <Fragment key={schema.id}>
                                                <td>
                                                    <NestedViewNotes content={value as string} />
                                                </td>
                                            </Fragment>
                                        case 'room_amenities':
                                            return <td>
                                                    <NestedViewNotes content={(value as string[]).join(', ')} prompt='View Amenities' />
                                                </td>
                                        case 'booking_status':
                                            return <BookingStatus key={schema.id}>
                                            <p className={value as string}>
                                                {(value as string).replace('_', ' ')}
                                            </p>
                                        </BookingStatus>
                                        case 'room_information':
                                        {
                                            const roomData = item as ApiRoomInterface;
                                            return <RoomInformation>
                                                <img src={roomData.images} alt='Room Image' />
                                                <div>
                                                    <p className='roomnumber'>Room #{roomData.number}</p>
                                                    <p>#{(roomData._id !== undefined) ? roomData._id : ''}</p>
                                                    <p>{roomData.floor}</p>
                                                </div>
                                            </RoomInformation>;
                                        }
                                        case 'price':
                                            return <td>
                                                <strong>${(value as number)/100}</strong> /night
                                            </td>    
                                        case 'room_offer':
                                        {
                                            const roomData = item as ApiRoomInterface;
                                            return <td>
                                                ${Math.round(((roomData.price) - (roomData.price * (roomData.offer / 100))))/100} ({roomData.offer}%)
                                            </td>
                                        }
                                        case 'room_status':
                                            return <RoomStatus>
                                                <p className={value as string}>{value as string}</p>
                                            </RoomStatus>
                                        case 'actions':
                                            return <Fragment key={schema.id}>
                                                <td><BsThreeDotsVertical color={'#6E6E6E'} size={16} onClick={() => {
                                                    navigate('/' + tableType + '/' + item._id + '/update');
                                                }} /></td>
                                            </Fragment>
                                        default:
                                            return <Fragment key={schema.id}>
                                                <td>{value as string}</td>
                                            </Fragment>
                                    }
                                })
                            }
                        </tr>
                    </Fragment>;
                    })
                : 
                    <Fragment>
                        <tr>
                            <td colSpan={tableDataSchema.length}>No data available.</td>
                        </tr>
                    </Fragment>
            }
        </tbody>
    </BasicTable>

    <TablePageContainer>
        {(page !== 0) ? <TablePrev onClick={() => {
            const prevPage: number = page - 1;
            if(prevPage >= 0)
            {
                updatePage(prevPage);                    
            }
        }}><FaArrowLeft size={24} /></TablePrev> : ''}
        {(totalPages !== page && totalPages > 1) ? <TableNext onClick={() => {
            const nextPage: number = page + 1;
            if(nextPage <= totalPages)
            {
                updatePage(nextPage);                    
            }
        }}><FaArrowRight size={24} /></TableNext> : ''}
    </TablePageContainer>
    </ >);
    
}