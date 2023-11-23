import {ActionIcon, Menu, rem} from "@mantine/core";
import {IconDotsVertical, IconDownload, IconTrash} from "@tabler/icons-react";

type DropDownMenuProps = {
    children?: React.ReactNode;
    downloadURL?: string
    onDelete?: () => void;
}

export function DropDownMenu({children, downloadURL, onDelete}: DropDownMenuProps) {
    return (
        <Menu>
            <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                    <IconDotsVertical
                        style={{width: rem(20), height: rem(20)}}
                        color="gray"
                        stroke={1.5}
                    />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                {children}
                {downloadURL && <Menu.Item
                    component="a"
                    href={downloadURL}
                    leftSection={<IconDownload style={{width: rem(14), height: rem(14)}}/>}
                >Download</Menu.Item>}
                {onDelete && <><Menu.Divider/>
                    <Menu.Item
                        color="red"
                        onClick={onDelete}
                        leftSection={<IconTrash style={{width: rem(14), height: rem(14)}}/>}
                    >Delete</Menu.Item></>}
            </Menu.Dropdown>
        </Menu>
    );
}
