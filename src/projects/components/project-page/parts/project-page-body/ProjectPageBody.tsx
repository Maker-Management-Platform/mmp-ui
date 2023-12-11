import { Alert, Container, Flex, rem, SimpleGrid, Skeleton, Tabs } from "@mantine/core";
import useAxios from "axios-hooks";
import { Asset } from "@/assets/entities/Assets.ts";
import { AssetCardProps } from "@/assets/components/AssetCardProps.ts";
import { ImageCard } from "@/assets/components/image-card/ImageCard.tsx";
import { ModelCard } from "@/assets/components/model/model-card/ModelCard.tsx";
import { SliceCard } from "@/assets/components/slice/slice-card/SliceCard.tsx";
import { FileCard } from "@/assets/components/file-card/FileCard.tsx";
import { useListState } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import { ModelDetailPane } from "@/assets/components/model/model-detail-pane/ModelDetailPane.tsx";
import { IconPhoto, IconSettings, IconFile3d, IconLayersIntersect, IconFile, IconFiles } from "@tabler/icons-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AddAsset } from "./parts/add-asset/AddAsset.tsx";
import { EditProject } from "./parts/edit-project/EditProject.tsx";
import { Project } from "../../../../entities/Project.ts";
import { SettingsContext } from "@/core/utils/settingsContext.ts";
import { SliceDetailPane } from "@/assets/components/slice/slice-detail-pane/SliceDetailPane.tsx";
import { AssetDetails } from "@/assets/components/asset-details/AssetDetails.tsx";

const iconStyle = { width: rem(12), height: rem(12) };
const supportedAssetTypes: { name: string, label: string, icon: JSX.Element }[] = [
    { name: "model", label: "Models", icon: <IconFile3d style={iconStyle} /> },
    { name: "slice", label: "Slices", icon: <IconLayersIntersect style={iconStyle} /> },
    { name: "image", label: "Images", icon: <IconPhoto style={iconStyle} /> },
    { name: "file", label: "Files", icon: <IconFile style={iconStyle} /> },
]
const assetTypeMap: Map<string, (props: AssetCardProps) => JSX.Element> = new Map([
    ["image", (props: AssetCardProps) => <ImageCard {...props} />],
    ["model", (props: AssetCardProps) => <ModelCard {...props} />],
    ["slice", (props: AssetCardProps) => <SliceCard {...props} />],
    ["file", (props: AssetCardProps) => <FileCard {...props} />],
    ["other", (props: AssetCardProps) => <FileCard {...props} />],
]);
type ProjectAssetsListProps = {
    projectUuid: string;
    project?: Project;
    onProjectChange: (p: Project) => void;
}

export function ProjectPageBody({ projectUuid, project, onProjectChange }: ProjectAssetsListProps) {
    const { local_backend } = useContext(SettingsContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [assetList, assetListHandlers] = useListState<Asset>([]);
    const [selectedModels, selectedModelsHandlers] = useListState<Asset>([]);
    const [selectedAsset, setSelectedAsset] = useState<Asset>();
    const [typeFilter, setTypeFilter] = useState<string | null>(searchParams.get('tab'));
    const [{ data: assets, loading, error }] = useAxios(
        `${local_backend}/projects/${projectUuid}/assets`
    );
    useEffect(() => {
        if (!assets) return;
        assets.forEach((a: Asset) => assetListHandlers.append(a))
    }, [assets]);

    useEffect(() => {
        if (selectedModels.length == 0) {
            setTypeFilter('all');
            navigate(`?tab=all`)
        } else {
            setTypeFilter('model');
            navigate(`?tab=model`)
        }
    }, [selectedModels]);

    const handleModelSelection = (asset: Asset, selected: boolean) => {
        if (selected) {
            selectedModelsHandlers.append(asset)
        } else {
            selectedModelsHandlers.filter((a) => a.sha1 != asset.sha1);
        }
    };

    const assetMap = (asset: Asset) => {
        let gen = assetTypeMap.get(asset.asset_type);
        if (!gen) {
            gen = assetTypeMap.get('other');
        }
        const props: AssetCardProps = {
            projectUuid,
            asset,
            selected: selectedAsset?.sha1 === asset.sha1 || (asset.asset_type === 'model' && selectedModels.findIndex((a) => a.sha1 === asset.sha1) > -1),
            onSelectChange: () => setSelectedAsset(asset),
            onDelete: (projectUuid: string, sha1: string) => {
                assetListHandlers.remove(assetList.findIndex((a) => a.sha1 === sha1))

                return true
            }
        };
        if (asset.asset_type === 'model') {
            props.view3d = selectedModels.findIndex((a) => a.sha1 === asset.sha1) > -1;
            props.onView3dChange = (v: boolean) => { handleModelSelection(asset, v) };
        }

        return gen && gen(props);
    }

    return (
        <>
            {error && <p>Error!</p>}
            <Container fluid my='xs' style={{ width: '100%' }}>
                <Tabs value={typeFilter} onChange={(v) => {
                    setTypeFilter(v);
                    navigate(`?tab=${v}`)
                }}>
                    <Tabs.List>
                        <Tabs.Tab value="all" leftSection={<IconFiles style={iconStyle} />}>
                            All
                        </Tabs.Tab>
                        {supportedAssetTypes.map(type => <Tabs.Tab value={type.name} leftSection={type.icon}>{type.label}</Tabs.Tab>)}
                        <Tabs.Tab ml="auto" value="add_asset" leftSection={<IconSettings style={iconStyle} />}>
                            Add Asset
                        </Tabs.Tab>
                        <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
                            Settings
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="add_asset" p={'xs'}>
                        <AddAsset projectUuid={projectUuid} />
                    </Tabs.Panel>
                    <Tabs.Panel value="settings" p={'xs'}>
                        {project && <EditProject onProjectChange={onProjectChange} project={project} />}
                    </Tabs.Panel>
                </Tabs>
                <SimpleGrid cols={(selectedAsset || selectedModels.length > 0) ? 2 : 1} mt={'sm'}>
                    <Flex
                        gap="md"
                        justify="center"
                        align="flex-start"
                        direction="row"
                        wrap="wrap"
                    >
                        {loading && Array.from(Array(50))
                            .map((_, i) => <Skeleton
                                style={{
                                    height: rem('280px'),
                                    minHeight: rem('280px'),
                                    minWidth: rem('280px'),
                                    width: rem('280px')
                                }}
                                key={i}
                                visible={true} />)}

                        {assetList.filter(asset => typeFilter === 'all' || asset.asset_type === typeFilter).map(assetMap)}
                    </Flex>
                    {selectedModels.length > 0 && <ModelDetailPane projectUuid={projectUuid} onClose={() => selectedModelsHandlers.setState([])}
                        models={selectedModels} />}
                    {project && selectedAsset &&
                        <Alert color="gray" title={selectedAsset.name} withCloseButton onClose={() => setSelectedAsset(undefined)} >
                            <AssetDetails asset={selectedAsset} />
                        </Alert>
                    }
                </SimpleGrid>
            </Container>
        </>
    );
}
