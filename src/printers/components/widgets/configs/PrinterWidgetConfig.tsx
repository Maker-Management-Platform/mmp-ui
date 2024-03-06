import { SettingsContext } from "@/core/settings/settingsContext";
import { WidgetConfig } from "@/dashboard/entities/WidgetType";
import { Printer } from "@/printers/entities/Printer";
import { Select } from "@mantine/core";
import useAxios from "axios-hooks";
import { useContext, useRef, useState } from "react";

export function PrinterWidgetConfig({ config, onChange }: WidgetConfig) {
    const [cfg, setCfg] = useState(config)
    const reload = useRef(Math.floor(1000 + Math.random() * 9000));
    const { settings } = useContext(SettingsContext);
    const [{ data, loading, error }] = useAxios<Printer[]>({ url: `${settings.localBackend}/printers?_=${reload.current}` })

    const proxyOnChange = (v: string | null) => {
        const c = { ...cfg, printer: v }
        setCfg(c)
        onChange(c)
    }

    return (
        <Select
            label="Select Printer"
            value={cfg?.printer}
            onChange={proxyOnChange}
            data={data?.map(p => ({ value: p.uuid, label: p.name }))}
        />)
}