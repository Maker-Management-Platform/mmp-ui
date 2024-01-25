import { ActionIcon, Autocomplete, Group, Stack, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const linkProviders = [
    { label: 'Thingiverse', value: 'thingiverse' },
    { label: 'MakerWorld', value: 'makerworld' },
    { label: 'Printables', value: 'printables' },
    { label: 'Cults', value: 'cults' },
    { label: 'Patreon', value: 'patreon' },
]

export function LinksInput() {
    return (
        <>
            <Group>
                <Autocomplete
                    label="Platform"
                    data={linkProviders}
                />
                <TextInput label="Link" />
                <ActionIcon mt='lg'>
                    <IconPlus />
                </ActionIcon>
            </Group>
            <Stack>
                <TextInput label="Title" />
                <TextInput label="Description" />
            </Stack>
        </>
    )
}