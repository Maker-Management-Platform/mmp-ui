import {AspectRatio, Card, Group, Image, rem, Text} from '@mantine/core';
import classes from './SliceCard.module.css';
import {Asset} from "../../entities/Assets.ts";
import {baseURL} from "../../../core/config.ts";
import {SelectBtn} from "../parts/select-btn/SelectBtn.tsx";
import {DownloadBtn} from "../parts/download-btn/DownloadBtn.tsx";

type SliceCardProps = {
    projectUuid: string;
    asset: Asset;
    selected: boolean;
    onSelectChange: (arg0: boolean) => void;
}

export function SliceCard({projectUuid, asset, selected, onSelectChange}: SliceCardProps) {

    const size = rem('280px');
    return (
        <Card withBorder padding="lg" radius="md" className={classes.card} style={{minWidth: size, width: size}}>
            <Card.Section mb="sm">
                <AspectRatio ratio={16 / 9}>

                    <Image
                        src={`${baseURL}/projects/${projectUuid}/assets/${asset?.slice?.image.sha1}`}
                        alt={asset.name}
                    />
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