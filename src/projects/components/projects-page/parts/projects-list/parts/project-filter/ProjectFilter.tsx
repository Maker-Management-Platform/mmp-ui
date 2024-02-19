import { SettingsContext } from "@/core/settings/settingsContext";
import { Tag } from "@/projects/entities/Project";
import { ActionIcon, Group, TagsInput, TextInput, Transition, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter, IconSearch, IconX } from "@tabler/icons-react";
import useAxios from "axios-hooks";
import { useContext, useEffect, useState } from "react";


export type Filter = {
    name: string;
    tags: string[];
}

type ProjectFilterProps = {
    onChange: (f: Filter) => void;
};

export function ProjectFilter({ onChange }: ProjectFilterProps) {
    const { settings } = useContext(SettingsContext);
    const [filter, setFilter] = useState<Filter>({ name: '', tags: [] })
    const [tags, setTags] = useState<string[]>([]);
    const [{ data, loading, error }] = useAxios<Tag[]>(
        `${settings.localBackend}/tags`
    );

    useEffect(() => {
        if (!data) return;
        setTags(data.map(t => t.value));
    }, [data])

    const clear = () => {
        setFilter({ name: '', tags: [] })
        onChange({ name: '', tags: [] })
    }

    const [opened, handlers] = useDisclosure(false, {
        onClose: () => {
            clear()
        }
    });
    return (
        <Group gap="xs">
            <ActionIcon loading={loading} onClick={handlers.toggle}>
                {!opened && <IconFilter style={{ width: rem(20), height: rem(20) }} />}
                {opened && <IconX style={{ width: rem(20), height: rem(20) }} />}
            </ActionIcon>
            <Transition mounted={opened} transition='scale-x' >
                {(styles) =>
                    <Group style={styles}>
                        <TextInput placeholder="Name" value={filter.name} onChange={(e) => setFilter((f) => { return { ...f, name: e.target.value } })} />
                        <TagsInput
                            placeholder="Tags"
                            data={tags}
                            maxDropdownHeight={200}
                            value={filter.tags}
                            onChange={(v) => setFilter((f) => { return { ...f, tags: v } })}
                            splitChars={[',', ' ', '|']}
                            clearable
                        />
                        <ActionIcon loading={loading} onClick={() => onChange(filter)}>
                            <IconSearch style={{ width: rem(20), height: rem(20) }} />
                        </ActionIcon>
                    </Group>}
            </Transition>
        </Group>
    )
}