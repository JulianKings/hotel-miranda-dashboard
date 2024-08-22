import { createContext } from "react";

export const SessionContext = createContext(null);

export const sessionReducer = (state, action) =>
{
    if(action.type === 'login')
    {
        state = { 
            id: action.userId, 
            login_time: (new Date()),
            last_update: (new Date()) 
        };
        return state;
    }

    if(action.type === 'logout')
    {
		localStorage.removeItem('sso_token');
        return null;
    }

    if(action.type === 'update_content')
    {
        state = { 
            ...state,
            last_update: (new Date()) 
        };
        return state;
    }

    if(action.type === 'update_time')
    {
        state = { 
            ...state,
            login_time: (new Date()) 
        };
        return state;
    }

    throw Error('Unknown action.');
}