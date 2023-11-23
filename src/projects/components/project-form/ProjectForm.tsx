import {ActionIcon, Autocomplete, Button, Group, rem, TagsInput, Textarea, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {Project} from "../../entities/Project.ts";
import useAxios from "axios-hooks";
import {IconHomeMove} from '@tabler/icons-react';
import {useState} from "react";

type ProjectFormProps = {
    project: Project;
    onSave: (p: Project) => void;
    loading?: boolean;
};

export function ProjectForm({project, loading, onSave}: ProjectFormProps) {
    const [{data: paths, loading: lPaths, error: ePaths}] = useAxios(
        {
            url: '/system/paths'
        }
    )
    const [{loading: lMove, error: eMove}, moveProject] = useAxios({
        method: 'post',
    }, {manual: true})

    const form = useForm({
        initialValues: {
            ...project,
        },
        validate: {
            name: (value) => (value.length < 2 ? 'Too short name' : null),
            path: (value) => (value.length < 1 ? 'Too short path' : null),
        },
    });
    const [path, setPath] = useState(form.values.path);
    const onMoveHandler = () => {
        moveProject({
            url: `/projects/${project.uuid}/move`,
            data: {
                uuid: project.uuid,
                path: path
            }
        }).then(({data}) => {
            console.log(data);
            setPath(data.path);
            form.setFieldValue('path', data.path);
        });
    }
    return (
        <>
            <form onSubmit={form.onSubmit(onSave)}>
                <TextInput
                    mb="sm"
                    label="Name"
                    {...form.getInputProps('name')}
                />
                <Textarea
                    mb="sm"
                    label="Desciption"
                    {...form.getInputProps('description')}
                />
                <TagsInput
                    mb="sm"
                    label="Tags"
                    maxDropdownHeight={200}
                    {...form.getInputProps('tags')}
                />
                <Autocomplete
                    label="Path"
                    data={paths}
                    value={path}
                    onChange={setPath}
                    disabled={lPaths}
                    rightSection={
                        <ActionIcon size={32} color={'blue'} variant="filled" onClick={onMoveHandler} loading={lMove}>
                            <IconHomeMove style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                        </ActionIcon>
                    }
                />
                <Group justify="flex-end" mt="md">
                    <Button type="submit" loading={loading || lMove}>Submit</Button>
                </Group>
            </form>
        </>
    );
}
