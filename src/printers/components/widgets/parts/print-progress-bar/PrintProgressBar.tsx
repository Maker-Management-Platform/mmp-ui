import { Progress } from "@mantine/core";
import { useState } from "react";
import { useEventSourceListener } from "react-sse-hooks";

interface PrintProgressBarProps {
    state: any;
    evSource: any;
}
export function PrintProgressBar({ state, evSource }: PrintProgressBarProps) {
    const [displayStatus, setDisplayStatus] = useState<{ progress: number }>({ progress: 0 });
    useEventSourceListener<{ progress: number }>(
        {
            source: evSource,
            startOnInit: true,
            event: {
                name: 'display_status',
                listener: ({ data }) => setDisplayStatus(data),
            },
        },
        [evSource],
    );
    return (
        <Progress value={displayStatus.progress * 100} radius={0} size="xs" />
    )
}