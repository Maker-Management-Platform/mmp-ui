import {Container, Group, rem, Stepper, Text} from '@mantine/core';
import {useContext, useEffect, useState} from "react";
import {Dropzone} from "@mantine/dropzone";
import {IconPhoto, IconUpload, IconX} from "@tabler/icons-react";
import useAxios from "axios-hooks";
import {ProjectForm} from "@/projects/components/parts/project-form/ProjectForm";
import {Project} from "@/projects/entities/Project.ts";
import { SettingsContext } from '@/core/utils/settingsContext.ts';

export function CreateProject() {
    const {local_backend} = useContext(SettingsContext);
    const [active, setActive] = useState(0);
    const [{data, loading: saving, error}, executeSave] = useAxios(
        {
            url: `${local_backend}/projects`,
            method: 'POST'
        },
        {manual: true}
    )
    const [{data: project, loading: lProject, error: eProject}, loadProject] = useAxios(
        `${local_backend}/projects/xx`,
        {manual: true}
    )

    const onDrop = (files: File[]) => {
        console.log(files);
        const formData = new FormData();
        formData.append("project", "new");
        files.forEach((file) => formData.append("files", file));
        executeSave({data: formData});
    };

    const onSave = (project: Project) => {
        console.log(project)
        nextStep();
    }

    useEffect(() => {
        if (!data) return;
        loadProject({url: `${local_backend}/projects/${data.uuid}`}).then(() => nextStep());
    }, [data]);

    const nextStep = () =>
        setActive((current) => {
            return current < 2 ? current + 1 : current;
        });

    return (
        <Container>
            <Stepper active={active}>
                <Stepper.Step label="Upload" description="Upload Project files">
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
                </Stepper.Step>
                <Stepper.Step label="Configuration" description="Configure Project">
                    <h1>{project?.name}</h1>
                    <ProjectForm project={project} onProjectChange={onSave}/>
                </Stepper.Step>
                <Stepper.Step label="Done" description="Enjoy your project">
                    <Text>Enjoy :)</Text>
                </Stepper.Step>
            </Stepper>
        </Container>
    );
}
