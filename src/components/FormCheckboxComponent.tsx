import { ApiAmenitiesInterface } from "../interfaces/apiManagement";
import { FormCheckboxProp } from "../interfaces/componentFormProps";
import { CheckboxBox, CheckboxInput, CheckboxLabel } from "./FormCheckboxStyle";

export function FormCheckbox({ checkboxType, checkboxDataObject }: FormCheckboxProp)
{
    switch(checkboxType)
    {
        case 'amenities':
            const amenityCheckbox = checkboxDataObject as ApiAmenitiesInterface;
            return <CheckboxBox key={'checkbox-amenity-' + amenityCheckbox._id}>
                
                <CheckboxLabel htmlFor={'amenity-' + amenityCheckbox._id}>
                    {amenityCheckbox.name}
                </CheckboxLabel>
                
                <CheckboxInput id={'amenity-' + amenityCheckbox._id} />

            </CheckboxBox>;
        default:
            return <>Unable to load checkbox '{checkboxType}'</>
    }
}