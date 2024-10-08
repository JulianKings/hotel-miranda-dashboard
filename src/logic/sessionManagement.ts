import { createContext } from "react";
import { GlobalSessionState, LocalStorageLoginInformation, SessionAction, SessionActionTypes, SessionContextInterface, SessionState } from "../interfaces/sessionManagement";

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
                userObj: action.userObj, 
                login_time: (new Date()),
                last_update: (new Date()),
                last_update_done: null, 
            } as SessionState;
            return state;
        case SessionActionTypes.LOGOUT:
            state = null;
            return state;
        case SessionActionTypes.UPDATE_CONTENT:
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