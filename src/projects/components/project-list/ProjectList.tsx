import useAxios from "axios-hooks";
import {Container, Flex, rem, Skeleton, Tabs} from "@mantine/core";
import {IconPhoto, IconSettings} from '@tabler/icons-react';
import {ProjectCard} from "../project-card/ProjectCard.tsx";
import {Project} from "../../entities/Project.ts";


export function ProjectsList() {
    const size = rem('280px');
    const iconStyle = {width: rem(12), height: rem(12)};
    const [{data, loading, error}] = useAxios(
        "/projects"
    );
    console.log(data);
    const projects = new Array<Project>(...data || []);
    console.log(projects);
    if (error) return <p>Error!</p>;

    return (<>
        <Tabs defaultValue="projects">
            <Tabs.List>
                <Tabs.Tab value="projects" leftSection={<IconPhoto style={iconStyle}/>}>
                    Projects
                </Tabs.Tab>
                <Tabs.Tab value="import" ml="auto" leftSection={<IconSettings style={iconStyle}/>}>
                    Import
                </Tabs.Tab>
                <Tabs.Tab value="new" leftSection={<IconSettings style={iconStyle}/>}>
                    New
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="projects">
                <Container fluid my='xs'>
                    <Flex
                        gap="md"
                        justify="center"
                        align="flex-start"
                        direction="row"
                        wrap="wrap"
                    >
                        {loading && Array.from(Array(50))
                            .map((_, i) => <Skeleton
                                style={{height: size, minHeight: size, minWidth: size, width: size}}
                                key={i}
                                visible={true}/>)}

                        {!loading && projects.map((p) => <ProjectCard key={p.uuid} project={p}/>)}
                    </Flex>
                </Container>
            </Tabs.Panel>

            <Tabs.Panel value="messages">
                Messages tab content
            </Tabs.Panel>

            <Tabs.Panel value="settings">
                Settings tab content
            </Tabs.Panel>
        </Tabs>

    </>)
}