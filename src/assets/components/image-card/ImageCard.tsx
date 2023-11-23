import {ActionIcon, AspectRatio, Card, Group, Image, Modal, rem, Text, useMantineTheme} from '@mantine/core';
import {IconFileText, IconZoomScan} from '@tabler/icons-react';
import classes from './ImageCard.module.css';
import {Asset} from "../../entities/Assets.ts";
import {baseURL} from "../../../core/config.ts";
import {useToggle} from "@mantine/hooks";
import {SelectBtn} from "../parts/select-btn/SelectBtn.tsx";
import {DropDownMenu} from "../parts/drop-down-menu/DropDownMenu.tsx";

type ImageCardProps = {
    projectUuid: string;
    asset: Asset;
    selected: boolean;
    onSelectChange: (arg0: boolean) => void;
    onDelete: (sha1: string) => void;
}

export function ImageCard({projectUuid, asset, selected, onSelectChange, onDelete}: ImageCardProps) {
    const [value, toggle] = useToggle([false, true]);
    const theme = useMantineTheme();

    const size = rem('280px');
    return (<>
            <Modal opened={value} onClose={() => toggle()}>
                <Image src={`${baseURL}/projects/${projectUuid}/assets/${asset.sha1}`}/>
            </Modal>
            <Card withBorder padding="lg" radius="md" className={classes.card} style={{minWidth: size, width: size}}>
                <Card.Section mb="sm" onClick={() => toggle()}>
                    <AspectRatio ratio={16 / 9}>
                        <Image src={`${baseURL}/projects/${projectUuid}/assets/${asset.sha1}`}/>
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
                            <SelectBtn selected={selected} onChange={onSelectChange}/>
                            <ActionIcon variant="subtle" color={theme.colors.blue[6]} onClick={() => toggle()}>
                                <IconFileText
                                    style={{width: rem(20), height: rem(20)}}
                                    stroke={1.5}
                                />
                            </ActionIcon>
                            <DropDownMenu
                                downloadURL={`${baseURL}/projects/${projectUuid}/assets/${asset?.sha1}?download=true'`}
                                onDelete={() => onDelete(asset.sha1)}>
                            </DropDownMenu>
                        </Group>
                    </Group>
                </Card.Section>
            </Card>
        </>
    );
}