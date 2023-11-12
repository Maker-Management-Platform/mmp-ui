import {ActionIcon, AspectRatio, Card, Group, Image, Modal, rem, Text, useMantineTheme,} from '@mantine/core';
import {IconBookmark, IconHeart, IconShare} from '@tabler/icons-react';
import classes from './ImageCard.module.css';
import {Asset} from "../../entities/Assets.ts";
import {baseURL} from "../../../core/config.ts";
import {useToggle} from "@mantine/hooks";

type ImageCardProps = {
    projectUuid: string;
    asset: Asset;
    selected: boolean;
    onFocus?: () => void;
    onSelectChange: (arg0: boolean) => void;
}

export function ImageCard({projectUuid, asset, onFocus}: ImageCardProps) {
    const [value, toggle] = useToggle([false, true]);
    const theme = useMantineTheme();

    const size = rem('280px');
    return (<>
            <Modal opened={value} onClose={() => toggle()}>
                <Image
                    src={`${baseURL}/projects/${projectUuid}/assets/${asset.sha1}`}
                    alt="Top 50 underrated plants for house decoration"
                />
            </Modal>
            <Card withBorder padding="lg" radius="md" className={classes.card} style={{minWidth: size, width: size}}
                  onClick={() => toggle()}>
                <Card.Section mb="sm">
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src={`${baseURL}/projects/${projectUuid}/assets/${asset.sha1}`}
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
                            <ActionIcon variant="subtle" color="gray" onClick={() => onFocus()}>
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