import SSEContext from "@/core/sse/SSEContext";
import { Anchor } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useId, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function NewTempfileNotification() {
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
            event: `system.state.tempfile.new`,
            callback: setMessage
        }).catch(setError);
        return () => {
            unsubscribe(subscriberId)
        }
    }, [connected])

    useEffect(() => {
        console.log(message)
        if (!message.state) return;
        notifications.show({
            title: `New  temp file uploaded!`,
            message: <>Go to <Anchor component={Link} to={`/tempfiles`}>{message.state.name}</Anchor></>,
        })
    }, [message])
    return (<></>)
}