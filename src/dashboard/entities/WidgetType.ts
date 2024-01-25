import { Layout } from "react-grid-layout";

export interface DashboardItem {
  widget: Widget,
  layout: Layout
}

export interface WidgetType {
  name: string,
  description: string,
  type: string,
  icon: React.ReactElement<any>,
  element: React.ReactElement<any>,
  configElement: React.ReactElement<any>,
  layout: {
    w: number;
    h: number;
    minW?: number;
    maxW?: number;
    minH?: number;
    maxH?: number;
    isResizable?: boolean;
  }
}

export interface Widget {
  id: string,
  type: string,
  config: any
}

export interface WidgetConfig {
  config: any,
  onChange: (config: any) => void
}