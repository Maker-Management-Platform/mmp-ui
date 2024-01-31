import { Widget } from "@/dashboard/entities/WidgetType";
import { Card, Image, Group, Badge, Anchor, Center } from "@mantine/core";
import classes from './PrinterWidget.module.css';
import { useContext } from "react";
import { SettingsContext } from "@/core/utils/settingsContext";
import { Printer } from "@/printers/entities/Printer";
import useAxios from "axios-hooks";
import { usePrinterState } from "@/printers/hooks/usePrinterState";
import { ExtruderTemp } from "../parts/heater-temp/ExtruderTemp";
import { BedTemp } from "../parts/bed-temp/BedTemp";
import { PrintProgress } from "../parts/print-progress/PrintProgress";
import { PrintProgressBar } from "../parts/print-progress-bar/PrintProgressBar";

export function PrinterWidget(w: Widget) {
    const { local_backend } = useContext(SettingsContext);
    const [{ data: printer, loading }] = useAxios<Printer>({ url: `${local_backend}/printers/${w.config.printer}` })
    const { state, loading: l, error } = usePrinterState(w.config.printer)

    if (loading || l) return <>Loading...</>;
    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section className={classes.pictureSection}>
                <Center>
                    {printer?.camera_url ? <Image
                        h={300}
                        w="auto"
                        fit="cover"
                        src={`${local_backend}/printers/${w.config.printer}/stream`} /> :
                        <Image src={'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'} />}

                </Center>
            </Card.Section>

            <Card.Section className={classes.section}>
                <PrintProgressBar state={state} />
            </Card.Section>
            <Card.Section className={classes.section} p="xs">
                <Group justify="apart">
                    <Anchor href={printer?.address} target="_blank">
                        {printer?.name}
                    </Anchor>
                    <Badge size="sm" variant="light">
                        {printer?.status}
                    </Badge>
                </Group>
            </Card.Section>
            <Group justify="center" className={classes.footer}>
                <ExtruderTemp state={state} />
                <BedTemp state={state} />
                <PrintProgress state={state} />
            </Group>
        </Card>
    )
}