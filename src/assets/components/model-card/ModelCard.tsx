import {AspectRatio, Card, Group, Image, rem, Text} from '@mantine/core';
import classes from './ModelCard.module.css';
import {Asset} from "../../entities/Assets.ts";
import {baseURL} from "../../../core/config.ts";
import {DownloadBtn} from "../parts/download-btn/DownloadBtn.tsx";
import {SelectBtn} from "../parts/select-btn/SelectBtn.tsx";

type ModelCardProps = {
    projectUuid: string;
    asset: Asset;
    selected: boolean;
    onSelectChange: (arg0: boolean) => void;
}

export function ModelCard({projectUuid, asset, selected, onSelectChange}: ModelCardProps) {

    const size = rem('280px');
    return (
        <Card withBorder padding="lg" radius="md" className={classes.card} style={{ minWidth: size, width: size}}>
            <Card.Section mb="sm">
                <AspectRatio ratio={16/9}>

                    <Image
                        src={`${baseURL}/projects/${projectUuid}/assets/${asset?.model?.image_sha1}`}
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