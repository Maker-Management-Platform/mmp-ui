import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles/global.css';
import '@mantine/core/styles.css';
import '@mantine/core/styles/ScrollArea.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/ActionIcon.css';
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
import '@mantine/core/styles/Pagination.css';
import '@mantine/core/styles/Checkbox.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes as dashboardRoutes } from "./dashboard/routes.tsx";
import { routes as projectRoutes } from "./projects/routes.tsx";
import { routes as tempFilesRoutes } from "./tempfiles/routes.tsx";
import { routes as printersRoutes } from "./printers/routes.tsx";
import { routes as settingsRoutes } from "./settings/routes.tsx";

const theme = createTheme({
    /** Put your mantine theme override here */
});


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                children: [...dashboardRoutes]
            },
            {
                path: "projects",
                children: [...projectRoutes]
            },
            {
                path: "tempfiles",
                children: [...tempFilesRoutes]
            },
            {
                path: "printers",
                children: [...printersRoutes]
            },
            {
                path: "settings",
                children: [...settingsRoutes]
            },
        ],
    },
]);
console.log(router);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <RouterProvider router={router} />
        </MantineProvider>
    </React.StrictMode>
)
