import { ApiAmenitiesInterface } from "../interfaces/apiManagement";
import { FormCheckboxProp } from "../interfaces/componentFormProps";
import { CheckboxBox, CheckboxInput, CheckboxLabel } from "./FormCheckboxStyle";

export function FormCheckbox({ checkboxType, checkboxDataObject, roomData, appendCheckbox }: FormCheckboxProp)
{
    switch(checkboxType)
    {
        case 'amenities':
            const amenityCheckbox = checkboxDataObject as ApiAmenitiesInterface;
            const amenityCheckboxId:string = (amenityCheckbox._id !== undefined) ? amenityCheckbox._id : '-1';
            const amenityCheckboxChecked: boolean = (roomData !== null && roomData.includes(amenityCheckboxId));
            return <CheckboxBox key={'checkbox-amenity-' + amenityCheckbox._id}>
                
                <CheckboxInput ref={appendCheckbox(amenityCheckbox._id)} id={'amenity-' + amenityCheckbox._id} defaultChecked={amenityCheckboxChecked} />

                <CheckboxLabel htmlFor={'amenity-' + amenityCheckbox._id}>
                    {amenityCheckbox.name}
                </CheckboxLabel>

            </CheckboxBox>;
        default:
            return <>Unable to load checkbox '{checkboxType}'</>
    }
}