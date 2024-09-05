import { Dispatch } from "react";

export interface LocalStorageLoginInformation {
    userId: string | null,
    last_update: Date | null,
    login_time: Date | null
}

export interface SessionAction {
    type: SessionActionTypes;
    userId?: string | null;
}

export interface SessionState {
    id: string | null;
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