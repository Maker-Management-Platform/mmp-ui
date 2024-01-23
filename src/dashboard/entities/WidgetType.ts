import { Layout } from "react-grid-layout";

export interface WidgetType {
  name: string,
  description: string,
  type: string,
  element: React.ReactElement<any>,
  configElement: React.ReactElement<any>
}

export interface Widget {
  id: string,
  type: WidgetType,
  config: any,
  layout: Layout,
  onChange: (value: any) => void,
}