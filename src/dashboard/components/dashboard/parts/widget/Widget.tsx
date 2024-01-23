import React from "react";

import { Widget as WidgetModel } from "@/dashboard/entities/WidgetType";
export interface WidgetProps {
    model: WidgetModel
}

export function Widget({ model }: WidgetProps) {
    const c = React.cloneElement(model.type.element, { config: model.config, onChange: model.onChange })
    return (<>{c}</>)
}