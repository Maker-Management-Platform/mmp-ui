import { Widget } from "@/dashboard/entities/WidgetType";
import { Button, Card, Image, Group, ActionIcon, Badge, Anchor } from "@mantine/core";
import classes from './PrinterWidget.module.css';
import { IconHeart } from "@tabler/icons-react";
import { useContext } from "react";
import { SettingsContext } from "@/core/utils/settingsContext";
import { Printer } from "@/printers/entities/Printer";
import useAxios from "axios-hooks";

export function PrinterWidget(w: Widget) {
    const { local_backend } = useContext(SettingsContext);
    const [{ data: printer, loading }] = useAxios<Printer>({ url: `${local_backend}/printers/${w.config.printer}` })
    if (loading) return <>Loading...</>;

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'} height={180} />
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

            <Group mt="xs">
                <Button radius="md" style={{ flex: 1 }}>
                    Show details
                </Button>
                <ActionIcon variant="default" radius="md" size={36}>
                    <IconHeart className={classes.like} stroke={1.5} />
                </ActionIcon>
            </Group>
        </Card>
    )
}