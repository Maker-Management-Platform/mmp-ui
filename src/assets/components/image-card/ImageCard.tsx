import { ActionIcon, AspectRatio, Card, Group, Image, LoadingOverlay, rem, Text, useMantineTheme } from '@mantine/core';
import { IconZoomScan } from '@tabler/icons-react';
import classes from './ImageCard.module.css';
import { useToggle } from "@mantine/hooks";
import { DropDownMenu } from "../parts/drop-down-menu/DropDownMenu.tsx";
import { AssetCardProps } from '../AssetCardProps.ts';
import { SettingsContext } from '@/core/utils/settingsContext.ts';
import { useCallback, useContext, useState } from 'react';
import { Lightbox } from "react-modal-image";
import { SetAsMain } from '../parts/set-as-main/SetAsMain.tsx';

export function ImageCard({ projectUuid, asset, selected, onSelectChange, onDelete, onChange }: AssetCardProps) {
    const { local_backend } = useContext(SettingsContext);

    const [loading, setLoading] = useState(false);
    const toggleLoadingCallback = useCallback(() => {
        setLoading((l) => {
            return !l
        })
    }, [loading])

    const [value, toggle] = useToggle([false, true]);
    const theme = useMantineTheme();

    return (<>
        {value && <Lightbox
            medium={`${local_backend}/projects/${projectUuid}/assets/${asset.id}`}
            large={`${local_backend}/projects/${projectUuid}/assets/${asset.id}`}
            hideDownload={true}
            onClose={toggle}
        />}
        <Card withBorder padding="lg" radius="md" className={classes.card} style={{ borderColor: selected ? 'red' : '' }}>
            <Card.Section mb="sm" onClick={() => toggle()}>
                <AspectRatio ratio={16 / 9}>
                    <Image src={`${local_backend}/projects/${projectUuid}/assets/${asset.id}`} />
                </AspectRatio>
            </Card.Section>

            <Text fw={700} className={classes.title} mt="xs" onClick={() => onSelectChange(true)}>
                {asset.name}
            </Text>

            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ blur: 2 }} />
            <Card.Section className={classes.footer}>
                <Group justify="flex-end">
                    <Group gap={0}>
                        <ActionIcon variant="subtle" color="gray" onClick={() => toggle()}>
                            <IconZoomScan
                                style={{ width: rem(20), height: rem(20) }}
                                color={theme.colors.red[6]}
                                stroke={1.5}
                            />
                        </ActionIcon>
                        <DropDownMenu
                            projectUuid={projectUuid}
                            id={asset.id}
                            openDetails={() => onSelectChange(true)}
                            downloadURL={`${local_backend}/projects/${projectUuid}/assets/${asset?.id}?download=true'`}
                            onDelete={() => onDelete(projectUuid, asset.id)}
                            toggleLoad={toggleLoadingCallback}>
                            <SetAsMain projectUuid={projectUuid} assetId={asset.id} onChange={() => { onChange(projectUuid, asset.id) }} />
                        </DropDownMenu>
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    </>
    );
}