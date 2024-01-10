import { ActionIcon, AspectRatio, Card, Group, Image, LoadingOverlay, Modal, rem, Text, useMantineTheme, Menu } from '@mantine/core';
import { IconZoomScan, IconHeart } from '@tabler/icons-react';
import classes from './ImageCard.module.css';
import { useToggle } from "@mantine/hooks";
import { DropDownMenu } from "../parts/drop-down-menu/DropDownMenu.tsx";
import { AssetCardProps } from '../AssetCardProps.ts';
import { SettingsContext } from '@/core/utils/settingsContext.ts';
import { useCallback, useContext, useState } from 'react';
import useAxios from 'axios-hooks';
import { notifications } from '@mantine/notifications';

export function ImageCard({ projectUuid, asset, selected, onSelectChange, onDelete }: AssetCardProps) {
    const { local_backend } = useContext(SettingsContext);
    const [{ }, callSetMainImage] = useAxios(
        {
            url: `${local_backend}/projects/${projectUuid}/image`,
            method: 'POST'
        },
        { manual: true }
    );
    const [loading, setLoading] = useState(false);
    const toggleLoadingCallback = useCallback(() => {
        setLoading((l) => {
            return !l
        })
    }, [loading])
    const setMainImage = useCallback(() => {
        callSetMainImage({
            data: {
                uuid: projectUuid,
                default_image_id: asset.id
            }
        })
            .then(({ data }) => {
                console.log(data);
                notifications.show({
                    title: 'Great Success!',
                    message: 'Project main image updated!',
                    color: 'indigo',
                })
            })
            .catch((e) => {
                console.log(e)
            });
    }, [projectUuid]);
    const [value, toggle] = useToggle([false, true]);
    const theme = useMantineTheme();

    return (<>
        <Modal opened={value} onClose={() => toggle()}>
            <Image src={`${local_backend}/projects/${projectUuid}/assets/${asset.id}`} />
        </Modal>
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
                            <Menu.Item onClick={setMainImage} leftSection={<IconHeart style={{ width: rem(14), height: rem(14) }} />}>
                                Set as main image
                            </Menu.Item>
                        </DropDownMenu>
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    </>
    );
}