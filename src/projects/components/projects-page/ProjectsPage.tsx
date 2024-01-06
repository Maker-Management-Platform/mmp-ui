import { rem, Tabs } from "@mantine/core";
import { IconPhoto, IconSettings } from "@tabler/icons-react";
import { ProjectsList } from "./parts/projects-list/ProjectsList.tsx";
import { CreateProject } from "./parts/create-project/CreateProject.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImportProject } from "./parts/import-project/ImportProject.tsx";

export function ProjectsPage() {
    const iconStyle = { width: rem(12), height: rem(12) };
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    return (
        <><Tabs keepMounted={false} defaultValue="list" value={searchParams.get('tab')}
                onChange={(value) => navigate(`/projects?tab=${value}`)}>
                <Tabs.List>
                    <Tabs.Tab value="list" leftSection={<IconPhoto style={iconStyle} />}>
                        Projects
                    </Tabs.Tab>
                    <Tabs.Tab value="import" ml="auto" leftSection={<IconSettings style={iconStyle} />}>
                        Import
                    </Tabs.Tab>
                    <Tabs.Tab value="new" leftSection={<IconSettings style={iconStyle} />}>
                        New
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="list">
                    <ProjectsList />
                </Tabs.Panel>

                <Tabs.Panel value="import" pt={'xl'}>
                    <ImportProject />
                </Tabs.Panel>

                <Tabs.Panel value="new" pt={'xl'}>
                    <CreateProject />
                </Tabs.Panel>
            </Tabs>
        </>
    );
}
