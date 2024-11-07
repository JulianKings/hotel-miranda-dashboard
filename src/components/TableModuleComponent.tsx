import { Fragment } from "react/jsx-runtime";
import { TableModuleProp } from "../interfaces/componentTableProps";
import { TableSchema } from "../interfaces/tableManagement";
import { BasicTable } from "../styledcomponents/main";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ApiAbstractInterface, ApiClientInterface, ApiRoomInterface } from "../interfaces/apiManagement";
import NestedViewNotes from "./NestedViewNotes";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BookingStatus } from "../pages/bookingsStyle";

export function TableModule({ tableType, tableDataSchema, tableContent, updateSortFilter, currentSortFilter }: TableModuleProp)
{
    const navigate = useNavigate();

    return <BasicTable>
        <thead>
            <tr>
                {
                    tableDataSchema.map((schema: TableSchema) => {
                        return <Fragment>
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
                tableContent.map((item: ApiAbstractInterface) => {
                    return <Fragment key={item._id}>
                        <tr>
                            {
                                tableDataSchema.map((schema: TableSchema) => {
                                    type KeyOf = keyof typeof item;
                                    const K = schema.id as KeyOf;
                                    const value: string | number | Date | ApiAbstractInterface = item[K] as string | number | Date | ApiAbstractInterface;

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
                                        case 'booking_status':
                                            return <BookingStatus key={schema.id}>
                                            <p className={value as string}>
                                                {(value as string).replace('_', ' ')}
                                            </p>
                                        </BookingStatus>
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
}