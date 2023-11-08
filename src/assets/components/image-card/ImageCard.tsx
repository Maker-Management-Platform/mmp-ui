import {
    Card,
    Image,
    ActionIcon,
    Group,
    Text,
    useMantineTheme,
    rem, AspectRatio, Modal,
} from '@mantine/core';
import {IconHeart, IconBookmark, IconShare} from '@tabler/icons-react';
import classes from './ImageCard.module.css';
import {Asset} from "../../entities/Assets.ts";
import {baseURL} from "../../../core/config.ts";
import {Project} from "../../../projects/entities/Project.ts";
import {useToggle} from "@mantine/hooks";

type ImageCardProps = {
    project: Project;
    asset: Asset;
    onClick: () => void;
}

export function ImageCard({project, asset, onClick}: ImageCardProps) {
    const [value, toggle] = useToggle([false, true]);
    const theme = useMantineTheme();

    const size = rem('280px');
    return (<>
            <Modal  opened={value} onClose={() => toggle()}>
                <Image
                    src={`${baseURL}/projects/${project.uuid}/assets/${asset.sha1}`}
                    alt="Top 50 underrated plants for house decoration"
                />
            </Modal>
            <Card withBorder padding="lg" radius="md" className={classes.card} style={{minWidth: size, width: size}}
                  onClick={() => toggle()}>
                <Card.Section mb="sm">
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src={`${baseURL}/projects/${project.uuid}/assets/${asset.sha1}`}
                            alt="Top 50 underrated plants for house decoration"
                        />
                    </AspectRatio>
                </Card.Section>

                <Text fw={700} className={classes.title} mt="xs">
                    {asset.name}
                </Text>

                <Card.Section className={classes.footer}>
                    <Group justify="space-between">
                        <Group gap={0}>
                            <ActionIcon variant="subtle" color="gray">
                                <IconHeart
                                    style={{width: rem(20), height: rem(20)}}
                                    color={theme.colors.red[6]}
                                    stroke={1.5}
                                />
                            </ActionIcon>
                            <ActionIcon variant="subtle" color="gray">
                                <IconBookmark
                                    style={{width: rem(20), height: rem(20)}}
                                    color={theme.colors.yellow[6]}
                                    stroke={1.5}
                                />
                            </ActionIcon>
                            <ActionIcon variant="subtle" color="gray">
                                <IconShare
                                    style={{width: rem(20), height: rem(20)}}
                                    color={theme.colors.blue[6]}
                                    stroke={1.5}
                                />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Card.Section>
            </Card>
        </>
    );
}