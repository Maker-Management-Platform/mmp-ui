import { ActionIcon, Button, Drawer, Group, Stack, UnstyledButton, Text, useMantineTheme, SimpleGrid } from "@mantine/core";
import { IconLock, IconLockOpen, IconPlus, IconSettings, IconSettingsOff } from "@tabler/icons-react";
import { DashboardItem, Widget, WidgetType } from "@/dashboard/entities/WidgetType";
import { randomId, useDisclosure } from "@mantine/hooks";
import { dashboardContext } from "@/dashboard/provider/DashboardContext";
import React, { useCallback, useContext, useState } from "react";
import classes from './Header.module.css';

interface HeaderProps {
    addItem: (bla: DashboardItem) => void;
    locked: boolean;
    toggleLock: () => void;
    edit: boolean;
    toggleEdit: () => void;
}

export function Header({ addItem, locked, toggleLock, edit, toggleEdit }: HeaderProps) {
    const theme = useMantineTheme();
    const { widgetTypes } = useContext(dashboardContext)
    const [opened, { open, close }] = useDisclosure(false);
    const [config, setConfig] = useState<any>({});
    const [selectedType, setSelectedType] = useState<WidgetType | undefined>();

    const addWidget = useCallback(() => {
        if (!selectedType) return;
        const id = `${selectedType.type}-${randomId()}`
        addItem(
            {
                widget: {
                    id,
                    type: selectedType.type,
                    config,
                    layout: { i: id, x: 0, y: 0, ...selectedType.layout }
                },
                layout: { i: id, x: 0, y: 0, ...selectedType.layout }
            })
        reset()
        close()

    }, [config, selectedType])

    const reset = () => {
        setSelectedType(undefined)
        setConfig({})
    }

    return (<>
        <Group justify="flex-end">
            <ActionIcon onClick={toggleLock} variant="transparent" >
                {locked && <IconLock />}
                {!locked && <IconLockOpen />}
            </ActionIcon>
            <ActionIcon onClick={toggleEdit} variant="transparent" >
                {edit && <IconSettingsOff />}
                {!edit && <IconSettings />}
            </ActionIcon>
            <ActionIcon onClick={open} variant="transparent" >
                <IconPlus />
            </ActionIcon>
        </Group>
        <Drawer offset={8} radius="md" opened={opened} onClose={close} title="Add Widget" position="right">
            {!selectedType && <SimpleGrid cols={3} mt="md">
                {Array.from(widgetTypes.values()).map(wt =>
                    <UnstyledButton key={wt.type} className={classes.item} onClick={() => setSelectedType(wt)}>
                        {React.cloneElement(wt.icon, { color: theme.colors["blue"][6], size: '2rem' })}
                        <Text size="xs" mt={7}>
                            {wt.name}
                        </Text>
                    </UnstyledButton>)}
            </SimpleGrid>}

            {selectedType && <Stack>
                {React.cloneElement(selectedType.configElement, { config: config, onChange: setConfig })}
                <Group>
                    <Button onClick={addWidget}>Add</Button>
                    <Button onClick={reset}>Cancel</Button>
                </Group>
            </Stack>}
        </Drawer >
    </>
    )
}