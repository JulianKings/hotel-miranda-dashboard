import { createContext, Dispatch } from "react";
import { LocalStorageLoginInformation } from "../interfaces/sessionManagement";

export interface SessionAction {
    type: SessionActionTypes;
    userId?: string | undefined | null;
}

export interface SessionState {
    id: string | undefined | null;
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

export const SessionContext = createContext<SessionContextInterface>({
    userObject: null,
    dispatch: () => null
});

export const sessionReducer = (state: GlobalSessionState, action: SessionAction) =>
{
    switch(action.type)
    {
        case SessionActionTypes.LOGIN:
            state = { 
                id: action.userId, 
                login_time: (new Date()),
                last_update: (new Date()),
                last_update_done: null, 
            } as SessionState;
            return state;
        case SessionActionTypes.LOGOUT:
            localStorage.removeItem('sso_token');
            return null;
        case SessionActionTypes.UPDATE_CONTENT:
            const finalUser: LocalStorageLoginInformation = {
                userId: state.id,
                login_time: (new Date()),
                last_update: null
            }

            state = { 
                ...state,
                last_update: (new Date()),
                last_update_done: false, 
            } as SessionState;
            return state;
        case SessionActionTypes.UPDATE_CONTENT_FINISH:
            state = { 
                ...state,
                last_update_done: true, 
            } as SessionState;
            return state;
        case SessionActionTypes.UPDATE_TIME:
            state = { 
                ...state,
                login_time: (new Date()) 
            } as SessionState;
            return state;
        default:
            return state;
    }
}