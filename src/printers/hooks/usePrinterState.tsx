import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "@/core/utils/settingsContext";

export function usePrinterState(printerUUID: string) {

    const { local_backend } = useContext(SettingsContext);
    const [state, setState] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        //setLoading(true);
        /*const source = new EventSource(`${local_backend}/printers/${printerUUID}/status`);


        source.onmessage = (event) => {
            setLoading(false);
            setError(null);
            const ev = JSON.parse(event.data);
            setState((prev: any) => {
                let rtn = { ...prev }
                for (const i in ev) {
                    let n = {};
                    if (ev[i].name in prev) {
                        n = { ...prev[ev[i].name] }
                    }
                    rtn[ev[i].name] = { ...n, ...ev[i].state };
                }
                //console.log(rtn);
                return rtn;
            });
        };
        source.onerror = (event) => {
            setLoading(false);
            console.error(event);
            setError(new Error("EventSource failed."));
            source.close();
        };

        return () => {
            source.close();
        };*/
    }, [printerUUID]);

    return {
        state,
        loading,
        error,
    };
}