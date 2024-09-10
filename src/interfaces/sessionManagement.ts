import { Dispatch } from "react";
import { ApiUserInterface } from "./apiManagement";

export interface LocalStorageLoginInformation {
    jwt_token: string
}

export interface SessionAction {
    type: SessionActionTypes;
    userObj?: Partial<ApiUserInterface> | null;
}

export interface SessionState {
    userObj: Partial<ApiUserInterface> | null;
    login_time: Date;
    last_update: Date;
    last_update_done: boolean | null;
}

export type GlobalSessionState = SessionState | null;

export enum SessionActionTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    UPDATE_CONTENT = 'UPDATE_CONTENT',
    UPDATE_TIME = 'UPDATE_TIME',
    UPDATE_CONTENT_FINISH = 'UPDATE_CONTENT_FINISH'
}

export interface SessionContextInterface {
    userObject: GlobalSessionState;
    dispatch: Dispatch<SessionAction>
}