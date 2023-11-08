import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css';
import '@mantine/core/styles/ScrollArea.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/VisuallyHidden.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Popover.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Loader.css';
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/Flex.css';
import '@mantine/core/styles/AppShell.css';
import '@mantine/core/styles/Tabs.css';
import {baseURL} from "./core/config.ts";
import {MantineProvider, createTheme} from '@mantine/core';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {configure} from 'axios-hooks'
import Axios from 'axios'
import {routes as projectRoutes} from "./projects/routes.tsx";

const theme = createTheme({
    /** Put your mantine theme override here */
});


const axios = Axios.create({
    baseURL
})

configure({axios})


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "projects",
                children: [...projectRoutes]
            },
        ],
    },
]);
console.log(router);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <RouterProvider router={router}/>
        </MantineProvider>
    </React.StrictMode>,
)
