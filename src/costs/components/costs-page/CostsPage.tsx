import { Tabs, rem } from "@mantine/core";
import { IconPhoto, IconSettings } from "@tabler/icons-react";
import { CostEditor } from "../cost-editor/CostEditor";

export function CostsPage() {
    const iconStyle = { width: rem(12), height: rem(12) };
    return (<>
        <Tabs keepMounted={false} defaultValue="list">
            <Tabs.List>
                <Tabs.Tab value="list" leftSection={<IconPhoto style={iconStyle} />}>
                    Costs
                </Tabs.Tab>
                <Tabs.Tab value="new" ml="auto" leftSection={<IconSettings style={iconStyle} />}>
                    New
                </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="list">
                <CostEditor/>
            </Tabs.Panel>
            <Tabs.Panel value="new" pt={'xl'}>
                asd2
            </Tabs.Panel>
        </Tabs >
    </>)
}