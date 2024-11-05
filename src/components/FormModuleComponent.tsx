import { Fragment } from "react/jsx-runtime";
import { ApiAbstractInterface, ApiBookingInterface, ApiRoomInterface, ApiUserInterface } from "../interfaces/apiManagement";
import { MainComponent } from "../styledcomponents/main";
import { FormBox, FormButton, FormCheckboxBox, FormCheckboxContainer, FormInput, FormInputBox, FormItem, FormNumberInput, FormSelect, FormTextAreaBox, FormTitle } from "./FormModuleStyle";
import { useMultiRef } from "@upstatement/react-hooks";
import { FocusEvent, FormEvent, useState } from "react";
import { CheckboxFormSchema, FormSchema, SelectFormSchema } from "../interfaces/formManagement";
import { FormModuleProp } from "../interfaces/componentFormProps";
import { FormCheckbox } from "./FormCheckboxComponent";
import { useNavigate } from "react-router-dom";

export function FormModule({ formType, editMode, formDataObject, formDataSchema, onFormSubmit }: FormModuleProp)
{
    const [inputList, addInputList] = useMultiRef<HTMLInputElement>();
    let inputCount = 0;
    const [selectList, addSelectList] = useMultiRef<HTMLSelectElement>();
    let selectCount = 0;
    const [textAreaList, addTextAreaList] = useMultiRef<HTMLTextAreaElement>();
    let textAreaCount = 0;
    const [checkboxList, addCheckboxList] = useMultiRef<HTMLInputElement>();
    
    const [inputErrorId, setInputErrorId] = useState<string | null>(null);

    let propertiesForm = null;
    let extraForms = null;
    let formTitle = '';
    let deleteButton = '';
    let deleteButtonLink = '';

    const navigate = useNavigate();

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

                formTitle = (editMode) ? 'Edit Room' : 'Create Room';
                deleteButton = (editMode) ? 'Delete Room' : '';
                deleteButtonLink = (formDataObject) ? '/booking/' + (formDataObject._id) + '/delete' : '';

                const roomPropertiesList = Object.keys(roomProperties) as (keyof ApiRoomInterface)[];

                propertiesForm = roomPropertiesList.map<JSX.Element | null>((key): JSX.Element | null => {
                    const schemaType = formDataSchema.find((schema: FormSchema) => schema.id === key);
                    
                    if(key === '_id' || key === 'amenities')
                    {
                        return null;
                    } else if(schemaType !== undefined)
                    {
                        return printInputs(schemaType, formDataObject, key, 'Room');
                    } else {                    
                        inputCount++;
                        return printInputs({ type: "null", id: key }, formDataObject, key, 'Room');
                    }
                });

                extraForms = formDataSchema.map((schema) => {
                            
                    return printExtraForms(schema, formDataObject, 'Room');
                })
            }
            break;
        case 'user':
            if(instanceOfUser(formDataObject) || editMode === false)
            {
                type definitionObject = Record<(keyof ApiUserInterface), undefined>;
                const roomProperties: definitionObject = {
                    _id: undefined,
                    name: undefined,
                    full_name: undefined,
                    password: undefined,
                    mail: undefined,
                    profile_picture: undefined,
                    start: undefined,
                    description: undefined,
                    contact: undefined,
                    status: undefined,
                    position: undefined
                }

                formTitle = (editMode) ? 'Edit User' : 'Create User';
                deleteButton = (editMode) ? 'Delete User' : '';
                deleteButtonLink = (formDataObject) ? '/user/' + (formDataObject._id) + '/delete' : '';

                const roomPropertiesList = Object.keys(roomProperties) as (keyof ApiRoomInterface)[];

                propertiesForm = roomPropertiesList.map<JSX.Element | null>((key): JSX.Element | null => {
                    const schemaType = formDataSchema.find((schema: FormSchema) => schema.id === key);
                    
                    if(key === '_id')
                    {
                        return null;
                    } else if(schemaType !== undefined)
                    {
                        return printInputs(schemaType, formDataObject, key, 'Room');
                    } else {                    
                        inputCount++;
                        return printInputs({ type: "null", id: key }, formDataObject, key, 'Room');
                    }
                });

                extraForms = formDataSchema.map((schema) => {
                            
                    return printExtraForms(schema, formDataObject, 'Room');
                })
            }
            break;
        case 'default':
            break;
        default:
            propertiesForm = <Fragment>
                <MainComponent>
                    Unable to render a form: <strong>invalid type '{formType}'</strong>.
                </MainComponent>
            </Fragment>
    }

    return <Fragment>
        <FormTitle>{formTitle}</FormTitle>
        <FormItem onSubmit={submitForm}>
            <FormBox>
                {propertiesForm}
            </FormBox>

            {extraForms}

            <FormButton buttonColor={'#135846'}>{formTitle}</FormButton>
            {(editMode) ? <Fragment>
                <FormButton type='button' buttonColor={'#DF0000'}
                    onClick={() => {
                        if(formDataObject)
                        {
                            navigate(deleteButtonLink);
                        }
                    }}>{deleteButton}</FormButton>
            </Fragment> : ''}
        </FormItem>
    </Fragment>

    function submitForm(event: FormEvent<HTMLFormElement>): void
    {
        event.preventDefault();
        event.stopPropagation();

        const inputResult: ApiAbstractInterface = { _id: (editMode && formDataObject !== null) ? formDataObject._id : undefined };
        const inputs: boolean = validInput(inputList.current, inputResult);
        const selects: boolean = validInput(selectList.current, inputResult);
        const textareas: boolean = validInput(textAreaList.current, inputResult);
        const checkboxes: boolean = validInput(checkboxList.current, inputResult);

        let error: boolean = (inputs && selects && textareas && checkboxes);

        if(!error)
        {
            onFormSubmit(inputResult);
        }
    }

    function validateField(event: FocusEvent<HTMLInputElement>): void
    {
        if(event.target)
        {
            setInputErrorId(null);
        }
    }

    function validInput(inputs: (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[], inputObject: any): boolean {
        let error: boolean = false;
        const amenities: string[] = [];

        inputs.forEach((input: (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)) => {
            const value = input.value;

            if(input.id.toLowerCase().startsWith('amen'))
            {
                const activeInput = input as HTMLInputElement;
                const amenityId = input.id.split('-')[1];
                if(activeInput.checked)
                {
                    amenities.push(amenityId);
                }
            } else {
                if(value.length < 1)
                {                    
                    //setInputError('Please fill every field before trying to update.');
                    setInputErrorId(input.id);
                    error = true;
                } else {
                    inputObject[input.id] = input.value;
                }
            }
        })

        if(amenities.length > 0)
        {
            inputObject.amenities = amenities;
        }

        return error;
    }

    function printInputs(schemaType: FormSchema, formDataObject: ApiAbstractInterface | null, key: string, type: string): JSX.Element | null
    {
        type keyOf = keyof ApiAbstractInterface;
        const k = key as keyOf;
        switch(schemaType.type)
        {
            case 'select':
                selectCount++;
                const schemaTypeOptions = schemaType as SelectFormSchema;
                const selectOptions = schemaTypeOptions.options.map((option) => {
                    return <Fragment key={option.value}>
                        <option value={option.value} >{option.name}</option>
                    </Fragment>;
                });

                return <FormInputBox key={'select-' + (selectCount-1)}>
                        <label htmlFor={key}>{type} {key}</label>
                        <FormSelect key={(selectCount-1)} ref={addSelectList((selectCount-1))} id={key} $showError={(inputErrorId === key)}
                            defaultValue={(formDataObject && formDataObject[k]) ? formDataObject[k] : ''}>
                            {selectOptions}
                        </FormSelect>
                </FormInputBox>;
            case 'textarea':
            case 'checkbox':
                return null;
            case 'number':                                
                inputCount++;
                return <FormInputBox key={'input-' + (inputCount-1)}>
                        <label htmlFor={key}>{type} {key}</label>
                        <FormNumberInput key={(inputCount-1)} id={key} defaultValue={(formDataObject && formDataObject[k]) ? formDataObject[k] : ''} 
                            ref={addInputList((inputCount-1))}
                            $showError={(inputErrorId === key)} 
                            onBlur={(event) => validateField(event)}  />
                </FormInputBox>;
            default:
            case null:
                inputCount++;
                return <FormInputBox key={'input-' + (inputCount-1)}>
                        <label htmlFor={key}>{type} {key}</label>
                        <FormInput key={(inputCount-1)} id={key} defaultValue={(formDataObject && formDataObject[k]) ? formDataObject[k] : ''} 
                                ref={addInputList((inputCount-1))}
                                $showError={(inputErrorId === key)} 
                                onBlur={(event) => validateField(event)}  />
                </FormInputBox>
        }
    }

    function printExtraForms(schema: FormSchema, formDataObject: ApiAbstractInterface | null, type: string): JSX.Element | null
    {
        const objectKey = (schema.id as keyof ApiRoomInterface);                    
        switch (schema.type)
        {
            case 'textarea':
                textAreaCount++;
                return <FormTextAreaBox $showError={(inputErrorId === objectKey)} key={'textarea-' + (textAreaCount-1)}>
                        <label htmlFor={schema.id}>{type} {schema.id}</label>
                        <textarea key={(textAreaCount - 1)} ref={addTextAreaList(textAreaCount - 1)} 
                        id={schema.id} cols={46} rows={6} defaultValue={(formDataObject && (instanceOfRoom(formDataObject)) && 
                            formDataObject[objectKey]) ? formDataObject[objectKey] : ''}
                        ></textarea>
                    </FormTextAreaBox>;
            case 'checkbox':
                const checkboxSchema = schema as CheckboxFormSchema;
                const checkboxData: string[] = (formDataObject && (instanceOfRoom(formDataObject)) && 
                                    formDataObject[objectKey]) ? formDataObject[objectKey] as string[] : []
                return <FormCheckboxBox key={'cbox-' + (0)}>
                        <div>{type} {schema.id}</div>
                        <FormCheckboxContainer>
                            {checkboxSchema.options.map((option) => {
                                return <FormCheckbox key={'checkbox-item-' + option._id} checkboxType={objectKey} checkboxDataObject={option} roomData={checkboxData}
                                    appendCheckbox={addCheckboxList} />
                            })}
                        </FormCheckboxContainer>
                    </FormCheckboxBox>;
            default:
                return null;
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