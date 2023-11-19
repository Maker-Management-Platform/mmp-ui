import {Dropzone} from "@mantine/dropzone";
import {Container, Group, rem, Text} from "@mantine/core";
import {IconPhoto, IconUpload, IconX} from "@tabler/icons-react";
import useAxios from "axios-hooks";


type AddAssetProps = {
    projectUuid: string
}

export function AddAsset({projectUuid}: AddAssetProps) {
    const [{loading: saving, error}, executeSave] = useAxios(
        {
            url: '/projects',
            method: 'POST'
        },
        {manual: true}
    )
    const onDrop = (files: File[]) => {
        console.log(files);
        const formData = new FormData();
        formData.append("project", projectUuid);
        files.forEach((file) => formData.append("files", file));
        executeSave({data: formData});
    };
    return (
        <>
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
            </Container>
        </>
    );
}
