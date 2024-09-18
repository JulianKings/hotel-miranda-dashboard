import { Fragment } from "react/jsx-runtime";
import { ApiBookingInterface, ApiRoomInterface, ApiUserInterface } from "../interfaces/apiManagement";
import { ErrorPropTypes, FormButtonPropTypes, FormModuleProp } from "../interfaces/componentProps";
import { MainComponent } from "../styledcomponents/main";
import { FormInput, FormTitle } from "./FormModuleStyle";
import { useMultiRef } from "@upstatement/react-hooks";
import { FocusEvent, useState } from "react";

export function FormModule({ formType, editMode, formDataObject }: FormModuleProp)
{
    const [inputList, addInputList] = useMultiRef<HTMLInputElement>();
    let inputCount = 0;
    const [inputErrorId, setInputErrorId] = useState<string | null>(null);

    switch(formType)
    {
        case 'room':
            if(instanceOfRoom(formDataObject))
            {
                type definitionObject = Record<(keyof ApiRoomInterface), undefined>;
                const roomProperties: definitionObject = {
                    _id: undefined,
                    type: undefined,
                    floor: undefined,
                    number: undefined,        
                    amenities: undefined,
                    images: undefined,
                    price: undefined,
                    offer: undefined,
                    status: undefined,
                    description: undefined
                }

                const roomPropertiesList = Object.keys(roomProperties) as (keyof ApiRoomInterface)[];

                const propertiesForm = roomPropertiesList.map((key) => {
                    inputCount++;
                    return <Fragment>
                        <label htmlFor={key}>Customer Name</label>
                        <FormInput key={(inputCount-1)} id={key} defaultValue={(formDataObject && formDataObject[key]) ? formDataObject[key] : ''} 
                                ref={addInputList((inputCount-1))}
                                showError={(inputErrorId === key)} 
                                onBlur={(event) => validateField(event)}  />
                    </Fragment>;
                });
                return <Fragment>
                    <FormTitle>{(editMode) ? 'Edit Room' : 'Create Room'}</FormTitle>
                    {propertiesForm}
                </Fragment>
            }
        case 'user':
            break;
        case 'default':
            break;
        default:
            return <Fragment>
                <MainComponent>
                    Unable to render a form: <strong>invalid type</strong>.
                </MainComponent>
            </Fragment>
    }

    function validateField(event: FocusEvent<HTMLInputElement>): void
    {
        if(event.target)
        {
            setInputErrorId(null);
        }
    }
}

function instanceOfUser(object: any): object is ApiUserInterface {
    return object;
}

function instanceOfBooking(object: any): object is ApiBookingInterface {
    return object;
}

function instanceOfRoom(object: any): object is ApiRoomInterface {
    return object;
}