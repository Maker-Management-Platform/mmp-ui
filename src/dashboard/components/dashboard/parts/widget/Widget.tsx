import React, { useContext, useState } from "react";

import { Widget as WidgetModel } from "@/dashboard/entities/WidgetType";
import { dashboardContext } from "@/dashboard/provider/DashboardContext";
import { Overlay, Stack } from "@mantine/core";
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
    return (<>
        {edit && <Overlay color="#000" backgroundOpacity={0.85} >
            <Stack>
                {c}
            </Stack>
        </Overlay>}
        {w}
    </>)
}