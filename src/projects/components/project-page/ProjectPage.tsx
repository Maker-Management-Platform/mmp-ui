import {rem, Tabs} from "@mantine/core";
import {IconPhoto, IconSettings} from "@tabler/icons-react";
import {ModelsPage} from "../../../models/components/models-page/ModelsPage.tsx";
import {useParams} from "react-router-dom";
import useAxios from "axios-hooks";
import {Project} from "../../entities/Project.ts";
import {useEffect, useState} from "react";
import {ImageCard} from "../../../assets/components/image-card/ImageCard.tsx";
import {Container, Flex, Skeleton} from "@mantine/core";


export function ProjectPage() {
    const {id} = useParams();
    const [uuid, setUuid] = useState('');
    const [project, setProject] = useState<Project>();

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
            console.log(assets)
            const p = project;
            p.assets = [...assets];
            setProject(p)
        }
    }, [assets, project]);


    const iconStyle = {width: rem(12), height: rem(12)};
    return (
        <>
            {project?.name}
            {e1 || e2 && <p>Error!</p>}
            {l1 || l2 && <p>Loading...</p>}
                <Tabs defaultValue="models">
                    <Tabs.List>
                        <Tabs.Tab value="models" leftSection={<IconPhoto style={iconStyle}/>}>
                            Models
                        </Tabs.Tab>
                        <Tabs.Tab value="images" leftSection={<IconSettings style={iconStyle}/>}>
                            Images
                        </Tabs.Tab>
                        <Tabs.Tab value="slices" leftSection={<IconSettings style={iconStyle}/>}>
                            Slices
                        </Tabs.Tab>
                        <Tabs.Tab value="files" leftSection={<IconSettings style={iconStyle}/>}>
                            Files
                        </Tabs.Tab>
                        <Tabs.Tab value="edit" ml="auto" leftSection={<IconSettings style={iconStyle}/>}>
                            Edit
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="models">
                        <ModelsPage project={project} loading={l1 || l2}/>
                    </Tabs.Panel>
                    <Tabs.Panel value="images">
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
                                    .filter(a => a.asset_type === "image")
                                    .map(a => <ImageCard key={a.sha1} project={project} image={a}
                                                         onClick={console.log}/>)}
                            </Flex>
                        </Container>
                    </Tabs.Panel>
                    <Tabs.Panel value="slices">
                        slices
                    </Tabs.Panel>
                    <Tabs.Panel value="files">
                        files
                    </Tabs.Panel>
                    <Tabs.Panel value="edit">
                        edit
                    </Tabs.Panel>
                </Tabs>
        </>
    )
}