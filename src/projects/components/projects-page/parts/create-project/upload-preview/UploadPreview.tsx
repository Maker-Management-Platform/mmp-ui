import { ActionIcon, AspectRatio, Box, Button, Card, Group, Image, SimpleGrid, Stack, Text, rem } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

type UploadPreviewProps = {
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

export function UploadPreview({ files, onChange }: UploadPreviewProps) {

    const isImage = (f: File) => f.type.startsWith("image/");


    return (
        <><SimpleGrid cols={3}>
            {files.map((f, i) => <Card p={0} mx={0} withBorder radius="md" key={i}>
                <Group wrap="nowrap" gap={0}>
                    {isImage(f) ?
                        <ImgView file={f} /> :
                        <AspectRatio ratio={1} style={{ flex: `0 0 ${rem(100)}` }}>
                            <Image
                                src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
                            />
                        </AspectRatio>}
                    <Box w={isImage(f) ? 120 : 180} pl='sm'>
                        <Text size='sm' truncate="end">
                            {f.name}
                        </Text>
                    </Box>
                    {isImage(f) && <Stack p='sm' ml="auto" >
                        <ActionIcon
                            variant="gradient"
                            size="xl"
                            aria-label="Gradient action icon"
                            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                            onClick={() => onChange(f.name)}
                        >
                            <IconHeart />
                        </ActionIcon>
                    </Stack>}
                </Group>
            </Card>)}
        </SimpleGrid>
        </>
    )
}
