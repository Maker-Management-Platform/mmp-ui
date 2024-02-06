import cx from 'clsx';
import {
    Center,
    Tooltip,
    UnstyledButton,
    Stack,
    AppShell,
    useMantineColorScheme,
    useComputedColorScheme
} from '@mantine/core';
import {
    IconHome2,
    IconSun,
    IconMoon,
    IconBrandMantine
} from '@tabler/icons-react';
import { menuItems as dashboardMenuItems } from "@/dashboard/menu";
import { menuItems as projectMenuItems } from "@/projects/menu";
import { menuItems as tempFileMenuItems } from "@/tempfiles/menu";
import { menuItems as printersMenuItems } from "@/printers/menu";
import classes from './NavBar.module.css';
import { NavLink } from "react-router-dom";
import { StatusIcon } from '../sse2/components/status-icon/StatusIcon';

interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    href: string;
}

function NavbarLink({ icon: Icon, label, href }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton
                className={classes.link}
                renderRoot={({ className, ...others }) => (
                    <NavLink
                        to={href}
                        className={({ isActive }) =>
                            cx(className, isActive && classes.active)
                        }
                        {...others}
                    />
                )}>
                <Icon stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

const menuItems = [
    ...dashboardMenuItems,
    ...projectMenuItems,
    ...tempFileMenuItems,
    ...printersMenuItems
];

export function NavBar() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    const links = menuItems.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
        />
    ));

    return (
        <AppShell.Navbar className={classes.navbar}>
            <Center>
                <IconBrandMantine type="mark" size={30} />
            </Center>

            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    {links}
                </Stack>
            </div>

            <Stack justify="center" gap={0}>
                <StatusIcon className={classes.link} />
                <Tooltip label={'Toggle color scheme'} position="right" transitionProps={{ duration: 0 }}>
                    <UnstyledButton className={classes.link} onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}>
                        {computedColorScheme == 'dark' && <IconSun stroke={1.5} />}
                        {computedColorScheme == 'light' && <IconMoon stroke={1.5} />}
                    </UnstyledButton>
                </Tooltip>
                {/*<NavbarLink icon={IconSwitchHorizontal} href={'change'} label="Change account" />*/}
                {/*<NavbarLink icon={IconLogout} href={'logout'} label="Logout" />*/}
            </Stack>
        </AppShell.Navbar>
    );
}