import cx from 'clsx';
import {
    Center,
    Tooltip,
    UnstyledButton,
    Stack,
    AppShell,
    useMantineColorScheme,
    useComputedColorScheme,
    Paper,
    Collapse,
    rem
} from '@mantine/core';
import {
    IconHome2,
    IconSun,
    IconMoon
} from '@tabler/icons-react';
import { menuItems as projectMenuItems, menu as pMenu } from "@/projects/menu";
import { menuItems as tempFileMenuItems } from "@/tempfiles/menu";
import { menuItems as printersMenuItems } from "@/printers/menu";
import classes from './NavBar.module.css';
import { NavLink } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';

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
                        exact
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
    ...projectMenuItems,
    ...tempFileMenuItems,
    ...printersMenuItems
];
const elements = [
    pMenu,
    pMenu,
    pMenu,
    pMenu
]

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
            <Stack gap={'sm'} className={classes.navbarMain}>
                {elements.map((e, i) => <NavGroup {...e} key={i} />)}

            </Stack>
            <Stack gap={0}>
                <Paper className={classes.stack} >
                    <Center>
                        <Tooltip label={'Toggle color scheme'} position="right" transitionProps={{ duration: 0 }}>
                            <UnstyledButton className={classes.link} onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}>
                                {computedColorScheme == 'dark' && <IconSun stroke={1.5} />}
                                {computedColorScheme == 'light' && <IconMoon stroke={1.5} />}
                            </UnstyledButton>
                        </Tooltip>
                    </Center>
                </Paper>
            </Stack>
        </AppShell.Navbar>
    );
}

interface NavElement {
    icon: typeof IconHome2;
    label: string;
    href: string;
    sub: NavElement[];
}

function NavGroup({ icon: Icon, label, href, sub }: NavElement) {
    const [opened, { toggle }] = useDisclosure(false);
    return (<Paper className={classes.stack} radius={rem(11)} p={rem(3)}>
        <Center>
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
                    )}
                    onClick={toggle}>
                    <Icon stroke={1.5} />
                </UnstyledButton>
            </Tooltip>
        </Center>

        <Collapse in={opened}>
            {sub.map((e, i) => <Center mt='sm'>
                <Tooltip label={e.label} position="right" transitionProps={{ duration: 0 }} key={i}>
                    <UnstyledButton
                        renderRoot={({ className, ...others }) => (
                            <NavLink
                                end
                                to={e.href}
                                className={({ isActive }) =>
                                    cx(className, isActive && classes.active)
                                }
                                {...others}
                            />
                        )}
                        className={classes.link}>
                        <e.icon stroke={1.5} />
                    </UnstyledButton>
                </Tooltip>
            </Center>)}
        </Collapse>
    </Paper>)
}