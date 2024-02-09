import { Widget as IWidget } from "@/dashboard/entities/WidgetType"
import { createRef, useEffect, useRef } from "react"
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { Widget } from "../widget/Widget";
import { Box } from "@mantine/core";

interface WidgetAreaProps {
    edit: boolean
    locked: boolean
    widgets: IWidget[]
}

export function WidgetArea({ edit, locked, widgets }: WidgetAreaProps) {
    const refs = useRef<any>({})
    const gridRef = useRef<GridStack>()
    if (Object.keys(refs.current).length !== widgets.length) {
        widgets.forEach(({ id }) => {
            refs.current[id] = refs.current[id] || createRef()
        })
    }
    useEffect(() => {
        gridRef.current = gridRef.current ?? GridStack.init({
            float: true,
            cellHeight: "70px",
            minRow: 1,
            columnOpts: {
                breakpoints: [
                    { w: 576, c: 1 },
                    { w: 768, c: 2 },
                    { w: 992, c: 3 },
                    { w: 1200, c: 4 },
                    { w: 1408, c: 5 },
                    { w: 1900, c: 16 },
                    { w: 1300, c: 18 },
                ],
            }
        });
        const grid = gridRef.current
        grid.batchUpdate()
        grid.removeAll(false)
        widgets.forEach(({ id }) => grid.makeWidget(refs.current[id].current))
        grid.batchUpdate(false)
    }, [widgets])

    useEffect(() => {
        if (gridRef.current) {
            gridRef.current.setStatic(locked)
        }
    }, [locked])

    return (<div className="grid-stack">
        {widgets.map((widget) => <Box ref={refs.current[widget.id]} key={widget.id} className={'grid-stack-item'}
            gs-min-w={widget.layout.w}
            gs-min-h={widget.layout.h} >
            <Widget model={widget} edit={edit} />
        </Box>)}
    </div>)
}