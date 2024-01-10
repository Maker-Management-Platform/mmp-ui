import { AspectRatio, Card, Group, LoadingOverlay, rem, Text } from '@mantine/core';
import { IconFile, IconFileTypePdf } from '@tabler/icons-react';
import classes from './FileCard.module.css';
import { DropDownMenu } from '../parts/drop-down-menu/DropDownMenu.tsx';
import { AssetCardProps } from '../AssetCardProps.ts';
import { useCallback, useContext, useState } from 'react';
import { SettingsContext } from '@/core/utils/settingsContext.ts';


export function FileCard({ asset, projectUuid, selected, onSelectChange, onDelete }: AssetCardProps) {
    const {local_backend} = useContext(SettingsContext);
    const [loading, setLoading] = useState(false);
    const toggleLoadingCallback = useCallback(() => {
        setLoading((l)=>{
            return !l
        })
    },[loading])
    const iconMap = new Map<string, JSX.Element>();
    iconMap.set('.pdf', <IconFileTypePdf />);
    iconMap.set('.jpg', <IconFile />);


    const size = rem('280px');
    return (<>
        <Card withBorder padding="lg" radius="md" className={classes.card} style={{ position:'relative', minWidth: size, width: size, borderColor: selected ? 'red' : '' }}>
            <Card.Section mb="sm" onClick={() => onSelectChange(true)}>
                <AspectRatio ratio={16 / 9}>
                    {iconMap.get(asset.extension) || <IconFile />}
                </AspectRatio>
            </Card.Section>

            <Text fw={700} className={classes.title} mt="xs" onClick={() => onSelectChange(true)}>
                {asset.name}
            </Text>

            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ blur: 2 }} />
            <Card.Section className={classes.footer}>
                <Group justify="flex-end">
                    <Group gap={0}>
                        <DropDownMenu
                            projectUuid={projectUuid}
                            id={asset.id}
                            openDetails={() => onSelectChange(true)}
                            downloadURL={`${local_backend}/projects/${projectUuid}/assets/${asset?.id}?download=true'`}
                            onDelete={() => onDelete(projectUuid, asset.id)}
                            toggleLoad={toggleLoadingCallback}>
                        </DropDownMenu>
                    </Group>
                </Group>
            </Card.Section>
        </Card>
        </>
    );
}