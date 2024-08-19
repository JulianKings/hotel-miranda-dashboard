import './style/style.css';
import { createContext, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { MainComponent } from './styledcomponents/main';
import SessionComponent from './components/SessionComponent';
import ContentComponent from './components/ContentComponent';


export const SessionContext = createContext(null);

function Layout()
{
    const [userObject, updateUserObject] = useState(null);

    return (
    <SessionContext.Provider value={{ userObject, updateUserObject }} >
        <SessionComponent />
        {(userObject) ?
            <ContentComponent />
                :
            <MainComponent><CircularProgress /></MainComponent>
        }
    </SessionContext.Provider>
    )
}

export default Layout