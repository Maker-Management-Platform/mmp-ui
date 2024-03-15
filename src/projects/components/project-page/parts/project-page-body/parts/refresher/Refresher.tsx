import SSEContext from "@/core/sse/SSEContext";
import { Anchor } from "@mantine/core";
import { useId } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type RefresherProps = {
    projectUUID: string;
}

export function Refresher({ projectUUID }: RefresherProps) {
    const subscriberId = useId();
    const { connected, subscribe, unsubscribe } = useContext(SSEContext)
    const [assetUpdate, setAssetUpdate] = useState({} as any)
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        if (!connected) return;
        setAssetUpdate({})
        const subscription = {
            subscriberId,
            provider: `system/events`,
        }
        subscribe({
            ...subscription,
            event: `system.state.asset.event`,
            callback: setAssetUpdate
        }).catch(setError);
        return () => {
            unsubscribe(subscriberId)
        }
    }, [connected])

    useEffect(() => {
        console.log(assetUpdate)
        if (!assetUpdate.state) return;
        if (projectUUID == assetUpdate.state.projectUUID) {
            notifications.show({
                title: `Assets have changed`,
                message: <Anchor component={Link} reloadDocument to={`/projects/${projectUUID}`}>Refresh</Anchor>,
            })
        }
    }, [assetUpdate])
    return (<></>)
}