import SSEContext from "@/core/sse/SSEContext";
import { useId } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useContext, useEffect, useState } from "react";

export function EventNotifications() {
    const subscriberId = useId();
    const { connected, subscribe, unsubscribe } = useContext(SSEContext)
    const [message, setMessage] = useState("")
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        if (!connected) return;
        setMessage("")
        const subscription = {
            subscriberId,
            provider: `system/events`,
        }
        subscribe({
            ...subscription,
            event: `system.state`,
            callback: setMessage
        }).catch(setError);
        return () => {
            unsubscribe(subscriberId)
        }
    }, [connected])

    useEffect(() => {
        console.log(message)
        notifications.show({
            title: message,
            message: message,
        })
    }, [message])
    return (<></>)
}