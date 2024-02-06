import axios from "axios"
import { Subscription } from "../sse2/SSEContext"

type State = {
    url: string
    source: EventSource | null
    sessionId: string | null
    onConnect: (() => void) | null
    providers: Map<string, number>
    subs: Map<string, Subscription[]>
}

export type SubscriptionManager = {
    connect(): void;
    onError(fn: (err: Error) => void): void;
    onConnect(fn: () => void): void;
    subscribe(subscription: Subscription): void;
    unsubscribe(subscriberId: string): void;
    close(): void;
}

export const createSubsManager = (url: string): SubscriptionManager => {
    const state: State = {
        url,
        source: null,
        sessionId: null,
        onConnect: null,
        providers: new Map<string, number>(),
        subs: new Map<string, Subscription[]>()
    }

    return {
        connect() {
            state.source = new EventSource(`${url}/events`)
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
                        state.subs.get(ev.event)?.forEach(sub => sub.callback(ev.data.state));
                    } else {
                        state.subs.get(ev.event)?.forEach(sub => sub.callback(ev.data));
                    }
                }
            }
        },
        onConnect(fn: () => void) {
            state.onConnect = fn;

        },
        subscribe(sub: Subscription) {
            console.log("Subscribing", sub.subscriberId, sub.event)
            if (state.subs.has(sub.event)) {
                let alreadySubed = false;
                state.subs.get(sub.event)?.forEach(s => {
                    if (s.subscriberId === sub.subscriberId) {
                        alreadySubed = true;
                    }
                });
                if (alreadySubed) {
                    console.log("already Subed");
                    return;
                }
                state.subs.get(sub.event)?.push(sub);
            } else {
                state.subs.set(sub.event, [sub]);
                if (state.providers.has(sub.provider)) {
                    state.providers.set(sub.provider, state.providers?.get(sub.provider) + 1)
                } else {
                    state.providers.set(sub.provider, 1);
                    axios.get(`${url}/${sub.provider}/subscribe/${state.sessionId}`).then(() => {
                        console.log("Subscribed");
                    });
                }
            }
        },
        unsubscribe(subId: string) {
            console.log("Unsub", subId)

        },
        onError(fn: (err: Error) => void) {

        },
        close() {
            state.source?.close();
        }
    }

}