import {rem, Tabs} from "@mantine/core";
import {IconPhoto, IconSettings} from "@tabler/icons-react";
import {ProjectsList} from "../tabs/projects-list/ProjectsList.tsx";
import {CreateProject} from "../tabs/create-project/CreateProject.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ProjectHeader} from "../project-header/ProjectHeader.tsx";

export function ProjectsPage() {
    const iconStyle = {width: rem(12), height: rem(12)};
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    return (
        <>
            <ProjectHeader name={''} description={''}
                           imagePath={'https://images.unsplash.com/photo-1563520239648-a24e51d4b570?q=80&w=2000&h=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                           tags={[]}/>
            <Tabs keepMounted={false} defaultValue="list" value={searchParams.get('tab')}
                  onChange={(value) => navigate(`/projects?tab=${value}`)}>
                <Tabs.List>
                    <Tabs.Tab value="list" leftSection={<IconPhoto style={iconStyle}/>}>
                        Projects
                    </Tabs.Tab>
                    <Tabs.Tab value="import" ml="auto" leftSection={<IconSettings style={iconStyle}/>}>
                        Import
                    </Tabs.Tab>
                    <Tabs.Tab value="new" leftSection={<IconSettings style={iconStyle}/>}>
                        New
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="list">
                    <ProjectsList/>
                </Tabs.Panel>

                <Tabs.Panel value="import">
                    Import Project
                </Tabs.Panel>

                <Tabs.Panel value="new" pt={'xl'}>
                    <CreateProject/>
                </Tabs.Panel>
            </Tabs>
        </>
    );
}
