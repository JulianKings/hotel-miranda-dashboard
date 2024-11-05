import { ApiAbstractInterface } from "./apiManagement";
import { FormSchema } from "./formManagement";

export interface FormModuleProp {
    formType: string;
    editMode: boolean;
    formDataObject: ApiAbstractInterface | null;
    formDataSchema: FormSchema[];
}

export interface FormCheckboxProp {
    checkboxType: string;
    checkboxDataObject: ApiAbstractInterface | null;
    roomData: string[] | null;

}