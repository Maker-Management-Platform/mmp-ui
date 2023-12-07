import { Button, Group, TagsInput, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Project } from "../../../entities/Project.ts";
import useAxios from "axios-hooks";
import { useContext, useState } from "react";
import { SettingsContext } from "@/core/utils/settingsContext.ts";
import { notifications } from '@mantine/notifications';
type ProjectFormProps = {
    project: Project;
    onProjectChange: (p: Project) => void;
};

export function ProjectForm({ project, onProjectChange }: ProjectFormProps) {
    const { local_backend } = useContext(SettingsContext);
    const [{ data, loading, error }, executeSave] = useAxios(
        {
            method: 'POST'
        },
        { manual: true }
    )
    const form = useForm({
        initialValues: {
            ...project,
        },
        validate: {
            name: (value) => (value.length < 2 ? 'Too short name' : null),
            path: (value) => (value.length < 1 ? 'Too short path' : null),
        },
    });
    const onSave = (project: Project) => {
        executeSave({
            url: `${local_backend}/projects/${project.uuid}`,
            data: {
                ...project,
            }
        })
            .then(({ data }) => {
                onProjectChange(data)
                notifications.show({
                    title: 'Great Success!',
                    message: 'Project updated',
                    color: 'indigo',
                })
            })
            .catch(({ message }) => {
                console.log(message)
                notifications.show({
                    title: 'Ops... Error updating project!',
                    message,
                    color: 'red',
                    autoClose: false
                })
            });
    };

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
                <Group justify="flex-end" mt="md">
                    <Button type="submit" loading={loading}>Submit</Button>
                </Group>
            </form>
        </>
    );
}
