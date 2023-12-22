import useAxios from "axios-hooks";
import { AddPrinter } from "./parts/add-printer/AddPrinter";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "@/core/utils/settingsContext";
import { Anchor, Avatar, Badge, Group, Table, Text, ActionIcon, rem, Menu, Tabs } from "@mantine/core";
import { Printer, printerTypes } from "@/printers/entities/Printer";
import { IconDots, IconPhoto, IconReportAnalytics, IconSettings, IconTrash } from "@tabler/icons-react";
import { Header } from "@/core/header/Header";
import { notifications } from "@mantine/notifications";
import { Link } from "react-router-dom";

export function PrintersPage() {
    const iconStyle = { width: rem(12), height: rem(12) };
    const { local_backend } = useContext(SettingsContext);
    const [printers, setPrinters] = useState<Printer[]>([])
    const [{ data, loading: cLoading, error }] = useAxios({ url: `${local_backend}/printers` })
    const [{ loading: dLoading }, executeDelete] = useAxios({ method: 'POST' }, { manual: true })
    useEffect(() => {
        setPrinters(data)
    }, [data]);
    function deletePrinter(i: number): void {
        const printer = printers[i];
        executeDelete({
            url: `${local_backend}/printers/${printer.uuid}/delete`
        })
            .then(() => {
                notifications.show({
                    title: 'Great Success!',
                    message: 'Printer deleted!',
                    color: 'indigo',
                })
                const copy = [...printers]
                copy.splice(i, 1)
                setPrinters(copy)
            })
            .catch((e) => {
                console.log(e)
            });

    }

    return (<>
        <Header imagePath={'https://images.unsplash.com/photo-1611117775350-ac3950990985?q=80&w=2000&h=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
        <Tabs keepMounted={false} defaultValue="list">
            <Tabs.List>
                <Tabs.Tab value="list" leftSection={<IconPhoto style={iconStyle} />}>
                    Printers
                </Tabs.Tab>
                <Tabs.Tab value="new" ml="auto" leftSection={<IconSettings style={iconStyle} />}>
                    New
                </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="list">
                <Table.ScrollContainer minWidth={800}>
                    <Table verticalSpacing="sm">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>State</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Version</Table.Th>
                                <Table.Th />
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {printers && printers.map((printer, i) => (
                                <Table.Tr key={printer.uuid}>
                                    <Table.Td>
                                        <Group gap="sm">
                                            <Avatar size={30} src={printerTypes.get(printer.type).logo} radius={30} />
                                            <div>
                                                <Text fz="sm" fw={500}>
                                                    {printer.name}
                                                </Text>
                                                <Text c="dimmed" fz="xs">
                                                    <Anchor href={printer.address} target="_blank">
                                                        {printer.address}
                                                    </Anchor>
                                                </Text>
                                            </div>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td>
                                        {printer.state}
                                    </Table.Td>
                                    <Table.Td>
                                        <Badge color={printer.status == 'connected' ? 'blue' : 'red'} variant="light">
                                            {printer.status}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>
                                        <Text fz="sm">{printer.version}</Text>
                                    </Table.Td>
                                    <Table.Td>
                                        <Group gap={0} justify="flex-end">
                                            <Menu
                                                transitionProps={{ transition: 'pop' }}
                                                withArrow
                                                position="bottom-end"
                                                withinPortal
                                            >
                                                <Menu.Target>
                                                    <ActionIcon variant="subtle" color="gray" loading={dLoading}>
                                                        <IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                                    </ActionIcon>
                                                </Menu.Target>
                                                <Menu.Dropdown>
                                                    <Menu.Item
                                                        component={Link} to={`/printers/${printer.uuid}`}
                                                        leftSection={
                                                            <IconReportAnalytics style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                                        }
                                                    >Edit</Menu.Item>
                                                    <Menu.Item onClick={() => deletePrinter(i)}
                                                        leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                                                        color="red"
                                                    >Delete</Menu.Item>
                                                </Menu.Dropdown>
                                            </Menu>
                                        </Group>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Tabs.Panel>

            <Tabs.Panel value="new" pt={'xl'}>
                <AddPrinter />
            </Tabs.Panel>
        </Tabs>

    </>)
}