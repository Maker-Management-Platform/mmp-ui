import { Header } from "./parts/header/Header";
import "/node_modules/react-grid-layout/css/styles.css"
import "/node_modules/react-resizable/css/styles.css"
import { useContext } from "react";
import { Widget, } from "./parts/widget/Widget";
import { Box, Paper } from "@mantine/core";
import { dashboardContext } from "@/dashboard/provider/DashboardContext";
import { useDisclosure } from "@mantine/hooks";

import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);
export function Dashboard() {
    const { widgets, setWidgets, layout, setLayout } = useContext(dashboardContext)
    const [locked, { toggle: toggleLocked }] = useDisclosure(true);
    const [edit, { toggle: toggleEdit }] = useDisclosure(false);

    return (<>
        <Header
            locked={locked}
            toggleLock={toggleLocked}
            edit={edit}
            toggleEdit={toggleEdit}
            addItem={(item) => {
                console.log(item);
                setWidgets([...widgets, item.widget])
                setLayout([...layout, item.layout])
            }} />
        <ReactGridLayout
            className="layout"
            isDraggable={!locked}
            onLayoutChange={(l) => {
                setLayout(l)
                console.log(l);
            }}
            layout={layout}
            cols={24}
            rowHeight={50}

        >
            {widgets.map((widget) => <Box key={widget.id} shadow="xs" withBorder p={0}><Widget model={widget} edit={edit} /></Box>)}
        </ReactGridLayout>

    </>)
}