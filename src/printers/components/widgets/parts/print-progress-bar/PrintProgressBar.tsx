import SSEContext from "@/core/sse/SSEContext";
import { Job } from "@/printers/entities/Printer";
import { Progress } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useId } from '@mantine/hooks';
import { useCumulativeEvent } from "@/core/sse/useCumulativeEvent";

interface PrintProgressBarProps {
    printerUuid: string;
}
export function PrintProgressBar({ printerUuid }: PrintProgressBarProps) {
    const subscriberId = useId();
    const { connected, subscribe, unsubscribe } = useContext(SSEContext)
    const [error, setError] = useState<Error | null>(null);
    const [job, setJob] = useCumulativeEvent<Job>({ progress: 0 });

    useEffect(() => {
        if (!connected) return;
        setJob({ progress: 0 });
        const subscription = {
            subscriberId,
            provider: `printers/${printerUuid}`,
        }
        subscribe({
            ...subscription,
            event: `printer.update.${printerUuid}.job_status`,
            callback: setJob
        }).catch(setError);
        return () => {
            unsubscribe(subscriberId)
        }
    }, [printerUuid, connected])
    return (
        <Progress value={job.progress * 100} radius={0} size="xs" />
    )
}