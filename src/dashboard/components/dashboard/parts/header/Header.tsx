import { ActionIcon, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Widget } from "@/dashboard/entities/WidgetType";

interface HeaderProps {
    onAddWidget: (bla: Widget) => void;
}

export function Header({ onAddWidget }: HeaderProps) {
    function addWidget(): void {
        onAddWidget({
            id: "1",
            config: {
                type: "text",
            },
            layout: { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4, },
            type: {
                name: "text",
                description: "qwe",
                type: "text",
                element: <div>Hello</div>,
                configElement: <div>Hello</div>,
            },
            onChange: () => { console.log('qwe') },
        })
    }

    return (
        <Group>
            <ActionIcon onClick={addWidget}>
                <IconPlus />
            </ActionIcon>
        </Group>
    )
}