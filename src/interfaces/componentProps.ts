import { ApiAbstractInterface } from "./apiManagement";

export interface FormModuleProp {
    formType: string;
    editMode: boolean;
    formDataObject: ApiAbstractInterface;
}

export interface FormButtonPropTypes {
    buttonColor: string | null;
}

export interface ErrorPropTypes {
    showError: boolean;
}