import { dashboardContext } from "@/dashboard/provider/DashboardContext"
import { IconPrinter } from "@tabler/icons-react";
import { useContext, useEffect } from "react"
import { PrinterWidget } from "../components/widgets/printer-widget/PrinterWidget"
import { Widget, WidgetConfig } from "@/dashboard/entities/WidgetType";
import { PrinterWidgetConfig } from "../components/widgets/printer-widget/PrinterWidgetConfig";

const layout = { h: 6, w: 4, isResizable: false }

export function PrinterWidgetProvider() {
    const { addWidgetType } = useContext(dashboardContext)
    useEffect(() => {
        addWidgetType({
            name: 'Printer',
            type: 'printer',
            description: 'asd',
            icon: <IconPrinter />,
            element: <PrinterWidget {...{} as Widget} />,
            configElement: <PrinterWidgetConfig {...{} as WidgetConfig} />,
            layout
        })
        addWidgetType({
            name: 'Printer 1',
            type: 'printer1',
            description: 'asd',
            icon: <IconPrinter />,
            element: <PrinterWidget {...{} as Widget} />,
            configElement: <PrinterWidgetConfig {...{} as WidgetConfig} />,
            layout
        })
        addWidgetType({
            name: 'Printer 2',
            type: 'printer2',
            description: 'asd',
            icon: <IconPrinter />,
            element: <PrinterWidget {...{} as Widget} />,
            configElement: <PrinterWidgetConfig {...{} as WidgetConfig} />,
            layout
        })
        addWidgetType({
            name: 'Printer 3',
            type: 'printer',
            description: 'asd',
            icon: <IconPrinter />,
            element: <PrinterWidget {...{} as Widget} />,
            configElement: <PrinterWidgetConfig {...{} as WidgetConfig} />,
            layout
        })
        addWidgetType({
            name: 'Printer 4',
            type: 'printer3',
            description: 'asd',
            icon: <IconPrinter />,
            element: <PrinterWidget {...{} as Widget} />,
            configElement: <PrinterWidgetConfig {...{} as WidgetConfig} />,
            layout
        })
    }, [])


    return null
}