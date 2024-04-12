import SSEContext from "@/core/sse/SSEContext";
import { rem } from "@mantine/core";
import { useId } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";

export function DiscoveryNotifications() {
    const subscriberId = useId();
    const { connected, subscribe, unsubscribe } = useContext(SSEContext)
    const [id, setId] = useState<string | null>(null);
    const [message, setMessage] = useState({} as any)
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
            event: `system.state.discovery.scan`,
            callback: setMessage
        }).catch(setError);
        return () => {
            unsubscribe(subscriberId)
        }
    }, [connected])

    useEffect(() => {
        console.log(message)
        if (!message.state) return;
        if (message.state == "started") {
            setId(notifications.show({
                loading: true,
                title: "New Scan started",
                message: "Let's find new projects!",
                autoClose: false
            }))
        } else if (id) {
            notifications.update({
                id,
                color: 'teal',
                title: 'Scan finished!',
                message: '',
                icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
                loading: false,
                autoClose: 2000,
            });
        }
    }, [message])
    return (<></>)
}