import { createContext } from "react";
import { Widget, WidgetType } from "../entities/WidgetType";

interface DashboardContextType {
    widgetTypes: WidgetType[];
    addWidgetType: (widgetTypes: WidgetType[]) => void;
    widgets: Widget[];
    setWidgets: (widgets: Widget[]) => void;
}

export const dashboardContext = createContext<DashboardContextType>({} as DashboardContextType)