import { SettingsContext } from "@/core/utils/settingsContext";
import { IconPrinter } from "@tabler/icons-react";
import { Printer } from "@/printers/entities/Printer";
import { ActionIcon, Menu, rem } from "@mantine/core";
import useAxios from "axios-hooks";
import { useContext, useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";

type SentToPrinterBtnProps = {
    sha1: string
}

export function SendToPrinterBtn({ sha1 }: SentToPrinterBtnProps) {
    const { local_backend } = useContext(SettingsContext);
    const [printers, setPrinters] = useState<Printer[]>([])
    const [{ data, loading }] = useAxios({ url: `${local_backend}/printers` })
    const [{ loading: sLoading }, executeSendToPrinter] = useAxios({}, { manual: true })
    useEffect(() => {
        if (!data) return;
        setPrinters(data)
    }, [data])

    function sentToPrinter(p: Printer) {
        executeSendToPrinter({
            url: `${local_backend}/printers/${p.uuid}/send/${sha1}`
        })
            .then(() => {
                notifications.show({
                    title: 'Great Success!',
                    message: 'File sent to printer!',
                    color: 'indigo',
                })
            })
            .catch(({ message }) => {
                console.log(message)
                notifications.show({
                    title: 'Ops... Error sending file to printer!',
                    message,
                    color: 'red',
                    autoClose: false
                })
            });
    }

    return (<Menu
        transitionProps={{ transition: 'pop' }}
        withArrow
        position="bottom-end"
        withinPortal
    >
        <Menu.Target>
            <ActionIcon variant="subtle" color="gray" loading={loading || sLoading}>
                <IconPrinter style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
            {printers.map((p) => <Menu.Item onClick={() => sentToPrinter(p)}>{p.name}</Menu.Item>)}
        </Menu.Dropdown>
    </Menu>)
}