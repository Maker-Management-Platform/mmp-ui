import { useCallback, useState } from "react";

export function useCumulativeEvent<T>(initialState: T) {
    const [state, setState] = useState(initialState);
    const handler = useCallback((event: T) => setState((prev) => ({ ...prev, ...event })), []);

    return [state, handler] as const;
}
