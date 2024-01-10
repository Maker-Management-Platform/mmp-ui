import { ActionIcon, AspectRatio, Box, Card, Checkbox, Group, Image, SimpleGrid, Stack, Text, rem } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";

type UploadPreviewProps = {
    selected: string
    files: File[]
    onChange: (name: string) => void;
};

function ImgView({ file }: { file: File }) {
    if (!file.type.startsWith("image/")) return null;
    const src = URL.createObjectURL(file)
    return (
        <AspectRatio ratio={1} style={{ flex: `0 0 ${rem(100)}` }}>
            <Image src={src} />
        </AspectRatio>
    )
}

export function UploadPreview({ files, selected, onChange }: UploadPreviewProps) {

    const isImage = (f: File) => f.type.startsWith("image/");


    return (
        <>
            <SimpleGrid cols={3} mt='sm'>
                {files.sort((f1) => (isImage(f1) ? -1 : 0)).map((f, i) => <Card p={0} mx={0} withBorder radius="md" key={i}>
                    <Group wrap="nowrap" gap={0}>
                        {isImage(f) ?
                            <ImgView file={f} /> :
                            <AspectRatio ratio={1} style={{ flex: `0 0 ${rem(100)}` }}>
                                <IconFile />
                            </AspectRatio>}
                        <Box w={isImage(f) ? 120 : 180} pl='sm'>
                            <Text size='sm' truncate="end">
                                {f.name}
                            </Text>
                        </Box>
                        {isImage(f) && <Stack p='sm' ml="auto" >
                            <ActionIcon variant="subtle" color="gray" >
                                <Checkbox size="xl" checked={selected == f.name} onChange={() => onChange(f.name)} />
                            </ActionIcon>
                        </Stack>}
                    </Group>
                </Card>)}
            </SimpleGrid>
        </>
    )
}
