import './style/style.css';
import { useReducer } from 'react';
import { CircularProgress } from '@mui/material';
import { MainComponent } from './styledcomponents/main';
import SessionComponent from './components/SessionComponent';
import ContentComponent from './components/ContentComponent';
import { SessionContext, sessionReducer } from './logic/sessionManagement';
import { useLocalStorage } from '@uidotdev/usehooks';
import { LocalStorageLoginInformation } from './interfaces/sessionManagement';
import { useNavigate } from 'react-router-dom';


function Layout()
{
    const [userObject, dispatch] = useReducer(sessionReducer, null);
    const [ssoToken] = useLocalStorage<LocalStorageLoginInformation>('sso_token');

    return (
    <SessionContext.Provider value={{ userObject, dispatch }} >
        {<SessionComponent />}
        {(userObject) ?
            <ContentComponent />
                :
            <MainComponent><CircularProgress /></MainComponent>
        }
    </SessionContext.Provider>
    )
}

export default Layout