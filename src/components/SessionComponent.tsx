/* eslint-disable react-hooks/exhaustive-deps */
import { useLocalStorage } from "@uidotdev/usehooks";
import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorageLoginInformation, SessionActionTypes } from "../interfaces/sessionManagement";
import { SessionContext } from "../logic/sessionManagement";
import { ApiUserInterface } from "../interfaces/apiManagement";
//import * as jwt from 'jose';

const apiLocation = import.meta.env.VITE_APP_API_URL;

export default function SessionComponent() {

    const HOUR_IN_MILLISECONDS = 1000 * 60 * 60;

    const navigate = useNavigate();
    const [ssoToken] = useLocalStorage<LocalStorageLoginInformation>('sso_token');
    const {userObject, dispatch} = useContext(SessionContext);

    useEffect(() => { 
        if(!ssoToken)
        {
            navigate('/login');
        } else {
            const token = ssoToken.jwt_token;
            fetch(apiLocation + "/user/sso", {                
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + token
                },
                mode: "cors",
                })
            .then((response) => {
                if(response.status === 401)
                {
                    // Awaiting for login or token expired 
                    localStorage.removeItem('sso_token');   
                    dispatch({ type: SessionActionTypes.LOGOUT});
                    navigate('/login');

                    return null;
                } else if (response.status >= 400) {
                    throw new Error("server error");
                }
                return response.json();
            })
            .then((response) => {
                if(response)
                {
                    // We are logged in
                    dispatch({ type: SessionActionTypes.LOGIN, userObj: (response.user as Partial<ApiUserInterface>)})
                }
            })
            .catch((error) => {
                throw new Error(error);
            })
        }  
    }, []);

    return <></>;
}