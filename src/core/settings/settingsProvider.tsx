import { useEffect, useState } from "react";
import { ExperimentalFeatures, Settings, SettingsContext } from "../settings/settingsContext";
import useAxios from "axios-hooks";
import { useLocalStorage } from "@mantine/hooks";

export function SettingsProvider({ loading, children }) {
    const [settings, setSettings] = useState<Settings>({} as Settings);
    const [{ }, getSettings] = useAxios<Settings>(`/settings.json`, { manual: true });
    const [{ }, getAgentSettings] = useAxios({}, { manual: true });
    const [ready, setReady] = useState(false);

    const [experimental, setExperimental] = useLocalStorage<ExperimentalFeatures>({
        key: 'experimental',
        defaultValue: {
            dashboard: false
        }
    })

    useEffect(() => {
        setSettings(prev => ({ ...prev, experimental }))
    }, [experimental])

    useEffect(() => {
        getSettings()
            .then(({ data: s }) => {
                getAgentSettings({ url: `${s.localBackend}/system/settings` })
                    .then(({ data: agent }) => {
                        setSettings(prev => ({ ...prev, ...s, agent }))
                        console.log(s);
                        setReady(true);
                    })
            })
            .catch((e) => {
                console.log(e)
            });
    }, [])

    return (
        <SettingsContext.Provider value={{ settings, setExperimental }}>
            {ready ? children : loading}
        </SettingsContext.Provider>
    )
}