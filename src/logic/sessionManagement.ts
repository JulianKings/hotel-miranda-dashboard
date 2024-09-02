import { createContext, Dispatch } from "react";

export interface SessionAction {
    type: SessionActionTypes;
    userId?: number
}

export interface SessionState {
    id: number | undefined;
    login_time: Date;
    last_update: Date;
}

export type GlobalSessionState = SessionState | null;

export enum SessionActionTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    UPDATE_CONTENT = 'UPDATE_CONTENT',
    UPDATE_TIME = 'UPDATE_TIME',
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
                last_update: (new Date()) 
            } as SessionState;
            return state;
        case SessionActionTypes.LOGOUT:
            localStorage.removeItem('sso_token');
            return null;
        case SessionActionTypes.UPDATE_CONTENT:
            state = { 
                ...state,
                last_update: (new Date()) 
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