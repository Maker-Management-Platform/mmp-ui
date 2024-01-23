import { useCallback, useState } from "react";
import { dashboardContext } from "./DashboardContext";
import { Widget, WidgetType } from "../entities/WidgetType";

export function DashboardProvider({ children }) {
    const [widgets, setWidgets] = useState<Widget[]>([])
    const [widgetTypes, setWidgetTypes] = useState<WidgetType[]>([])
    
    const addWidgetType = useCallback((widgetType: WidgetType) => {
        setWidgetTypes(prev => [...prev, widgetType])
    }, [setWidgetTypes])

    return (
        <dashboardContext.Provider value={{ widgets, setWidgets, widgetTypes, addWidgetType }}>
            {children}
        </dashboardContext.Provider>
    )
}