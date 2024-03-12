import SSEContext from "@/core/sse/SSEContext";
import { Anchor } from "@mantine/core";
import { useId } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function NewProjectNotification() {
    const subscriberId = useId();
    const { connected, subscribe, unsubscribe } = useContext(SSEContext)
    const [message, setMessage] = useState({} as any)
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        if (!connected) return;
        setMessage({})
        const subscription = {
            subscriberId,
            provider: `system/events`,
        }
        subscribe({
            ...subscription,
            event: `system.state.project.event`,
            callback: setMessage
        }).catch(setError);
        return () => {
            unsubscribe(subscriberId)
        }
    }, [connected])

    useEffect(() => {
        console.log(message)
        if (!message.state) return;
        if (message.state.type == "new") {
            notifications.show({
                title: `New project found`,
                message: <>Go to <Anchor component={Link} to={`/projects/${message.state.projectUUID}`}>{message.state.projectName}</Anchor></>,
            })
        }
    }, [message])
    return (<></>)
}