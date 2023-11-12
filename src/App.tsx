import {useDisclosure, useMediaQuery} from '@mantine/hooks';
import {AppShell, Burger, Group} from '@mantine/core';
import {NavBar} from "./core/navbar/NavBar.tsx";
import {Outlet} from "react-router-dom";

function App() {
    const [opened, {toggle}] = useDisclosure();
    const matches = useMediaQuery('(min-width: 900px)');

    return (
        <AppShell
            withBorder={true}
            header={{height: 60, collapsed: matches}}
            //footer={{height: 60}}
            navbar={{width: 80, breakpoint: 'sm', collapsed: {mobile: !opened}}}
            aside={{width: 300, breakpoint: 'md', collapsed: {desktop: true, mobile: true}}}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
                </Group>
            </AppShell.Header>
            <NavBar />
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
            <AppShell.Aside p="md">Aside</AppShell.Aside>
        </AppShell>
    )
}

export default App
