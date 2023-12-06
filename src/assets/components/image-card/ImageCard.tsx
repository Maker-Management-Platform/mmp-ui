import {ActionIcon, AspectRatio, Card, Group, Image, Modal, rem, Text, useMantineTheme} from '@mantine/core';
import {IconFileText, IconZoomScan} from '@tabler/icons-react';
import classes from './ImageCard.module.css';
import {useToggle} from "@mantine/hooks";
import {DropDownMenu} from "../parts/drop-down-menu/DropDownMenu.tsx";
import { AssetCardProps } from '../AssetCardProps.ts';
import { SettingsContext } from '@/core/utils/settingsContext.ts';
import { useContext } from 'react';

export function ImageCard({projectUuid, asset, selected, onSelectChange, onDelete}: AssetCardProps) {
    const {local_backend} = useContext(SettingsContext);
    const [value, toggle] = useToggle([false, true]);
    const theme = useMantineTheme();

    const size = rem('280px');
    return (<>
            <Modal opened={value} onClose={() => toggle()}>
                <Image src={`${local_backend}/projects/${projectUuid}/assets/${asset.sha1}`}/>
            </Modal>
            <Card withBorder padding="lg" radius="md" className={classes.card} style={{minWidth: size, width: size, borderColor: selected?'red':''}}>
                <Card.Section mb="sm" onClick={() => toggle()}>
                    <AspectRatio ratio={16 / 9}>
                        <Image src={`${local_backend}/projects/${projectUuid}/assets/${asset.sha1}`}/>
                    </AspectRatio>
                </Card.Section>

                <Text fw={700} className={classes.title} mt="xs" onClick={()=>onSelectChange(true)}>
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
                            <DropDownMenu
                                openDetails={()=>onSelectChange(true)}
                                downloadURL={`${local_backend}/projects/${projectUuid}/assets/${asset?.sha1}?download=true'`}
                                onDelete={() => onDelete(projectUuid, asset.sha1)}>
                            </DropDownMenu>
                        </Group>
                    </Group>
                </Card.Section>
            </Card>
        </>
    );
}