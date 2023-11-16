import {ProjectAssetsTypeFilter} from "../project-assets-type-filter/ProjectAssetsTypeFilter.tsx";
import {Container, Flex, rem, SimpleGrid, Skeleton} from "@mantine/core";
import useAxios from "axios-hooks";
import {Asset} from "../../../../../assets/entities/Assets.ts";
import {ImageCard} from "../../../../../assets/components/image-card/ImageCard.tsx";
import {ModelCard} from "../../../../../assets/components/model-card/ModelCard.tsx";
import {SliceCard} from "../../../../../assets/components/slice-card/SliceCard.tsx";
import {FileCard} from "../../../../../assets/components/file-card/FileCard.tsx";
import {useListState} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {ModelDetailPane} from "../../../../../assets/components/model-detail-pane/ModelDetailPane.tsx";

type ProjectAssetsListProps = {
    projectUuid: string;
}

export function ProjectAssetsList({projectUuid}: ProjectAssetsListProps) {
    const [assetList, assetListHandlers] = useListState<{ asset: Asset, selected: boolean }>([]);
    const [lastSelected, setLastSelected] = useState<{ asset: Asset, s: boolean, i: number }>();
    const [typeFilter, setTypeFilter] = useState('all');
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

        const {asset, s: selected} = lastSelected;
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
        setTypeFilter(assetList.find(a => a.selected)?.asset.asset_type || 'all');
    }, [assetList]);


    const assetMap = ({selected, asset}: { asset: Asset, selected: boolean }, i: number) => {
        switch (asset.asset_type) {
            case 'image':
                return <ImageCard key={asset.sha1} projectUuid={projectUuid} asset={asset}
                                  selected={selected}
                                  onSelectChange={(s) => setLastSelected({asset, s, i})}/>;
            case 'model':
                return <ModelCard key={asset.sha1} projectUuid={projectUuid} asset={asset}
                                  selected={selected}
                                  onSelectChange={(s) => setLastSelected({asset, s, i})}/>;
            case 'slice':
                return <SliceCard key={asset.sha1} projectUuid={projectUuid} asset={asset}
                                  selected={selected}
                                  onSelectChange={(s) => setLastSelected({asset, s, i})}/>;
            case 'file':
                return <FileCard key={asset.sha1} projectUuid={projectUuid} asset={asset}
                                 selected={selected}
                                 onSelectChange={(s) => setLastSelected({asset, s, i})}/>;
        }
    }

    return (
        <>
            {error && <p>Error!</p>}
            <ProjectAssetsTypeFilter assetList={assetList} value={typeFilter} onChange={setTypeFilter}/>
            <Container fluid my='xs' style={{width: '100%'}}>
                <SimpleGrid cols={assetList.some((v) => v.selected) ? 2 : 1}>
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
