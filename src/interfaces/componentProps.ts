export interface FormButtonPropTypes {
    buttonColor: string | null;
}

export interface ErrorPropTypes {
    $showError: boolean;
}

export interface SidebarStatusInterface {
    $sidebarOpened: boolean | null
}

export interface SidebarStatusPropTypes {
    $sidebarStatus: boolean | null
}

export interface NestedViewNotesPropTypes
{
	content: string;
}

export interface NestedViewPropTypes
{
	content: string;
	filler?: string | null;
}

export interface EditFormPropTypes {
    editMode: boolean;
}