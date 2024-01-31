import { Widget } from "@/dashboard/entities/WidgetType";
import { Card, Group, Text } from "@mantine/core";
import { useContext } from "react";
import { SettingsContext } from "@/core/utils/settingsContext";
import { Printer } from "@/printers/entities/Printer";
import useAxios from "axios-hooks";
import { usePrinterState } from "@/printers/hooks/usePrinterState";
import { PrintProgressBar } from "../parts/print-progress-bar/PrintProgressBar";
import Printer3dNozzleHeatOutlineIcon from "mdi-react/Printer3dNozzleHeatOutlineIcon";
import { IconPercentage, IconSkateboarding } from "@tabler/icons-react";
import RadiatorDisabledIcon from "mdi-react/RadiatorDisabledIcon";

export function PrinterTableWidget(w: Widget) {
    const { local_backend } = useContext(SettingsContext);
    const [{ data: printer, loading }] = useAxios<Printer>({ url: `${local_backend}/printers/${w.config.printer}` })
    const { state, loading: l, error } = usePrinterState(w.config.printer)

    if (loading || l) return <>Loading...</>;
    return (
        <Card withBorder radius="md" p="md">
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <Text fw={500} component="a" href={printer?.address} target="_blank">{printer?.name}</Text>
                </Group>
            </Card.Section>
            <Card.Section>
                <PrintProgressBar state={state} />
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <IconSkateboarding />
                    <Text fw={500}>State</Text>
                    <Text fw={500}>{state?.display_status?.message}</Text>
                </Group>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <IconPercentage />
                    <Text fw={500}>Progress</Text>
                    <Text fw={500}>{(state?.display_status?.progress * 100).toFixed(2)}%</Text>
                </Group>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <Printer3dNozzleHeatOutlineIcon />
                    <Text fw={500}>Nozzle</Text>
                    <Text fw={500}>{(state?.extruder?.temperature ?? 0).toFixed(1)}°C</Text>
                </Group>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <RadiatorDisabledIcon />
                    <Text fw={500}>Bed</Text>
                    <Text fw={500}>{(state?.heater_bed?.temperature ?? 0).toFixed(1)}°C</Text>
                </Group>
            </Card.Section>
        </Card>
    )
}