import axios from "axios"
import { Subscription } from "./SSEContext"
import ReconnectingEventSource from "reconnecting-eventsource";

type State = {
    url: string
    source: EventSource | null
    sessionId: string | null
    onConnect: (() => void) | null
    onError: ((err: Error) => void) | null
    providers: Map<string, number>
    evSubs: Map<string, Subscription[]>
    subs: Map<string, Subscription[]>
}

export type SubscriptionManager = {
    connect(): void;
    onError(fn: (err: Error) => void): void;
    onConnect(fn: () => void): void;
    subscribe(subscription: Subscription): Promise<Error | null>;
    unsubscribe(subscriberId: string): void;
    close(): void;
}

export const createSubsManager = (url: string): SubscriptionManager => {
    const state: State = {
        url,
        source: null,
        sessionId: null,
        onConnect: null,
        onError: null,
        providers: new Map<string, number>(),
        evSubs: new Map<string, Subscription[]>(),
        subs: new Map<string, Subscription[]>()
    }

    return {
        connect() {
            state.source = new ReconnectingEventSource(`${url}/events`, {
                max_retry_time: 10,
            })
            state.source.onmessage = (e: MessageEvent) => {
                const ev = JSON.parse(e.data);
                if (ev.event === 'connect') {
                    console.log("Connected", ev);
                    state.sessionId = ev.data.uuid;
                    state.onConnect && state.onConnect()
                    return;
                }
                if (ev.event) {
                    if (ev.data.state) {
                        state.evSubs.get(ev.event)?.forEach(sub => sub.callback(ev.data.state));
                    } else {
                        state.evSubs.get(ev.event)?.forEach(sub => sub.callback(ev.data));
                    }
                }
            }
            state.source.onerror = (e: Event) => {
                console.log("Error", e);
                state.evSubs = new Map<string, Subscription[]>();
                state.subs = new Map<string, Subscription[]>();
                state.providers = new Map<string, number>();
                state.onError && state.onError(new Error("Error connecting to server"))
            }
        },
        onConnect(fn: () => void) {
            state.onConnect = fn;
        },
        async subscribe(sub: Subscription) {
            if (state.evSubs.has(sub.event)) {
                let alreadySubed = false;
                state.evSubs.get(sub.event)?.forEach(s => {
                    if (s.subscriberId === sub.subscriberId) {
                        alreadySubed = true;
                    }
                });
                if (alreadySubed) {
                    console.log("already Subed");
                    return null;
                }
                state.providers.set(sub.provider, state.providers.get(sub.provider) + 1);
                state.evSubs.get(sub.event)?.push(sub);
            } else {
                state.evSubs.set(sub.event, [sub]);
                if (state.providers.has(sub.provider)) {
                    state.providers.set(sub.provider, state.providers?.get(sub.provider) + 1)
                } else {
                    state.providers.set(sub.provider, 1);
                    const response = await axios.get(`${url}/${sub.provider}/subscribe/${state.sessionId}`)
                    console.log(response);
                    if (response.status !== 200) {
                        console.log(response);
                        state.providers.delete(sub.provider);
                        state.evSubs.delete(sub.event);
                        return new Error("Error subscribing to provider");
                    }
                }
            }
            if (state.subs.has(sub.subscriberId)) {
                state.subs.get(sub.subscriberId)?.push(sub);
            } else {
                state.subs.set(sub.subscriberId, [sub]);
            }
            return null
        },
        unsubscribe(subId: string) {
            state.subs.get(subId)?.forEach(sub => {
                state.evSubs.get(sub.event)?.splice(state.evSubs.get(sub.event)?.indexOf(sub), 1);
                if (state.evSubs.get(sub.event)?.length <= 0) {
                    state.evSubs.delete(sub.event);
                }
                state.providers.set(sub.provider, state.providers.get(sub.provider) - 1);
                if (state.providers.get(sub.provider) <= 0) {
                    state.providers.delete(sub.provider);
                    axios.get(`${url}/${sub.provider}/unsubscribe/${state.sessionId}`).catch(e => console.log(e));
                }
                state.subs.delete(subId);
            })
        },
        onError(fn: (err: Error) => void) {
            state.onError = fn
        },
        close() {
            state.source?.close();
            state.source = null;
        }
    }

}