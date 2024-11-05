export interface ApiAbstractInterface
{
    _id: string | undefined;
}

export interface ApiUserInterface extends ApiAbstractInterface {
    name: string;
    full_name: string;
    password: string;
    mail: string;
    profile_picture: string;
    start: Date;
    description: string;
    contact: string;
    status: 'active' | 'inactive';
    position: 'manager' | 'room_service' | 'reception';
}

export interface ApiRoomInterface extends ApiAbstractInterface {
    type: 'Single Bed' | 'Double Bed' | 'Double Superior' | 'Suite';
    floor: string;
    number: number;        
    amenities: string[];
    images: string;
    price: number;
    offer: number;
    status: 'available' | 'maintenance' | 'booked';
    description: string;
}

export interface ApiContactInterface extends ApiAbstractInterface {
    customer_name: string;
    customer_mail: string;
    customer_phone: string;
    date: Date;
    status: 'archived' | 'active';
    subject: string;
    comment: string;
}

export interface ApiBookingInterface extends ApiAbstractInterface {
    customer_name: string;
    date: Date;
    status: 'checking_out' | 'checking_in' | 'in_progress';
    room: ApiRoomInterface;
    check_in: Date;
    check_out: Date;
    notes: string;    
    client: ApiClientInterface;
}

export interface ApiPostBookingInterface extends ApiAbstractInterface {
    customer_name: string;
    date: Date;
    status: 'checking_out' | 'checking_in' | 'in_progress';
    room: string;
    check_in: Date;
    check_out: Date;
    notes: string;    
}

export interface ApiClientInterface extends ApiAbstractInterface {
    name: string,
    email: string,
    created_at: Date,
    updated_at: Date,
}

export interface ApiAmenitiesInterface extends ApiAbstractInterface {
    name: string;  
}

export type NullableApiBookingInterface = ApiBookingInterface | null;
export type NullableApiContactInterface = ApiContactInterface | null;
export type NullableApiRoomInterface = ApiRoomInterface | null;
export type NullableApiUserInterface = ApiUserInterface | null;
export type NullableClientInterface = ApiClientInterface | null;
export type NullableApiAmenitiesInterface = ApiAmenitiesInterface | null;