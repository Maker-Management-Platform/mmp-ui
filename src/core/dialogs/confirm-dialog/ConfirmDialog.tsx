import { Button, Dialog, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";

interface ConfirmDialogProps {
    opened: boolean;
    onOk: () => void;
    onCancel?: () => void;
}

export function ConfirmDialog({ opened, onOk, onCancel }: ConfirmDialogProps) {
    const [isOpen, setIsOpen] = useState(opened);

    useEffect(() => {
        console.log("opened", opened)
        setIsOpen(opened);
    }, [opened])
    return (
        <Dialog opened={isOpen} size="md" radius="md">
            <Text size="sm" mb="xs" fw={500}>
                Are you sure?
            </Text>

            <Group align="flex-start">
                <Button color="red" onClick={onOk}>Yes, leave me alone!</Button>
                <Button onClick={onCancel}>No</Button>
            </Group>
        </Dialog>
    )
}