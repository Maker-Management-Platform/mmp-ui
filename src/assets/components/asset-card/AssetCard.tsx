import { Asset } from "@/assets/entities/Assets";
import { Card, AspectRatio, Group, LoadingOverlay, Image, Text, rem, ActionIcon, useMantineTheme } from "@mantine/core";
import classes from './AssetCard.module.css';
import { Icon3dRotate, IconFile, IconFile3d, IconFileTypePdf, IconZoomScan } from "@tabler/icons-react";
import { DropDownMenu } from "../parts/drop-down-menu/DropDownMenu";
import { SetAsMain } from "../parts/set-as-main/SetAsMain";
import { SettingsContext } from "@/core/settings/settingsContext";
import { useCallback, useContext, useState } from "react";
import { Lightbox } from "react-modal-image";
import { useToggle } from "@mantine/hooks";
import { SelectBtn } from "../parts/select-btn/SelectBtn";

type AssetCardProps = {
    asset: Asset;
    focused: boolean;
    onFocused: () => void;
    onDelete: () => void;
    onChange: () => void;
    view3d: boolean;
    onView3dChange: (arg0: boolean) => void;
}

const iconMap = new Map<string, JSX.Element>();
iconMap.set('.pdf', <IconFileTypePdf />);
iconMap.set('.jpg', <IconFile />);
iconMap.set('.stl', <IconFile3d />);

export function AssetCard({ asset, focused, onFocused, onDelete, onChange, view3d, onView3dChange }: AssetCardProps) {
    const theme = useMantineTheme();
    const { settings } = useContext(SettingsContext);
    const [loading, setLoading] = useState(false);
    const [modal, toggleModal] = useToggle([false, true]);
    const toggleLoadingCallback = useCallback(() => {
        setLoading((l) => {
            return !l
        })
    }, [loading])

    const size = rem('280px');
    return (
        <>
            {modal && asset.image_id && asset.image_id != "" && <Lightbox
                medium={`${settings.localBackend}/projects/${asset.project_uuid}/assets/${asset.image_id}/file`}
                large={`${settings.localBackend}/projects/${asset.project_uuid}/assets/${asset.image_id}/file`}
                hideDownload={true}
                onClose={toggleModal}
            />}
            <Card withBorder padding="lg" radius="md" className={classes.card} style={{ minWidth: size, width: size, borderColor: focused ? 'red' : '' }} >
                <Card.Section mb="sm" onClick={() => toggleModal()}>
                    <AspectRatio ratio={16 / 9}>
                        {asset?.image_id === "" ? (iconMap.get(asset.extension) ?? <IconFile />) :
                            <Image
                                src={`${settings.localBackend}/projects/${asset.project_uuid}/assets/${asset.image_id}/file`}
                                alt={asset.name}
                            />
                        }
                    </AspectRatio>
                </Card.Section>

                <Text fw={700} className={classes.title} mt="xs" onClick={() => { onFocused() }}>
                    {asset.label != "" ? asset.label : asset.name}
                </Text>

                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ blur: 2 }} />
                <Card.Section className={classes.footer}>
                    <Group justify="flex-end">
                        <Group gap={0}>
                            {asset.extension == '.stl' &&
                                onView3dChange &&
                                view3d !== undefined &&
                                <SelectBtn selected={view3d} onChange={onView3dChange} icon={<Icon3dRotate />} />}
                            {asset.image_id && asset.image_id != "" && <ActionIcon variant="subtle" color="gray" onClick={() => toggleModal()}>
                                <IconZoomScan
                                    style={{ width: rem(20), height: rem(20) }}
                                    color={theme.colors.red[6]}
                                    stroke={1.5}
                                />
                            </ActionIcon>}
                            < DropDownMenu
                                projectUuid={asset.project_uuid}
                                id={asset.id}
                                openDetails={() => { onFocused() }}
                                downloadURL={`${settings.localBackend}/projects/${asset.project_uuid}/assets/${asset.id}/file?download=true'`}
                                onDelete={onDelete}
                                toggleLoad={toggleLoadingCallback}>
                                <SetAsMain projectUuid={asset.project_uuid} assetId={asset.image_id} onChange={onChange} />
                            </DropDownMenu>
                        </Group>
                    </Group>
                </Card.Section>
            </Card >
        </>)
}