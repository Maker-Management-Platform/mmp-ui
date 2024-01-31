import { Progress } from "@mantine/core";

interface PrintProgressBarProps {
    state: any;
}
export function PrintProgressBar({ state }: PrintProgressBarProps) {
    return (
        <Progress value={state?.display_status?.progress*100} size="lg" radius={0} size="xs"/>
    )
}