import './style/style.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'
import { useReducer } from 'react';
import { CircularProgress } from '@mui/material';
import { MainComponent } from './styledcomponents/main';
import SessionComponent from './components/SessionComponent';
import ContentComponent from './components/ContentComponent';
import { SessionContext, sessionReducer } from './logic/sessionManagement';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
    fontFamily: "'Poppins', 'poppins-offline', 'Roboto', arial, sans-serif",
})

function Layout()
{
    const [userObject, dispatch] = useReducer(sessionReducer, null);

    return (
    <MantineProvider theme={theme}>
        <SessionContext.Provider value={{ userObject, dispatch }} >
            {<SessionComponent />}
            {(userObject) ?
                <ContentComponent />
                    :
                <MainComponent><CircularProgress /></MainComponent>
            }
        </SessionContext.Provider>
    </MantineProvider>
    )
}

export default Layout