import {Button, Card, Group, TagsInput, Text, TextInput} from '@mantine/core';
import classes from './ProjectFilterCard.module.css';
import {useEffect, useState} from "react";
import {Project} from "@/projects/entities/Project.ts";


type ProjectFilterCardProps = {
    onChange: (fn: (p: Project) => boolean) => void;
    projects?: Project[];
};

export function ProjectFilterCard({onChange, projects}: ProjectFilterCardProps) {
    const [name, setName] = useState('');

    const data = projects?.map(p => p.name) ?? [];

    const filter = (p: Project) => {
        return p.name.includes(name);
    }

    const clear = () => {
        setName('');
        return;
    }

    useEffect(() => {
        onChange(filter);
    }, [name])


    return (
        <Card withBorder radius="md" p="sm" className={classes.card}>
            <Text fz="lg" mb="sm" className={classes.title} fw={500}>
                Filter Projects
            </Text>
            <TextInput label="Name" mb="sm" value={name} onChange={(e) => setName(e.target.value)}/>
            <TagsInput
                mb="sm"
                label="Tags"
                data={data}
                maxDropdownHeight={200}
            />
            <Group justify="flex-end">
                <Button variant="light" onClick={clear}>Clear</Button>
            </Group>
        </Card>
    );
}