import { Fragment } from "react/jsx-runtime";
import { ApiBookingInterface, ApiRoomInterface, ApiUserInterface } from "../interfaces/apiManagement";
import { ErrorPropTypes, FormButtonPropTypes, FormModuleProp } from "../interfaces/componentProps";
import { MainComponent } from "../styledcomponents/main";
import styled from "styled-components";

const FormTitle = styled.p`
    font-size: 1.2rem;
    font-weight: 600;
    `;

const FormButton = styled.button<FormButtonPropTypes>`
    border-radius: 0.19rem;
    border: ${props => props.buttonColor ? '0.13rem solid ' + props.buttonColor : '0.13rem solid #135846'};
    background: ${props => props.buttonColor ? props.buttonColor : '#135846'};
    color: white;
    margin: 0.75rem 0;
    padding: 0.25rem 1rem;
    width: 40%;
    max-width: 30ch;`

const FormInput = styled.input.attrs({
        type: "text",
    })<ErrorPropTypes>`
    border: 0;
    background-color: white;
    padding: 0.45rem 0.35rem;
    border-radius: 0.25rem;
    width: 40%;
    max-width: 30ch;
    border: ${props => props.showError ? '0.16rem solid #df0000' : '0rem solid'};

    &:focus {
        outline: none;
    }
`;

export function FormModule({ formType, editMode, formDataObject }: FormModuleProp)
{
    switch(formType)
    {
        case 'room':
            if(instanceOfRoom(formDataObject))
            {
                type definitionObject = Record<(keyof ApiRoomInterface), undefined>;
                const roomProperties: definitionObject = {
                    id: undefined,
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
                    return <Fragment>

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