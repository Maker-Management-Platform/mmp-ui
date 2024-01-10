import { Button, Card, Group, LoadingOverlay, TagsInput, Text, TextInput } from '@mantine/core';
import classes from './ProjectFilterCard.module.css';
import { useContext, useEffect, useState } from "react";
import { Tag } from "@/projects/entities/Project.ts";
import useAxios from 'axios-hooks';
import { SettingsContext } from '@/core/utils/settingsContext';


export type Filter = {
    name: string;
    tags: string[];
}

type ProjectFilterCardProps = {
    onChange: (f: Filter) => void;
};

export function ProjectFilterCard({ onChange }: ProjectFilterCardProps) {
    const { local_backend } = useContext(SettingsContext);
    const [filter, setFilter] = useState<Filter>({ name: '', tags: [] })
    const [tags, setTags] = useState<string[]>([]);
    const [{ data, loading, error }] = useAxios<Tag[]>(
        `${local_backend}/tags`
    );

    useEffect(() => {
        if (!data) return;
        setTags(data.map(t => t.value));
    }, [data])

    const clear = () => {
        setFilter({ name: '', tags: [] })
        onChange({ name: '', tags: [] })
        return;
    }



    return (
        <Card withBorder radius="md" p="sm" className={classes.card}>
            <Text fz="lg" mb="sm" className={classes.title} fw={500}>
                Filter Projects
            </Text>
            <TextInput label="Name" mb="sm" value={filter.name} onChange={(e) => setFilter((f) => { return { ...f, name: e.target.value } })} />
            <TagsInput
                mb="sm"
                label="Tags"
                data={tags}
                maxDropdownHeight={200}
                value={filter.tags}
                onChange={(v) => setFilter((f) => { return { ...f, tags: v } })}
                splitChars={[',', ' ', '|']}
                clearable
            />
            <Group justify="flex-end">
                <Button onClick={() => onChange(filter)}>Apply</Button>
                <Button variant="light" onClick={clear}>Clear</Button>
            </Group>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ blur: 2 }} />
        </Card>
    );
}