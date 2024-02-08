import React, { useContext, useState } from "react";

import { Widget as WidgetModel } from "@/dashboard/entities/WidgetType";
import { dashboardContext } from "@/dashboard/provider/DashboardContext";
import { Flex, Overlay, Stack } from "@mantine/core";
import classes from "./Widget.module.css";

export interface WidgetProps {
    model: WidgetModel
    edit: boolean
}

export function Widget({ model, edit }: WidgetProps) {
    const { widgetTypes } = useContext(dashboardContext)
    const widgetType = widgetTypes.get(model.type)
    const [config, setConfig] = useState(model.config)
    const w = React.cloneElement(widgetType.element, { config, onChange: () => { }})
    const c = React.cloneElement(widgetType?.configElement, { config, onChange: setConfig })
    return (<Flex style={{ position: 'absolute', bottom: 0, top: 0, width: "100%" }} className={classes.wrapper}>
        {edit && <Overlay color="#000" backgroundOpacity={0.85} >
            <Stack>
                {c}
            </Stack>
        </Overlay>}
        {w}
    </Flex>)
}