import SSEContext from "@/core/sse/SSEContext";
import { useId } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";

type RefresherProps = {
    projectUUID: string;
    refresh: () => void;
}

export function Refresher({ projectUUID, refresh }: RefresherProps) {
    const subscriberId = useId();
    const { connected, subscribe, unsubscribe } = useContext(SSEContext)
    const [projectUpdate, setProjectUpdate] = useState({} as any)
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        if (!connected) return;
        setProjectUpdate({})
        const subscription = {
            subscriberId,
            provider: `system/events`,
        }
        subscribe({
            ...subscription,
            event: `system.state.project.event`,
            callback: setProjectUpdate
        }).catch(setError);
        return () => {
            unsubscribe(subscriberId)
        }
    }, [connected])

    useEffect(() => {
        console.log(projectUpdate)
        if (!projectUpdate.projectUUID) return;
        if (projectUpdate.projectUUID == projectUUID && projectUpdate.type == "update") {
            refresh();
        }
    }, [projectUpdate])
    return (<></>)
}