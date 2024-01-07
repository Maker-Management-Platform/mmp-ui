import {Container, Group, rem, Stepper, Text} from '@mantine/core';
import {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Dropzone} from "@mantine/dropzone";
import {IconPhoto, IconUpload, IconX} from "@tabler/icons-react";
import useAxios from "axios-hooks";
import {ProjectForm} from "@/projects/components/parts/project-form/ProjectForm";
import {Project} from "@/projects/entities/Project.ts";
import { SettingsContext } from '@/core/utils/settingsContext.ts';
import { notifications } from '@mantine/notifications';
import { UploadPreview } from './upload-preview/UploadPreview';

export function CreateProject() {
    const {local_backend} = useContext(SettingsContext);
    const navigate = useNavigate();
    const [files, setFiles] = useState<File[]>([]);
    const emptyProject: Project = {
        uuid: "",
        name: "Project Name",
        description: "",
        path: "projectPath",
        external_link: "",
        tags: [],
        default_image_id: "",
        initialized: false,
        assets: []
    };
    const [{data, loading: saving, error}, executeSave] = useAxios(
        {
            url: `${local_backend}/projects`,
            method: 'POST'
        },
        {manual: true}
    )

    const onDrop = (files: File[]) => {
        console.log(files);
        setFiles(files)
    };

    const onSave = (project: Project) => {
        console.log(project)

        const formData = new FormData();
        formData.append("project", "new");
        formData.append("payload", JSON.stringify(project))
        files.forEach((file) => formData.append("files", file));

        executeSave({data: formData}).then((data) => {
            if (!data.data.uuid) {
                throw Error("UUID not provided in response")
            }

            navigate(`/projects/${data.data.uuid}`)
        })
        .catch(({ message }) => {
            console.log(message)
            notifications.show({
                title: 'Ops... Error creating project!',
                message,
                color: 'red',
                autoClose: false
            })
        });;
    }

    return (
        <Container>
            <Dropzone onDrop={onDrop} mih={220} loading={saving}>
                <Group justify="center" gap="xl" mih={220} style={{pointerEvents: 'none'}}>
                    <Dropzone.Accept>
                        <IconUpload
                            style={{width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)'}}
                            stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            style={{width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)'}}
                            stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto
                            style={{width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)'}}
                            stroke={1.5}
                        />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag images here or click to select files
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>
            <UploadPreview files={files} onChange={function (name: string): void {
                throw new Error('Function not implemented.');
            } } />
            <ProjectForm project={emptyProject} onProjectChange={onSave} avoidSave={true}/>
        </Container>
    );
}
