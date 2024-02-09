import React, { useContext, useState } from "react";

import { Widget as WidgetModel } from "@/dashboard/entities/WidgetType";
import { dashboardContext } from "@/dashboard/provider/DashboardContext";
import { Box, Flex, Overlay, Stack } from "@mantine/core";
import classes from "./Widget.module.css";

export interface WidgetProps {
    model: WidgetModel
    edit: boolean
}

export function Widget({ model, edit }: WidgetProps) {
    const { widgetTypes } = useContext(dashboardContext)
    const widgetType = widgetTypes.get(model.type)
    const [config, setConfig] = useState(model.config)
    const w = React.cloneElement(widgetType.element, { config, onChange: () => { } })
    const c = React.cloneElement(widgetType?.configElement, { config, onChange: setConfig })
    return (<Flex className={'grid-stack-item-content'} style={{ position: 'absolute', bottom: 0, top: 0, left: 0, right: 0 }}
    >
        {edit && <Overlay color="#000" backgroundOpacity={0.85} >
            <Stack>
                {c}
            </Stack>
        </Overlay>}
        {w}
    </Flex>)
}