import { dashboardContext } from "@/dashboard/provider/DashboardContext"
import { useContext } from "react"
import { PrinterWidget } from "../components/widgets/printer-widget/PrinterWidget"

const layout = { x: 1, y: 0, w: 3, h: 3, isResizable: false }

export function PrinterWidgetProvider() {
    const { addWidgetType } = useContext(dashboardContext)

    /*addWidgetType({
        name: 'Printer',
        type: 'printer',
        description: 'asd',
        element: <PrinterWidget />,
        configElement: <PrinterWidget />
    })*/


    return null
}