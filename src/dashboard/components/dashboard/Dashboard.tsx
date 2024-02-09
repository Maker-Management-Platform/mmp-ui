import { Header } from "./parts/header/Header";
import { useContext } from "react";
import { dashboardContext } from "@/dashboard/provider/DashboardContext";
import { useDisclosure } from "@mantine/hooks";
import { WidgetArea } from "./parts/widget-area/WidgetArea";

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
        <WidgetArea widgets={widgets} edit={edit} locked={locked} />
    </>)
}