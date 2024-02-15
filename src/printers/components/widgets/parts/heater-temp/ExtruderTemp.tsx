import { useId } from "@mantine/hooks";
import { Temp } from "../temp/Temp";
import Printer3dNozzleHeatOutlineIcon from "mdi-react/Printer3dNozzleHeatOutlineIcon";
import SSEContext from "@/core/sse/SSEContext";
import { useCumulativeEvent } from "@/core/sse/useCumulativeEvent";
import { Thermal } from "@/printers/entities/Printer";
import { useContext, useEffect, useState } from "react";

interface HeaterTempProps {
    printerUuid: string;
}


export function ExtruderTemp({ printerUuid }: HeaterTempProps) {
    const subscriberId = useId();
    const { connected, subscribe, unsubscribe } = useContext(SSEContext)
    const [error, setError] = useState<Error | null>(null);
    const [extruder, setExtruder] = useCumulativeEvent<Thermal>({ temperature: 0, target: 0 });
    useEffect(() => {
        if (!connected) return;
        setExtruder({ temperature: 0, target: 0 });
        const subscription = {
            subscriberId,
            provider: `printers/${printerUuid}`,
        }
        subscribe({
            ...subscription,
            event: `printer.update.${printerUuid}.extruder`,
            callback: setExtruder
        }).catch(setError);
        return () => {
            unsubscribe(subscriberId)
        }
    }, [printerUuid, connected])
    return (
        <Temp icon={<Printer3dNozzleHeatOutlineIcon />} current={extruder?.temperature ?? 0} target={extruder?.target} />
    )
}