import { SettingsContext } from "@/core/utils/settingsContext";
import { Tag } from "@/projects/entities/Project";
import { Button, TagsInput, TextInput } from "@mantine/core";
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
        <>
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
            <Button loading={loading} onClick={() => onChange(filter)}>Apply</Button>
            <Button loading={loading} variant="light" onClick={clear}>Clear</Button>
        </>
    )
}