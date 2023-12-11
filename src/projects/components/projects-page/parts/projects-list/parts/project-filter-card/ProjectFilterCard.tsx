import { Button, Card, Group, TagsInput, Text, TextInput } from '@mantine/core';
import classes from './ProjectFilterCard.module.css';
import { useEffect, useState } from "react";
import { Project } from "@/projects/entities/Project.ts";


type ProjectFilterCardProps = {
    onChange: (fn: (p: Project) => boolean) => void;
    projects?: Project[];
};

export function ProjectFilterCard({ onChange, projects }: ProjectFilterCardProps) {
    const [name, setName] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        const s = new Set<string>();
        projects?.forEach(p => p.tags.map(t => s.add(t)));
        setTags(Array.from(s.values()));
    }, [projects])

    const filter = (p: Project) => {
        let tagMatch = false;
        for (const i in selectedTags) {
            if (p.tags.indexOf(selectedTags[i]) >= 0) {
                tagMatch = true;
                break;
            };
        }

        return (selectedTags.length === 0 || tagMatch) && (name === '' || p.name.includes(name));
    }

    const clear = () => {
        setName('');
        setTags([]);
        return;
    }

    useEffect(() => {
        onChange(filter);
    }, [name, selectedTags])


    return (
        <Card withBorder radius="md" p="sm" className={classes.card}>
            <Text fz="lg" mb="sm" className={classes.title} fw={500}>
                Filter Projects
            </Text>
            <TextInput label="Name" mb="sm" value={name} onChange={(e) => setName(e.target.value)} />
            <TagsInput
                mb="sm"
                label="Tags"
                data={tags}
                maxDropdownHeight={200}
                onChange={setSelectedTags}
                splitChars={[',', ' ', '|']}
                clearable
            />
            <Group justify="flex-end">
                <Button variant="light" onClick={clear}>Clear</Button>
            </Group>
        </Card>
    );
}