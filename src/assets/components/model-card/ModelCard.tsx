import {
    Card,
    Image,
    ActionIcon,
    Group,
    Text,
    useMantineTheme,
    rem, AspectRatio,
} from '@mantine/core';
import { IconHeart, IconBookmark, IconShare } from '@tabler/icons-react';
import classes from './ModelCard.module.css';
import {Asset} from "../../entities/Assets.ts";
import {baseURL} from "../../../core/config.ts";
import {Project} from "../../../projects/entities/Project.ts";

type ModelCardProps = {
    project: Project;
    asset: Asset;
    onClick: () => void;
}

export function ModelCard({project, asset, onClick}: ModelCardProps) {
    const theme = useMantineTheme();

    const size = rem('280px');
    return (
        <Card withBorder padding="lg" radius="md" className={classes.card} style={{ minWidth: size, width: size}}>
            <Card.Section mb="sm">
                <AspectRatio ratio={16/9}>

                    <Image
                        src={`${baseURL}/projects/${project.uuid}/assets/${asset?.model.image_sha1}`}
                        alt={asset.name}
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
                                style={{ width: rem(20), height: rem(20) }}
                                color={theme.colors.red[6]}
                                stroke={1.5}
                            />
                        </ActionIcon>
                        <ActionIcon variant="subtle" color="gray">
                            <IconBookmark
                                style={{ width: rem(20), height: rem(20) }}
                                color={theme.colors.yellow[6]}
                                stroke={1.5}
                            />
                        </ActionIcon>
                        <ActionIcon variant="subtle" color="gray">
                            <IconShare
                                style={{ width: rem(20), height: rem(20) }}
                                color={theme.colors.blue[6]}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    );
}