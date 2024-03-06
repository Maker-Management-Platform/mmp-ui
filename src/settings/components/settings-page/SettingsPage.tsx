import { Container, Tabs } from "@mantine/core";
import { SettingsForm } from "./parts/settings-form/SettingsForm";
import { ServerOperations } from "./parts/server-operations/ServerOperations";
import { Experimental } from "./parts/experimental/Experimental";

export function SettingsPage() {
    return (
        <Tabs defaultValue="settings" orientation="vertical" placement="right">
            <Tabs.List>
                <Tabs.Tab value="settings">Settings</Tabs.Tab>
                <Tabs.Tab value="operations">Operations</Tabs.Tab>
                <Tabs.Tab value="experimental">Experimental</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="settings">
                <Container>
                    <SettingsForm />
                </Container>
            </Tabs.Panel>
            <Tabs.Panel value="operations">
                <Container>
                    <ServerOperations />
                </Container>
            </Tabs.Panel>
            <Tabs.Panel value="experimental">
                <Container>
                    <Experimental />
                </Container>
            </Tabs.Panel>
        </Tabs>
    )
}