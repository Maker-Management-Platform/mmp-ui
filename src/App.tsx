import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { AppShell, Burger, Group, LoadingOverlay } from '@mantine/core';
import { NavBar } from "./core/navbar/NavBar.tsx";
import { Outlet } from "react-router-dom";
import { SettingsContext } from './core/utils/settingsContext.ts';
import useAxios from 'axios-hooks';
import { AxiosErrorHandler } from './core/axios-error-handler/AxiosErrorHandler.tsx';
import { ScrollToTop } from './core/scroll-to-top/ScrollToTop.tsx';

function App() {
    const [opened, { toggle }] = useDisclosure();
    const matches = useMediaQuery('(min-width: 900px)');
    const [{ data, loading, error }] = useAxios(`/settings.json`);

    return (
        <SettingsContext.Provider value={data}>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ blur: 2 }} />
            {!loading && <AppShell
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
            </AppShell>}
            <ScrollToTop />
            <AxiosErrorHandler />
        </SettingsContext.Provider>
    )
}

export default App
