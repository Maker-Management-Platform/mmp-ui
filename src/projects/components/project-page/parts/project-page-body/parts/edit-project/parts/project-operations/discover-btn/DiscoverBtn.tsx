import { ConfirmDialog } from "@/core/dialogs/confirm-dialog/ConfirmDialog";
import { SettingsContext } from "@/core/utils/settingsContext";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import useAxios from "axios-hooks";
import { useCallback, useContext, useState } from "react";

interface DiscoverBtnProps {
    projectUuid: string;
}

export function DiscoverBtn({ projectUuid }: DiscoverBtnProps) {
    const { local_backend } = useContext(SettingsContext);
    const [isOpen, setIsOpen] = useState(false);
    const [{ loading }, doDiscovery] = useAxios(
        {
            url: `${local_backend}/projects/${projectUuid}/discover`
        }, { manual: true })

    const onOk = useCallback(() => {
        setIsOpen(false);
        doDiscovery()
            .then(({ data }) => {
                console.log(data);
                notifications.show({
                    title: 'Great Success!',
                    message: 'Project discovery started',
                    color: 'indigo',
                })
            })
            .catch((e) => {
                console.log(e)
            });
    }, [doDiscovery])

    return (<>
        <Button color="blue" onClick={() => setIsOpen(true)} loading={loading}>Run discovery</Button>
        <ConfirmDialog opened={isOpen} onOk={onOk} onCancel={() => setIsOpen(false)} />
    </>
    )
}