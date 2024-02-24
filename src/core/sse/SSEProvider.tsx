import { useContext, useEffect, useMemo, useState } from "react";
import { SettingsContext } from "../settings/settingsContext";
import { SSEContext } from "./SSEContext";
import { SubscriptionManager, createSubsManager } from "./SubscriptionManager";

export function SSEProvider({ children }) {
    const { settings } = useContext(SettingsContext);

    const [subManager, setSubManager] = useState<SubscriptionManager>()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [connected, setConnected] = useState<boolean>(false);



    useEffect(() => {
        if (settings.localBackend) {
            setLoading(true);
            setConnected(false);
            setError(null);
            const subManager = createSubsManager(settings.localBackend)
            setSubManager(subManager);
            subManager.onConnect(() => {
                setLoading(false);
                setConnected(true);
            })
            subManager.onError((error) => {
                setLoading(false);
                setConnected(false);

                setError(error);
            })
            subManager.connect()
        }
        return () => {
            console.log('qweqew')
            subManager?.close();
        }
    }, [settings.localBackend])



    return (
        <SSEContext.Provider value={useMemo(() => ({ connected, loading, error, subscribe: subManager?.subscribe, unsubscribe: subManager?.unsubscribe }), [connected, loading, error, subManager])}>
            {children}
        </SSEContext.Provider>
    )
}