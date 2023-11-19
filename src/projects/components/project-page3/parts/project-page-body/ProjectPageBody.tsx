import {Container, Flex, rem, SimpleGrid, Skeleton, Tabs} from "@mantine/core";
import useAxios from "axios-hooks";
import {Asset} from "../../../../../assets/entities/Assets.ts";
import {ImageCard} from "../../../../../assets/components/image-card/ImageCard.tsx";
import {ModelCard} from "../../../../../assets/components/model-card/ModelCard.tsx";
import {SliceCard} from "../../../../../assets/components/slice-card/SliceCard.tsx";
import {FileCard} from "../../../../../assets/components/file-card/FileCard.tsx";
import {useListState} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {ModelDetailPane} from "../../../../../assets/components/model-detail-pane/ModelDetailPane.tsx";
import {IconPhoto, IconSettings} from "@tabler/icons-react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {AddAsset} from "../add-asset/AddAsset.tsx";
import {EditProject} from "../edit-project/EditProject.tsx";
import {Project} from "../../../../entities/Project.ts";

type SelectableAsset = { asset: Asset, selected: boolean }

const iconStyle = {width: rem(12), height: rem(12)};
const supportedAssetTypes: { name: string, label: string, icon: JSX.Element }[] = [
    {name: "model", label: "Models", icon: <IconPhoto style={iconStyle}/>},
    {name: "slice", label: "Slices", icon: <IconPhoto style={iconStyle}/>},
    {name: "image", label: "Images", icon: <IconPhoto style={iconStyle}/>},
    {name: "file", label: "Files", icon: <IconPhoto style={iconStyle}/>},
]
const assetTypeMap: Map<string, (projectUUid: string, asset: Asset, selected: boolean, onSelectChange: (selected: boolean) => void) => JSX.Element> = new Map([
    ["image", (projectUUid, asset, selected, onSelectChange) => <ImageCard projectUuid={projectUUid} asset={asset}
                                                                           selected={selected}
                                                                           onSelectChange={onSelectChange}/>],
    ["model", (projectUUid, asset, selected, onSelectChange) => <ModelCard projectUuid={projectUUid} asset={asset}
                                                                           selected={selected}
                                                                           onSelectChange={onSelectChange}/>],
    ["slice", (projectUUid, asset, selected, onSelectChange) => <SliceCard projectUuid={projectUUid} asset={asset}
                                                                           selected={selected}
                                                                           onSelectChange={onSelectChange}/>],
    ["file", (projectUUid, asset, selected, onSelectChange) => <FileCard projectUuid={projectUUid} asset={asset}
                                                                         selected={selected}
                                                                         onSelectChange={onSelectChange}/>],
    ["other", (projectUUid, asset, selected, onSelectChange) => <FileCard projectUuid={projectUUid} asset={asset}
                                                                          selected={selected}
                                                                          onSelectChange={onSelectChange}/>],
]);
type ProjectAssetsListProps = {
    projectUuid: string;
    project?: Project;
}

export function ProjectPageBody({projectUuid, project}: ProjectAssetsListProps) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [assetList, assetListHandlers] = useListState<SelectableAsset>([]);
    const [lastSelected, setLastSelected] = useState<SelectableAsset>();
    const [typeFilter, setTypeFilter] = useState<string | null>(searchParams.get('tab'));
    const [{data: assets, loading, error}] = useAxios(
        `/projects/${projectUuid}/assets`
    );
    useEffect(() => {
        if (!assets) return;
        assetListHandlers.remove(0, assetList.length);
        assets.forEach((a: Asset) => assetListHandlers.append({asset: a, selected: false}))
    }, [assets]);

    useEffect(() => {
        if (!lastSelected) return;

        const {asset, selected} = lastSelected;
        assetListHandlers
            .applyWhere(
                (i) => {
                    return i.asset.sha1 === asset.sha1
                },
                (i) => {
                    return {...i, selected}
                }
            )

        if (selected) {
            assetListHandlers
                .applyWhere(
                    (i) => {
                        return i.selected && i.asset.asset_type !== 'model' && i.asset.sha1 !== asset.sha1
                    },
                    (i) => {
                        return {...i, selected: false}
                    }
                )
        }

    }, [lastSelected]);

    useEffect(() => {
        const v = assetList.find(a => a.selected)?.asset.asset_type || 'all'
        navigate(`?tab=${v}`)
        setTypeFilter(v);
    }, [assetList]);


    const assetMap = ({selected, asset}: SelectableAsset) => {
        let gen = assetTypeMap.get(asset.asset_type);
        if (!gen) {
            gen = assetTypeMap.get('other');
        }
        return gen && gen(projectUuid, asset, selected, (selected) => setLastSelected({
            asset,
            selected
        }));
    }

    return (
        <>
            {error && <p>Error!</p>}
                <Container fluid my='xs' style={{width: '100%'}}>
                    <Tabs defaultValue="all" value={typeFilter} onChange={(v) => {
                        setTypeFilter(v);
                        navigate(`?tab=${v}`)
                    }}>
                        <Tabs.List>
                            <Tabs.Tab value="all" leftSection={<IconPhoto style={iconStyle}/>}>
                                All
                            </Tabs.Tab>
                            {supportedAssetTypes.map(type => <Tabs.Tab value={type.name}
                                                                       leftSection={type.icon}>{type.label}</Tabs.Tab>)}
                            <Tabs.Tab ml="auto" value="add_asset" leftSection={<IconSettings style={iconStyle}/>}>
                                Add Asset
                            </Tabs.Tab>
                            <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle}/>}>
                                Settings
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="add_asset" p={'xs'}>
                            <AddAsset projectUuid={projectUuid}/>
                        </Tabs.Panel>
                        <Tabs.Panel value="settings" p={'xs'}>
                            {project && <EditProject project={project}/>}
                        </Tabs.Panel>
                    </Tabs>
                    <SimpleGrid cols={assetList.some((v) => v.selected) ? 2 : 1} mt={'sm'}>
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
                                    visible={true}/>)}

                            {assetList.filter(e => typeFilter === 'all' || e.asset.asset_type === typeFilter)
                                .map(assetMap)}
                        </Flex>
                        {/*!(l1 || l2) && project && focusedAsset?.asset_type === 'slice' &&
                            <SliceDetailPane project={project} asset={focusedAsset}
                                             onClose={() => doFocusAsset(undefined)}/>*/}
                        {assetList.find(e => e.selected)?.asset.asset_type === 'model'
                            && <ModelDetailPane projectUuid={projectUuid} onClose={() => console.log('qwe')}
                                                models={assetList.filter(e => e.selected).map(e => e.asset)}/>}
                    </SimpleGrid>
                </Container>
        </>
    );
}
