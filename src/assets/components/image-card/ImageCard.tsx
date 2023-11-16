import {ActionIcon, AspectRatio, Card, Group, Image, Modal, rem, Text, useMantineTheme} from '@mantine/core';
import {IconZoomScan} from '@tabler/icons-react';
import classes from './ImageCard.module.css';
import {Asset} from "../../entities/Assets.ts";
import {baseURL} from "../../../core/config.ts";
import {useToggle} from "@mantine/hooks";
import {DownloadBtn} from "../parts/download-btn/DownloadBtn.tsx";
import {SelectBtn} from "../parts/select-btn/SelectBtn.tsx";

type ImageCardProps = {
    projectUuid: string;
    asset: Asset;
    selected: boolean;
    onSelectChange: (arg0: boolean) => void;
}

export function ImageCard({projectUuid, asset, selected, onSelectChange}: ImageCardProps) {
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
            <Card withBorder padding="lg" radius="md" className={classes.card} style={{minWidth: size, width: size}}>
                <Card.Section mb="sm" onClick={() => toggle()}>
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
                    <Group justify="flex-end">
                        <Group gap={0}>
                            <ActionIcon variant="subtle" color="gray" onClick={() => toggle()}>
                                <IconZoomScan
                                    style={{width: rem(20), height: rem(20)}}
                                    color={theme.colors.red[6]}
                                    stroke={1.5}
                                />
                            </ActionIcon>
                            <DownloadBtn
                                downloadLink={`${baseURL}/projects/${projectUuid}/assets/${asset?.sha1}?download=true'`}/>
                            <SelectBtn selected={selected} onChange={onSelectChange}/>
                        </Group>
                    </Group>
                </Card.Section>
            </Card>
        </>
    );
}