import { dashboardContext } from "@/dashboard/provider/DashboardContext"
import { IconPrinter } from "@tabler/icons-react";
import { useContext, useEffect } from "react"
import { PrinterWidget } from "../components/widgets/printer-widget/PrinterWidget"
import { Widget, WidgetConfig } from "@/dashboard/entities/WidgetType";
import { PrinterWidgetConfig } from "../components/widgets/configs/PrinterWidgetConfig";
import { PrinterTableWidget } from "../components/widgets/printer-table-widget/PrinterTableWidget";

const layout = { h: 6, w: 6, isResizable: true }

export function PrinterWidgetProvider() {
    const { addWidgetType } = useContext(dashboardContext)
    useEffect(() => {
        addWidgetType({
            name: 'Camera Widget',
            type: 'printer_camera_widget',
            description: 'Printer Camera Widget',
            icon: <IconPrinter />,
            element: <PrinterWidget {...{} as Widget} />,
            configElement: <PrinterWidgetConfig {...{} as WidgetConfig} />,
            layout
        })
        addWidgetType({
            name: 'Table Widget',
            type: 'printer_table_widget',
            description: 'Printer table Widget',
            icon: <IconPrinter />,
            element: <PrinterTableWidget {...{} as Widget} />,
            configElement: <PrinterWidgetConfig {...{} as WidgetConfig} />,
            layout: { h: 4, w: 6, isResizable: false }
        })
    }, [])


    return null
}