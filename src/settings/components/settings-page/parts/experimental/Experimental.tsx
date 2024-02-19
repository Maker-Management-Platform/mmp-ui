import { ExperimentalFeatures, SettingsContext } from "@/core/settings/settingsContext";
import { Container, Fieldset, Switch } from "@mantine/core";
import { useContext } from "react";



export function Experimental() {
    const { settings, setExperimental } = useContext(SettingsContext);

    return (
        <Container>
            <Fieldset legend="Experimental">
                <Switch mt={'sm'} label="Dashboard" checked={settings.experimental.dashboard} onChange={(event) => setExperimental((prev: ExperimentalFeatures) => ({ ...prev, dashboard: event.target.checked }))} />
            </Fieldset>
        </Container>
    )
}