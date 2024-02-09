import { Widget } from "@/dashboard/entities/WidgetType";
import { Card, Group, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "@/core/utils/settingsContext";
import { Job, Printer, Thermal } from "@/printers/entities/Printer";
import useAxios from "axios-hooks";
import { PrintProgressBar } from "../parts/print-progress-bar/PrintProgressBar";
import Printer3dNozzleHeatOutlineIcon from "mdi-react/Printer3dNozzleHeatOutlineIcon";
import { IconPercentage, IconSkateboarding } from "@tabler/icons-react";
import RadiatorDisabledIcon from "mdi-react/RadiatorDisabledIcon";
import { SSEContext } from "@/core/sse/SSEContext";
import { useId } from '@mantine/hooks';

export function PrinterTableWidget(w: Widget) {
    const { local_backend } = useContext(SettingsContext);
    const subscriberId = useId();
    const [{ data: printer, loading }] = useAxios<Printer>({ url: `${local_backend}/printers/${w.config.printer}` })
    const { connected, subscribe, unsubscribe } = useContext(SSEContext)
    const [error, setError] = useState<Error | null>(null);
    const [extruder, setExtruder] = useState<Thermal>({ temperature: 0 });
    const [heaterBed, setHeaterBed] = useState<Thermal>({ temperature: 0 });
    const [job, setJob] = useState<Job>({ progress: 0 });
    useEffect(() => {
        if (!connected) return;
        setExtruder({ temperature: 0 });
        setHeaterBed({ temperature: 0 });
        const subscription = {
            subscriberId,
            provider: `printers/${w.config.printer}`,
        }
        subscribe({
            ...subscription,
            event: `${w.config.printer}.extruder`,
            callback: setExtruder
        }).catch(setError);
        subscribe({
            ...subscription,
            event: `${w.config.printer}.heater_bed`,
            callback: setHeaterBed
        })
        subscribe({
            ...subscription,
            event: `${w.config.printer}.extruder`,
            callback: setJob
        }).catch(setError);
        return () => {
            unsubscribe(subscriberId)
        }
    }, [w.config.printer, connected])

    if (loading) return <>Loading...</>;
    return (
        <Card withBorder radius="md" p="md" style={{width:'100%'}}>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <Text fw={500} component="a" href={printer?.address} target="_blank">{printer?.name}</Text>
                </Group>
            </Card.Section>
            <Card.Section>
                <PrintProgressBar printerUuid={w.config.printer} />
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <IconSkateboarding />
                    <Text fw={500}>{error?.message}</Text>
                </Group>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <IconPercentage />
                    <Text fw={500}>Progress</Text>
                    <Text fw={500}>{(job.progress * 100).toFixed(2)}%</Text>
                </Group>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <Printer3dNozzleHeatOutlineIcon />
                    <Text fw={500}>Nozzle</Text>
                    <Text fw={500}>{(extruder.temperature ?? 0).toFixed(1)}°C</Text>
                </Group>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <RadiatorDisabledIcon />
                    <Text fw={500}>Bed</Text>
                    <Text fw={500}>{(heaterBed?.temperature ?? 0).toFixed(1)}°C</Text>
                </Group>
            </Card.Section>
        </Card>
    )
}