import { ApiAbstractInterface } from "./apiManagement";
import { FormSchema } from "./formManagement";

export interface FormModuleProp {
    formType: string;
    editMode: boolean;
    formDataObject: ApiAbstractInterface | null;
    formDataSchema: FormSchema[];
    onFormSubmit: Function;
}

export interface FormCheckboxProp {
    checkboxType: string;
    checkboxDataObject: ApiAbstractInterface | null;
    roomData: string[] | null;
    appendCheckbox: Function;

}