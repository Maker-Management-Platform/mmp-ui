import { Header } from "./parts/header/Header";
import ResponsiveReactGridLayout from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css"
import "/node_modules/react-resizable/css/styles.css"
import { useContext } from "react";
import { Widget, } from "./parts/widget/Widget";
import { Paper } from "@mantine/core";
import { dashboardContext } from "@/dashboard/provider/DashboardContext";

export function Dashboard() {
    const { widgets, setWidgets } = useContext(dashboardContext)
    /*const [layout, setLayout] = useState<WidgetProps[]>([
        { i: "a", x: 0, y: 0, w: 1, h: 2, children: <IconPlus /> },
        { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4, children: <IconPlus /> },
        { i: "c", x: 4, y: 0, w: 1, h: 2, children: <IconPlus /> }
    ])*/
    return (<>
        <Header onAddWidget={(bla) => {
            setWidgets([...widgets, bla])
        }} />
        <h1>Dashboard</h1>
        <ResponsiveReactGridLayout
            className="layout"
            layout={widgets.map(w => w.layout)}
            cols={12}
            rowHeight={30}
            width={1200}
        >
            {widgets.map((widget) => <Paper key={widget.id} shadow="xs" withBorder p={0}><Widget model={widget} /></Paper>)}
        </ResponsiveReactGridLayout>
    </>)
}