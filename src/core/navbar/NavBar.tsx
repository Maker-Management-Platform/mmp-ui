import { useState } from 'react';
import cx from 'clsx';
import {
    Center,
    Tooltip,
    UnstyledButton,
    Stack,
    rem,
    AppShell,
    useMantineColorScheme,
    useComputedColorScheme, ActionIcon
} from '@mantine/core';
import {
    IconHome2,
    IconLogout,
    IconSwitchHorizontal,
    IconSun,
    IconMoon,
    IconBrandMantine
} from '@tabler/icons-react';
import {menuItems as projectMenuItems} from "../../projects/menu";
import classes from './NavBar.module.css';
import {Link} from "react-router-dom";

interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    href: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick, href }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton component={Link} to={href} onClick={onClick} className={classes.link} data-active={active || undefined}>
                <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

const menuItems = [
    ...projectMenuItems
];

export function NavBar() {
    const [active, setActive] = useState(2);
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    const links = menuItems.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
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
                <ActionIcon
                    onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                    variant="default"
                    size="xl"
                    aria-label="Toggle color scheme"
                >
                    <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
                    <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
                </ActionIcon>
                <NavbarLink icon={IconSwitchHorizontal} href={'change'} label="Change account" />
                <NavbarLink icon={IconLogout} href={'logout'} label="Logout" />
            </Stack>
        </AppShell.Navbar>
    );
}