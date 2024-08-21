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
        return null;
    }

    throw Error('Unknown action.');
}