import { ConfirmDialog } from "@/core/dialogs/confirm-dialog/ConfirmDialog";
import { SettingsContext } from "@/core/utils/settingsContext";
import { Button, Fieldset } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import useAxios from "axios-hooks";
import { useContext, useState, useCallback } from "react";

export function ServerOperations() {
    const { local_backend } = useContext(SettingsContext);
    const [isOpen, setIsOpen] = useState(false);
    const [{ loading }, doDiscovery] = useAxios(
        {
            url: `${local_backend}/system/discovery`
        }, { manual: true })

    const onOk = useCallback(() => {
        setIsOpen(false);
        doDiscovery()
            .then(({ data }) => {
                console.log(data);
                notifications.show({
                    title: 'Great Success!',
                    message: 'Global discovery started',
                    color: 'indigo',
                })
            })
            .catch((e) => {
                console.log(e)
            });
    }, [doDiscovery])
    return (
        <Fieldset legend="Discovery">
        <Button color="blue" onClick={() => setIsOpen(true)} loading={loading}>Run discovery</Button>
            <ConfirmDialog opened={isOpen} onOk={onOk} onCancel={() => setIsOpen(false)} />
        </Fieldset >
    )
}