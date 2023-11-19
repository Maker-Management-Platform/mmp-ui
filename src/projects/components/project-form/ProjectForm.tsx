import {Button, Group, TagsInput, Textarea, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {Project} from "../../entities/Project.ts";

type ProjectFormProps = {
    project: Project;
    onSave: (p: Project) => void;
    loading?: boolean;
};

export function ProjectForm({project, loading, onSave}: ProjectFormProps) {
    const form = useForm({
        initialValues: {
            ...project,
        },
        validate: {
            name: (value) => (value.length < 2 ? 'Too short name' : null),
        },
    });
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
