import { SettingsContext } from "@/core/settings/settingsContext";
import { ActionIcon, Menu, rem } from "@mantine/core";
import { IconDotsVertical, IconDownload, IconTrash } from "@tabler/icons-react";
import useAxios from "axios-hooks";
import { useContext } from "react";

type DropDownMenuProps = {
    id: string;
    projectUuid: string;
    children?: React.ReactNode;
    downloadURL?: string
    onDelete?: () => void;
    openDetails?: () => void;
    toggleLoad?: () => void;
}

export function DropDownMenu({ id, projectUuid, children, downloadURL, onDelete, openDetails, toggleLoad }: DropDownMenuProps) {
    const { settings } = useContext(SettingsContext);
    const [{ }, callDelete] = useAxios(
        {
            url: `${settings.localBackend}/projects/${projectUuid}/assets/${id}/delete`,
            method: 'POST'
        },
        { manual: true }
    );

    const handleDelete = () => {
        toggleLoad && toggleLoad();
        callDelete()
            .then((data) => {
                console.log(data);
                onDelete && onDelete();
            }).catch((e) => {
                console.log(e);
            })
            .finally(() => {
                console.log('finally')
                toggleLoad && toggleLoad();
            })
    }

    return (
        <Menu>
            <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                    <IconDotsVertical
                        style={{ width: rem(20), height: rem(20) }}
                        color="gray"
                        stroke={1.5}
                    />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                {children}
                {openDetails &&
                    <Menu.Item onClick={openDetails} leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}>
                        Details
                    </Menu.Item>}
                {downloadURL && <Menu.Item
                    component="a"
                    href={downloadURL}
                    leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}
                >Download</Menu.Item>}
                {onDelete && <><Menu.Divider />
                    <Menu.Item
                        color="red"
                        onClick={handleDelete}
                        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                    >Delete</Menu.Item></>}
            </Menu.Dropdown>
        </Menu>
    );
}
