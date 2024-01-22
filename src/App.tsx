import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { AppShell, Burger, Group, LoadingOverlay } from '@mantine/core';
import { NavBar } from "./core/navbar/NavBar.tsx";
import { Outlet } from "react-router-dom";
import { Settings, SettingsContext } from './core/utils/settingsContext.ts';
import useAxios from 'axios-hooks';
import { AxiosErrorHandler } from './core/axios-error-handler/AxiosErrorHandler.tsx';
import { useEffect, useState } from 'react';

function App() {
    const [opened, { toggle }] = useDisclosure();
    const matches = useMediaQuery('(min-width: 900px)');
    const [ready, setReady] = useState(false);
    const [settings, setSettings] = useState<Settings>({} as Settings);
    const [{ }, getSettings] = useAxios<Settings>(`/settings.json`, { manual: true });
    const [{ }, getAgentSettings] = useAxios({}, { manual: true });
    useEffect(() => {
        getSettings()
            .then(({ data: settings }) => {
                getAgentSettings({ url: `${settings.local_backend}/system/settings` })
                    .then(({ data: agent }) => {
                        setSettings({ ...settings, agent })
                        console.log(settings);
                        setReady(true);
                    })
            })
            .catch((e) => {
                console.log(e)
            });
    }, [])

    return (
        <SettingsContext.Provider value={settings}>
            {!ready ? <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ blur: 2 }} /> :
                <AppShell
                    withBorder={true}
                    header={{ height: 60, collapsed: matches }}
                    //footer={{height: 60}}
                    navbar={{ width: 80, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                    aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: true, mobile: true } }}
                    padding="md"
                >
                    <AppShell.Header>
                        <Group h="100%" px="md">
                            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        </Group>
                    </AppShell.Header>
                    <NavBar />
                    <AppShell.Main>
                        <Outlet />
                    </AppShell.Main>
                    <AppShell.Aside p="md">Aside</AppShell.Aside>
                </AppShell>
            }
            <AxiosErrorHandler />
        </SettingsContext.Provider>
    )
}

export default App
