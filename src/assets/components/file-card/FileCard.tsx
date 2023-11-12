import {AspectRatio, Card, Group, rem, Text,} from '@mantine/core';
import {IconFile, IconFileTypePdf} from '@tabler/icons-react';
import classes from './FileCard.module.css';
import {Asset} from "../../entities/Assets.ts";
import {DownloadBtn} from "../parts/download-btn/DownloadBtn.tsx";
import {baseURL} from "../../../core/config.ts";
import {SelectBtn} from "../parts/select-btn/SelectBtn.tsx";

type ImageCardProps = {
    projectUuid: string;
    asset: Asset;
    selected: boolean
    onSelectChange: (arg0: boolean) => void;
}

export function FileCard({asset, projectUuid, selected, onSelectChange}: ImageCardProps) {
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
                <Group justify="flex-end">
                    <Group gap={0}>
                        <DownloadBtn
                            downloadLink={`${baseURL}/projects/${projectUuid}/assets/${asset?.sha1}?download=true'`}/>
                        <SelectBtn selected={selected} onChange={onSelectChange}/>
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    );
}