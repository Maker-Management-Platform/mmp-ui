import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SettingsContext } from "../utils/settingsContext";
import { SSEContext, Subscription } from "./SSEContext";
import useAxios from "axios-hooks";

export function SSEProvider({ children }) {
    const { local_backend } = useContext(SettingsContext);
    const [{ }, handleSub] = useAxios({}, { manual: true, autoCancel: false });

    const [sessionId, setSessionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [connected, setConnected] = useState<boolean>(false);

    const [providerMap, setProviderMap] = useState<Map<string, number>>(new Map([]));
    const [subsMap, setSubsMap] = useState<Map<string, Subscription[]>>(new Map([]));
    const [subQueue, setSubQueue] = useState<Subscription[]>([]);

    const wee = new Map<string, string>(new Map([]))

    const [lastEvent, setLastEvent] = useState<MessageEvent>()

    const onSubscribe = useCallback((sub: Subscription) => {
        console.log("Subscribing", sub.subscriberId, sub.event)
        wee.set(sub.subscriberId, sub.provider)
        if (subsMap.has(sub.event)) {
            let alreadySubed = false;
            subsMap.get(sub.event)?.forEach(s => {
                if (s.subscriberId === sub.subscriberId) {
                    alreadySubed = true;
                }
            });
            if (alreadySubed) return;
            setSubsMap(prev => {
                const newMap = new Map(prev);
                newMap.get(sub.event)?.push(sub);
                return newMap;
            });
        } else {
            setSubsMap(prev => {
                const newMap = new Map(prev);
                newMap.set(sub.event, [sub]);
                return newMap;
            });
            let shouldInitProvider = false;
            if (!providerMap.has(sub.provider)) {
                setProviderMap(prev => {
                    const newMap = new Map(prev);
                    newMap.set(sub.provider, 1);
                    return newMap;
                })
                shouldInitProvider = true;
            } else {
                setProviderMap(prev => {
                    const newMap = new Map(prev);
                    newMap.set(sub.provider, newMap.get(sub.provider) + 1);
                    return newMap;
                })
            }
            if (shouldInitProvider) {
                handleSub({ url: `${local_backend}/${sub.provider}/subscribe/${sessionId}` })
                    .then(() => {
                        console.log("Subscribed");
                    });
            }
        }

    }, [sessionId, subsMap, providerMap]);

    const onUnsubscribe = (sub: Subscription) => {
        const { event, provider, subscriberId } = sub;
        console.log("Unsubscribing", sub.subscriberId, sub.event, wee)
        if (!subsMap.has(event)) return;
        setSubsMap(prev => {
            const newMap = new Map(prev);
            newMap.get(event)?.forEach(s => {
                if (s.subscriberId === subscriberId) {
                    newMap.get(event)?.splice(newMap.get(event)?.indexOf(s), 1);
                }
            });
            return newMap;
        })
        if (subsMap.get(event)?.length - 1 <= 0) {
            setSubsMap(prev => {
                const newMap = new Map(prev);
                newMap.delete(event);
                return newMap;
            });
        }
        if (!providerMap.has(provider)) return;
        const newCount = providerMap.get(provider) - 1;
        if (newCount > 0) {
            setProviderMap(prev => {
                const newMap = new Map(prev);
                newMap.set(provider, newCount);
                return newMap;
            })
        } else {
            setProviderMap(prev => {
                const newMap = new Map(prev);
                newMap.delete(provider);
                return newMap;
            });
            handleSub({ url: `${local_backend}/${provider}/unsubscribe/${sessionId}` })
                .then(() => {
                    console.log("unSubscribed");
                });
        }
    };


    const subscribe = useCallback((sub: Subscription) => {
        if (!connected) {
            setSubQueue(prev => [...prev, sub])
        } else {
            onSubscribe(sub);
        }
        return () => {
            onUnsubscribe(sub);
        }
    }, [subsMap])

    useEffect(() => {
        if (!lastEvent) return;
        const ev = JSON.parse(lastEvent.data);
        wee.has('qweqe')
        if (ev.event === 'connect') {
            console.log("Connected");
            setSessionId(ev.data.uuid);
            setLoading(false);
            setConnected(true);
            return;
        }

        if (ev.event) {
            if (ev.data.state) {
                subsMap.get(ev.event)?.forEach(sub => sub.callback(ev.data.state));
            } else {
                subsMap.get(ev.event)?.forEach(sub => sub.callback(ev.data));
            }
        }

    }, [lastEvent]);


    useEffect(() => {
        if (!sessionId) return;
        subQueue.forEach(sub => onSubscribe(sub));
    }, [sessionId, subQueue]);

    useEffect(() => {
        console.log(subsMap)
    }, [subsMap])

    useEffect(() => {
        if (!local_backend) return;
        setLoading(true);
        setConnected(false);
        setError(null);
        console.log("SSEProvider", local_backend);
        const source = new EventSource(`${local_backend}/events`);
        source.onmessage = setLastEvent
        source.onerror = (event) => {
            setLoading(false);
            setConnected(false);
            console.error(event);
            setError(new Error("EventSource failed."));
            source.close();
        };
        return () => {
            setConnected(false)
            source.close();
        }
    }, [local_backend])



    return (
        <SSEContext.Provider value={useMemo(() => ({ connected, loading, error, subscribe }), [connected, loading, error, subscribe])}>
            {children}
        </SSEContext.Provider>
    )
}