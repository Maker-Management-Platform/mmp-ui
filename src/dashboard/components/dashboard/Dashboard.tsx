import { Header } from "./parts/header/Header";
import "/node_modules/react-grid-layout/css/styles.css"
import "/node_modules/react-resizable/css/styles.css"
import { useContext } from "react";
import { Widget, } from "./parts/widget/Widget";
import { Box } from "@mantine/core";
import { dashboardContext } from "@/dashboard/provider/DashboardContext";
import { useDisclosure } from "@mantine/hooks";

import { Responsive, WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(Responsive);
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
                const l = { ...layout }
                if (!l.lg) l.lg = []
                l.lg.push(item.layout)
                setLayout(l)
                setWidgets([...widgets, item.widget])
            }} />
        <ReactGridLayout
            className="layout"
            isDraggable={!locked}
            isResizable={!locked}
            onLayoutChange={(l, ls) => {
                console.log(l, ls['lg'] ? ls['lg'][0] : ls['lg']);
                setLayout(prev => {
                    const newLayout = { ...prev }
                    for (const k of Object.keys(ls)) {
                        if (ls[k] && ls[k].length > 0) {
                            newLayout[k] = ls[k]
                        }
                    }
                    console.log(ls, newLayout);
                    return newLayout
                })
            }}
            //layouts={layout}
            cols={{ lg: 24, md: 6, sm: 4, xs: 2, xxs: 1 }}
            rowHeight={50}

        >
            {widgets.map((widget) => <Box key={widget.id} data-grid={widget.layout}><Widget model={widget} edit={edit} /></Box>)}
        </ReactGridLayout >

    </>)
}