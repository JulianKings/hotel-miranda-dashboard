export type InputType = (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement);

export interface FormSchema {
    id: string;
    type: string;
}

export interface SelectFormSchema extends FormSchema {
    type: 'select';
    options: SelectFormSchemaOption[];
}

export interface SelectFormSchemaOption {
    name: string;
    value: string;
}

export interface ApiRoomSignatureInterface {
    type: "type",
    floor: "floor",
    number: "number",        
    amenities: "amenities",
    images: "images",
    price: "price",
    offer: "offer",
    status: "status",
    description: "description"
}