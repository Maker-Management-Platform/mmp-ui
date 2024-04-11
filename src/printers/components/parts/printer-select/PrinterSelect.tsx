import { SettingsContext } from "@/core/settings/settingsContext";
import { Printer } from "@/printers/entities/Printer";
import { Select } from "@mantine/core";
import useAxios from "axios-hooks";
import { useContext, useRef } from "react";


type SimpleProjectSelectProps = {
    value: string;
    onChange: (arg0: string) => void
} | any;

export function PrinterSelect({ ...props }: SimpleProjectSelectProps) {
    const reload = useRef(Math.floor(1000 + Math.random() * 9000));
    const { settings } = useContext(SettingsContext);
    const [{ data: printers }] = useAxios<Printer[]>(
        `${settings.localBackend}/printers?_=${reload.current}`
    )

    return (<Select
        label="Printer"
        data={printers?.map(p => ({ value: p.uuid, label: p.name }))}
        searchable
        nothingFoundMessage="Nothing found..."
        {...props}
    />)
}