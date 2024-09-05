/* eslint-disable react-hooks/exhaustive-deps */
import { useLocalStorage } from "@uidotdev/usehooks";
import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorageLoginInformation, SessionActionTypes } from "../interfaces/sessionManagement";
import { SessionContext } from "../logic/sessionManagement";
//import * as jwt from 'jose';

export default function SessionComponent() {

    const HOUR_IN_MILLISECONDS = 1000 * 60 * 60;

    const navigate = useNavigate();
    const [ssoToken] = useLocalStorage<LocalStorageLoginInformation>('sso_token');
    const {userObject, dispatch} = useContext(SessionContext);

    useEffect(() => { 
        async function fetch() {
            if(!ssoToken)
                {
                    navigate('/login');
                } else {
                    if(!userObject)
                    {
                        dispatch({ type: SessionActionTypes.LOGIN, userId: ssoToken.userId})
                        /*try {
                            const secret = jwt.base64url.decode('28CIzmTGN8u8wHIu3kOT+Mdmq47BcF32lS7oyMlJZRM=')
                            const { payload } = await jwt.jwtDecrypt(ssoToken, secret);
                            updateUserObject(payload);

                            const token = new jwt.EncryptJWT(payload)	
                                .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
                                .setExpirationTime('2h')
                                .encrypt(secret);
								
                            token.then((result) => 
                            {
                                localStorage.setItem('sso_token', JSON.stringify(result));
                                navigate('/');
                            });
                        } catch {
                            // token has probably expired
                            localStorage.removeItem('sso_token');
                            navigate('/login');
                        }*/
                    } else {
                        if(ssoToken.login_time)
                        {
                            const timeDiff = Math.abs(new Date().getTime() - ssoToken.login_time.getTime());

                            if(timeDiff < 2*HOUR_IN_MILLISECONDS)
                            {
                                //dispatch({ type: SessionActionTypes.UPDATE_TIME});
                            } else {
                                dispatch({ type: SessionActionTypes.LOGOUT});
                                navigate('/');
                            }
                        }
                    }
                }
        }

        fetch();        
    }, [ssoToken]);

    return <></>;
}