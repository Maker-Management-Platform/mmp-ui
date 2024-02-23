import { rem, Tabs } from "@mantine/core";
import { IconPhoto, IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export function ProjectsPage() {
    const location = useLocation();
    console.log(location.pathname.split('/').slice(1)[1]);

    const iconStyle = { width: rem(12), height: rem(12) };
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string | null>(location.pathname.split('/').slice(1)[1] ?? 'list');


    return (
        <>
            <Tabs value={activeTab} onChange={(v) => {
                setActiveTab(v);
                navigate(`/projects/${v}`);
            }}>
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
            </Tabs>
            <Outlet />
        </>
    );
}
