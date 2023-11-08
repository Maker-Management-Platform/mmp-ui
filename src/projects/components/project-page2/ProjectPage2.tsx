import {rem, SegmentedControl} from "@mantine/core";
import {useParams} from "react-router-dom";
import useAxios from "axios-hooks";
import {Project} from "../../entities/Project.ts";
import {useEffect, useState} from "react";
import {ImageCard} from "../../../assets/components/image-card/ImageCard.tsx";
import {Container, Flex, Skeleton} from "@mantine/core";
import {SliceCard} from "../../../assets/components/slice-card/SliceCard.tsx";
import {Asset} from "../../../assets/entities/Assets.ts";
import {ModelCard} from "../../../assets/components/model-card/ModelCard.tsx";
import {FileCard} from "../../../assets/components/file-card/FileCard.tsx";


export function ProjectPage2() {
    const {id} = useParams();
    const [uuid, setUuid] = useState('');
    const [project, setProject] = useState<Project>();
    const [typeFilter, setTypeFilter] = useState('all');
    const [assetTypes, setAssetTypes] = useState<{ label: string, value: string }[]>([{value: '', label: ''}]);
    const [{data: p, loading: l1, error: e1}] = useAxios(
        `/projects/${id}`
    );

    useEffect(() => {
        setProject(p);
    }, [p]);

    const [{data: assets, loading: l2, error: e2}] = useAxios(
        `/projects/${uuid}/assets`,
        {manual: !uuid}
    );

    useEffect(() => {
        if (project?.uuid) {
            console.log(project)
            setUuid(project.uuid);
        }
    }, [project]);

    useEffect(() => {
        if (project && assets) {
            const p = project;
            p.assets = [...assets];
            setProject(p)
            const t = new Set<string>();
            t.add('all');
            p.assets.forEach(a => t.add(a.asset_type));
            setAssetTypes([...t.values()].map(a => {
                return {label: a.toUpperCase(), value: a}
            }));
        }
    }, [assets, project]);
    const assetMap = (asset: Asset) => {
        switch (asset.asset_type) {
            case 'image':
                return <ImageCard key={asset.sha1} project={project} asset={asset} onClick={console.log}/>;
            case 'model':
                return <ModelCard key={asset.sha1} project={project} asset={asset} onClick={console.log}/>;
            case 'slice':
                return <SliceCard key={asset.sha1} project={project} asset={asset} onClick={console.log}/>;
            case 'file':
                return <FileCard key={asset.sha1} project={project} asset={asset} onClick={console.log}/>;
        }
    }


    const iconStyle = {width: rem(12), height: rem(12)};
    return (
        <>
            {project?.name}
            {project?.tags}
            {e1 || e2 && <p>Error!</p>}
            {l1 || l2 && <p>Loading...</p>}
            <Flex
                mih={50}
                gap="md"
                justify="flex-start"
                align="center"
                direction="column"
                wrap="wrap"
            >
                <SegmentedControl size="md" radius="xl" data={assetTypes} value={typeFilter} onChange={setTypeFilter}/>
                <Container fluid my='xs'>
                    <Flex
                        gap="md"
                        justify="center"
                        align="flex-start"
                        direction="row"
                        wrap="wrap"
                    >
                        {l1 || l2 && Array.from(Array(50))
                            .map((_, i) => <Skeleton
                                style={{
                                    height: rem('280px'),
                                    minHeight: rem('280px'),
                                    minWidth: rem('280px'),
                                    width: rem('280px')
                                }}
                                key={i}
                                visible={true}/>)}

                        {project && project.assets && project.assets
                            .filter(a => typeFilter === 'all' || a.asset_type === typeFilter)
                            .map(assetMap)}
                    </Flex>
                </Container>
            </Flex>
        </>
    )
}