import {
    Card,
    ActionIcon,
    Group,
    Text,
    useMantineTheme,
    rem, AspectRatio, Paper,
} from '@mantine/core';
import {IconHeart, IconBookmark, IconShare, IconFileTypePdf, IconFile} from '@tabler/icons-react';
import classes from './FileCard.module.css';
import {Asset} from "../../entities/Assets.ts";
import {Project} from "../../../projects/entities/Project.ts";

type ImageCardProps = {
    project: Project;
    asset: Asset;
    onClick: () => void;
}

export function FileCard({project, asset, onClick}: ImageCardProps) {
    const theme = useMantineTheme();
    const iconMap = new Map<string, JSX.Element>();
    iconMap.set('.pdf', <IconFileTypePdf/>);
    iconMap.set('.jpg', <IconFile/>);


    const size = rem('280px');
    return (
        <Card withBorder padding="lg" radius="md" className={classes.card} style={{minWidth: size, width: size}}>
            <Card.Section mb="sm">
                <AspectRatio ratio={16 / 9}>
                    {iconMap.get(asset.extension) || <IconFile/>}
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
    );
}