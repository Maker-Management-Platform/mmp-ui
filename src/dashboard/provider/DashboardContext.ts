import { createContext } from "react";
import { Widget, WidgetType } from "../entities/WidgetType";
import { Layout } from "react-grid-layout";

interface DashboardContextType {
    widgetTypes: Map<string, WidgetType>;
    addWidgetType: (widgetTypes: WidgetType) => void;
    widgets: Widget[];
    setWidgets: (widgets: Widget[]) => void;
    layout: Layout[]
    setLayout: (layout: Layout[]) => void;
}

export const dashboardContext = createContext<DashboardContextType>({} as DashboardContextType)