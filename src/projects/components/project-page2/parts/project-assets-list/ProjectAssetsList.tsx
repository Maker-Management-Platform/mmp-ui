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

type ProjectAssetsListProps = {
    projectUuid: string;
}

export function ProjectAssetsList({projectUuid}: ProjectAssetsListProps) {
    const [assetList, assetListHandlers] = useListState<{ asset: Asset, selected: boolean }>([]);
    const [typeFilter, setTypeFilter] = useState('all');
    const [{data: assets, loading, error}] = useAxios(
        `/projects/${projectUuid}/assets`
    );
    useEffect(() => {
        if (!assets) return;
        assets.forEach((a: Asset) => assetListHandlers.append({asset: a, selected: false}))
    }, [assets]);

    const assetMap = ({selected, asset}: { asset: Asset, selected: boolean }, i: number) => {
        switch (asset.asset_type) {
            case 'image':
                return <ImageCard key={asset.sha1} projectUuid={projectUuid} asset={asset}
                                  selected={selected}
                                  onSelectChange={(s) => doFocusAsset(asset, s, i)}/>;
            case 'model':
                return <ModelCard key={asset.sha1} projectUuid={projectUuid} asset={asset}
                                  selected={selected}
                                  onSelectChange={(s) => doFocusAsset(asset, s, i)}/>;
            case 'slice':
                return <SliceCard key={asset.sha1} projectUuid={projectUuid} asset={asset}
                                  selected={selected}
                                  onSelectChange={(s) => doFocusAsset(asset, s, i)}/>;
            case 'file':
                return <FileCard key={asset.sha1} projectUuid={projectUuid} asset={asset}
                                 selected={selected}
                                 onSelectChange={(s) => doFocusAsset(asset, s, i)}/>;
        }
    }

    const doFocusAsset = (asset: Asset, selected: boolean, i: number) => {
        if (asset.asset_type) {
            setTypeFilter(asset.asset_type);
        } else {
            setTypeFilter('all');
        }
        assetListHandlers.setItemProp(i, 'selected', selected)
    }
    return (
        <>
            {error && <p>Error!</p>}
            <ProjectAssetsTypeFilter assets={assets} value={typeFilter} onChange={setTypeFilter}/>
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
                </SimpleGrid>
            </Container>
        </>
    );
}
