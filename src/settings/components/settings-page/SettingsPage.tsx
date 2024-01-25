import { Container, Tabs } from "@mantine/core";
import { SettingsForm } from "./parts/settings-form/SettingsForm";
import { ServerOperations } from "./parts/server-operations/ServerOperations";

export function SettingsPage() {
    return (
        <Tabs defaultValue="edit" orientation="vertical" placement="right">
            <Tabs.List>
                <Tabs.Tab value="settings">Settings</Tabs.Tab>
                <Tabs.Tab value="operations">Operations</Tabs.Tab>
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
        </Tabs>
    )
}