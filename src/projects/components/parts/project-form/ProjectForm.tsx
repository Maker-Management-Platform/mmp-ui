import { Button, Group, rem, TagsInput, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Project } from "../../../entities/Project.ts";
import useAxios from "axios-hooks";
import { useContext, useState } from "react";
import { SettingsContext } from "@/core/utils/settingsContext.ts";
import { notifications } from '@mantine/notifications';
import { Dropzone } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { UploadPreview } from "../upload-preview/UploadPreview.tsx";
type ProjectFormProps = {
    project: Project;
    onProjectChange: (p: Project) => void;
    withUpload?: boolean;
};

export function ProjectForm({ project, onProjectChange, withUpload }: ProjectFormProps) {
    const { local_backend } = useContext(SettingsContext);
    const [files, setFiles] = useState<File[]>([]);
    const [{ data, loading, error }, executeSave] = useAxios(
        {
            method: 'POST'
        },
        { manual: true }
    )
    const form = useForm({
        initialValues: {
            tags: [],
            ...project,
        },
        validate: {
            name: (value) => (value.length < 2 ? 'Too short name' : null),
        },
    });
    const onDrop = (files: File[]) => {
        console.log(files);
        setFiles(files)
    };
    const onSave = (project: Project) => {
        const formData = new FormData();
        formData.append("payload", JSON.stringify(project))
        if (files.length > 0) {
            files.forEach((file) => formData.append("files", file));
        }
        executeSave({
            url: `${local_backend}/projects${project.uuid ? "/" + project.uuid : ''}`,
            data: formData
        })
            .then(({ data }) => {
                onProjectChange(data)
                notifications.show({
                    title: 'Great Success!',
                    message: 'Project updated',
                    color: 'indigo',
                })
            })
            .catch((e) => {
                console.log(e)
            });
    };

    return (
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
            <TextInput
                mb="sm"
                label="External Link"
                {...form.getInputProps('external_link')}
            />
            <TagsInput
                mb="sm"
                label="Tags"
                maxDropdownHeight={200}
                {...form.getInputProps('tags')}
                value={form.values.tags.map(t => t.value)}
                onChange={(v) => form.setFieldValue('tags', v.map((s) => ({ value: s })))}
                splitChars={[',', ' ', '|']}
                clearable
            />
            {withUpload && <>
                <Dropzone onDrop={onDrop} mih={100}>
                    <Group justify="center" gap="xl" mih={100} style={{ pointerEvents: 'none' }}>
                        <Dropzone.Accept>
                            <IconUpload
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                                stroke={1.5}
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                                stroke={1.5}
                            />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconPhoto
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                                stroke={1.5}
                            />
                        </Dropzone.Idle>

                        <div>
                            <Text size="xl" inline>
                                Drag assets here or click to select files
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                                Attach as many files as you like
                            </Text>
                        </div>
                    </Group>
                </Dropzone>
                <UploadPreview files={files} selected={form.values.default_image_name} onChange={(name) => { console.log(name); form.setFieldValue('default_image_name', name) }} />
            </>}
            <Group justify="flex-end" mt="md">
                <Button type="submit" loading={loading}>Submit</Button>
            </Group>
        </form>
    );
}
