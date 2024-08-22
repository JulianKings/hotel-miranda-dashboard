import { createContext } from "react";

export const SessionContext = createContext(null);

export const sessionReducer = (state, action) =>
{
    if(action.type === 'update')
    {
        state = action.userObject;
        return state;
    }

    if(action.type === 'logout')
    {
		localStorage.removeItem('sso_token');
        return {};
    }

    throw Error('Unknown action.');
}