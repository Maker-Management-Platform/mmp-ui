import { createContext } from "react";

export type Subscription = {
    subscriberId: string,
    provider: string,
    event: string,
    callback: (data: any) => void
}

interface SSEContextType {
    connected: boolean,
    loading: boolean,
    error: Error | null,
    subscribe: (Subscription: Subscription) => Promise<Error | null>,
    unsubscribe(subscriberId: string): void,
}

export const SSEContext = createContext<SSEContextType>({} as SSEContextType)

export default SSEContext;