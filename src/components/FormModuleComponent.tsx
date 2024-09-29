import { Fragment } from "react/jsx-runtime";
import { ApiBookingInterface, ApiRoomInterface, ApiUserInterface } from "../interfaces/apiManagement";
import { ErrorPropTypes, FormButtonPropTypes, FormModuleProp } from "../interfaces/componentProps";
import { MainComponent } from "../styledcomponents/main";
import { FormBox, FormInput, FormInputBox, FormSelect, FormTextAreaBox, FormTitle } from "./FormModuleStyle";
import { useMultiRef } from "@upstatement/react-hooks";
import { FocusEvent, useState } from "react";
import { FormSchema, SelectFormSchema } from "../interfaces/formManagement";

export function FormModule({ formType, editMode, formDataObject, formDataSchema }: FormModuleProp)
{
    const [inputList, addInputList] = useMultiRef<HTMLInputElement>();
    let inputCount = 0;
    const [selectList, addSelectList] = useMultiRef<HTMLSelectElement>();
    let selectCount = 0;
    const [textAreaList, addTextAreaList] = useMultiRef<HTMLTextAreaElement>();
    let textAreaCount = 0;
    
    const [inputErrorId, setInputErrorId] = useState<string | null>(null);

    switch(formType)
    {
        case 'room':
            if(instanceOfRoom(formDataObject) || editMode === false)
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

                console.log(formDataObject);

                const propertiesForm = roomPropertiesList.map((key) => {
                    const schemaType = formDataSchema.find((schema: FormSchema) => schema.id === key);
                    
                    if(key === '_id')
                    {
                        return;
                    } else if(schemaType !== undefined)
                    {
                        switch(schemaType.type)
                        {
                            case 'select':
                                selectCount++;
                                const schemaTypeOptions = schemaType as SelectFormSchema;
                                const selectOptions = schemaTypeOptions.options.map((option) => {
                                    return (formDataObject && (instanceOfRoom(formDataObject)) && formDataObject[key] === option.value) ? 
                                    <Fragment><option value={option.value} selected>{option.name}</option></Fragment> : 
                                    <Fragment><option value={option.value}>{option.name}</option></Fragment>
                                });

                                return <Fragment>
                                    <FormInputBox>
                                        <label htmlFor={key}>Room {key}</label>
                                        <FormSelect key={(inputCount-1)} ref={addSelectList((inputCount-1))} id={key} $showError={(inputErrorId === key)}>
                                            {selectOptions}
                                        </FormSelect>
                                    </FormInputBox>
                                </Fragment>;
                            case 'textarea':
                                return;
                            default:
                                inputCount++;
                                return <Fragment>
                                    <FormInputBox>
                                        <label htmlFor={key}>Room {key}</label>
                                        <FormInput key={(inputCount-1)} id={key} defaultValue={(formDataObject && (instanceOfRoom(formDataObject)) && formDataObject[key]) ? formDataObject[key] : ''} 
                                                ref={addInputList((inputCount-1))}
                                                $showError={(inputErrorId === key)} 
                                                onBlur={(event) => validateField(event)}  />
                                    </FormInputBox>
                                </Fragment>;
                        }
                    } else {                    
                        inputCount++;
                        return <Fragment>
                            <FormInputBox>
                                <label htmlFor={key}>Room {key}</label>
                                <FormInput key={(inputCount-1)} id={key} defaultValue={(formDataObject && (instanceOfRoom(formDataObject)) && formDataObject[key]) ? formDataObject[key] : ''} 
                                        ref={addInputList((inputCount-1))}
                                        $showError={(inputErrorId === key)} 
                                        onBlur={(event) => validateField(event)}  />
                            </FormInputBox>
                        </Fragment>;
                    }
                });

                const extraForms = formDataSchema.map((schema) => {
                    switch (schema.type)
                    {
                        case 'textarea':
                            textAreaCount++;
                            const objectKey = (schema.id as keyof ApiRoomInterface) 
                            return <Fragment>
                                <FormTextAreaBox>
                                    <label htmlFor={schema.id}>Room {schema.id}</label>
                                    <textarea key={(textAreaCount - 1)} ref={addTextAreaList(textAreaCount - 1)} 
                                    id={schema.id} cols={46} rows={6}>{(formDataObject && (instanceOfRoom(formDataObject)) && 
                                    formDataObject[objectKey]) ? formDataObject[objectKey] : ''}</textarea>
                                </FormTextAreaBox>
                            </Fragment>;
                    }
                })

                return <Fragment>
                    <FormTitle>{(editMode) ? 'Edit Room' : 'Create Room'}</FormTitle>
                    <FormBox>
                        {propertiesForm}
                    </FormBox>
                    {extraForms}
                </Fragment>
            }
        case 'user':
            break;
        case 'default':
            break;
        default:
            return <Fragment>
                <MainComponent>
                    Unable to render a form: <strong>invalid type '{formType}'</strong>.
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