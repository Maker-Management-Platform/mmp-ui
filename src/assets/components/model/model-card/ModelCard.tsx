import { AspectRatio, Card, Group, Image, LoadingOverlay, rem, Text } from '@mantine/core';
import classes from './ModelCard.module.css';
import { SelectBtn } from "@/assets/components/parts/select-btn/SelectBtn.tsx";
import { DropDownMenu } from '../../parts/drop-down-menu/DropDownMenu';
import { Icon3dRotate, IconFile3d } from '@tabler/icons-react';
import { AssetCardProps } from '../../AssetCardProps';
import { SettingsContext } from '@/core/settings/settingsContext';
import { useCallback, useContext, useState } from 'react';
import { SetAsMain } from '../../parts/set-as-main/SetAsMain';

export function ModelCard({ projectUuid, asset, selected, onSelectChange, view3d, onView3dChange, onDelete, onChange }: AssetCardProps) {
    const { settings } = useContext(SettingsContext);
    const [loading, setLoading] = useState(false);
    const toggleLoadingCallback = useCallback(() => {
        setLoading((l) => {
            return !l
        })
    }, [loading])
    const size = rem('280px');
    return (
        <Card withBorder padding="lg" radius="md" className={classes.card} style={{ minWidth: size, width: size, borderColor: selected ? 'red' : '' }} >
            <Card.Section mb="sm" onClick={() => onSelectChange(true)}>
                <AspectRatio ratio={16 / 9}>
                    {asset?.model?.image_id === "" ? <IconFile3d /> :
                        <Image
                            src={`${settings.localBackend}/projects/${projectUuid}/assets/${asset?.model?.image_id}`}
                            alt={asset.name}
                        />
                    }
                </AspectRatio>
            </Card.Section>

            <Text fw={700} className={classes.title} mt="xs" onClick={() => onSelectChange(true)}>
                {asset.name}
            </Text>

            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ blur: 2 }} />
            <Card.Section className={classes.footer}>
                <Group justify="flex-end">
                    <Group gap={0}>
                        {asset.extension == '.stl' &&
                            onView3dChange &&
                            view3d !== undefined &&
                            <SelectBtn selected={view3d} onChange={onView3dChange} icon={<Icon3dRotate />} />}
                        <DropDownMenu
                            projectUuid={projectUuid}
                            id={asset.id}
                            openDetails={() => onSelectChange(true)}
                            downloadURL={`${settings.localBackend}/projects/${projectUuid}/assets/${asset.id}?download=true'`}
                            onDelete={() => onDelete(projectUuid, asset.id)}
                            toggleLoad={toggleLoadingCallback}>
                            <SetAsMain projectUuid={projectUuid} assetId={asset.model?.image_id} onChange={() => { onChange(projectUuid, asset.model?.image_id) }} />
                        </DropDownMenu>
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    );
}