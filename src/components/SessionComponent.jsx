/* eslint-disable react-hooks/exhaustive-deps */
import { useLocalStorage } from "@uidotdev/usehooks";
import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import * as jwt from 'jose';
import { SessionContext } from "../layout";


export default function SessionComponent() {

    const navigate = useNavigate();
    const [ssoToken] = useLocalStorage('sso_token');
    const {userObject, updateUserObject} = useContext(SessionContext)

    useEffect(() => { 
        async function fetch() {
            if(!ssoToken)
                {
                    navigate('/login');
                } else {
                    if(!userObject)
                    {
                        try {
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
                        }
                    }
                }
        }

        fetch();        
    }, ssoToken);

    return <></>;
}