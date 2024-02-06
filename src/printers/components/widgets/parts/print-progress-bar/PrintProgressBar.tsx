import { Progress } from "@mantine/core";
import { useState } from "react";

interface PrintProgressBarProps {
    state: any;
}
export function PrintProgressBar({ state }: PrintProgressBarProps) {
    const [displayStatus, setDisplayStatus] = useState<{ progress: number }>({ progress: 0 });
    return (
        <Progress value={displayStatus.progress * 100} radius={0} size="xs" />
    )
}