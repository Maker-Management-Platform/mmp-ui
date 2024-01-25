import { useCallback } from "react";
import { dashboardContext } from "./DashboardContext";
import { Widget, WidgetType } from "../entities/WidgetType";
import { useLocalStorage } from "@mantine/hooks";
import { useMap } from "@/core/utils/useMap";
import { Layout } from "react-grid-layout";

export function DashboardProvider({ children }: any) {
    const [widgets, setWidgets] = useLocalStorage<Widget[]>({
        key: 'dashboard-widgets',
        defaultValue: []
    })
    const [layout, setLayout] = useLocalStorage<Layout[]>({
        key: 'dashboard-layout',
        defaultValue: []
    })
    const [widgetTypes, actions] = useMap<string, WidgetType>([])

    const addWidgetType = useCallback((widgetType: WidgetType) => {
        actions.set(widgetType.type, widgetType)
    }, [actions])



    return (
        <dashboardContext.Provider value={{ widgets, setWidgets, layout, setLayout, widgetTypes, addWidgetType }}>
            {children}
        </dashboardContext.Provider>
    )
}