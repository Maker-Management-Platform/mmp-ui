import React, { useContext, useState } from "react";

import { Widget as WidgetModel } from "@/dashboard/entities/WidgetType";
import { dashboardContext } from "@/dashboard/provider/DashboardContext";
import { ActionIcon, Flex, Group, Overlay, Stack, Text } from "@mantine/core";
import classes from "./Widget.module.css";
import { IconTrash } from "@tabler/icons-react";

export interface WidgetProps {
    model: WidgetModel
    edit: boolean
    onDelete: () => void
}

export function Widget({ model, edit, onDelete }: WidgetProps) {
    const { widgetTypes } = useContext(dashboardContext)
    const widgetType = widgetTypes.get(model.type)
    const [config, setConfig] = useState(model.config)
    const w = React.cloneElement(widgetType.element, { config, onChange: () => { } })
    const c = React.cloneElement(widgetType?.configElement, { config, onChange: setConfig })
    return (<Flex style={{ position: 'absolute', bottom: 0, top: 0, width: "100%" }} className={classes.wrapper}>
        {edit && <Overlay color="#000" backgroundOpacity={0.85} p='sm'>
            <Stack>
                <Group justify="space-between">
                    <Text>{widgetType?.name}</Text>
                    <ActionIcon onClick={onDelete}>
                        <IconTrash />
                    </ActionIcon>
                </Group>
                {c}
            </Stack>
        </Overlay>}
        {w}
    </Flex>)
}