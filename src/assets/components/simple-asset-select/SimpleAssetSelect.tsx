import { Asset } from "@/assets/entities/Assets";
import { SettingsContext } from "@/core/settings/settingsContext";
import { Avatar, Box, Combobox, Group, InputBase, Loader, useCombobox, Text, Input } from "@mantine/core";
import useAxios from "axios-hooks";
import { useContext, useEffect, useRef, useState } from "react";


type SimpleAssetSelectProps = {
    projectUuid: string;
    type?: string;
    value: string;
    onChange: (arg0: string) => void
} | any;


function SelectOption(a: Asset) {
    const { settings } = useContext(SettingsContext);


    return <Group gap="sm">
        <Avatar size={40} src={`${settings.localBackend}/projects/${a.project_uuid}/assets/${a.image_id}/file`} radius={40} />
        <Box>
            <Text fz="sm" fw={500}>
                {a.name}
            </Text>
        </Box>
    </Group>
}

export function SimpleAssetSelect({ projectUuid, type, value: initial, onChange, ...props }: SimpleAssetSelectProps) {
    const reload = useRef(Math.floor(1000 + Math.random() * 9000));
    const { settings } = useContext(SettingsContext);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const [{ data: assets, loading, error: pError }, fetch] = useAxios<Asset[]>(
        `${settings.localBackend}/projects/${projectUuid}/assets?_=${reload.current}`,
        { manual: true }
    );


    const [value, setValue] = useState<string | null>(initial);
    const selectedOption = assets?.find((item) => item.id === value);


    useEffect(() => {
        if (!projectUuid) return;
        fetch()
    }, [projectUuid])

    return (<Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
            onChange(val);
            setValue(val);
            combobox.closeDropdown();
        }}
    >
        <Combobox.Target>
            <InputBase
                label="Slice"
                component="button"
                type="button"
                pointer
                rightSection={<Combobox.Chevron />}
                onClick={() => combobox.toggleDropdown()}
                rightSectionPointerEvents="none"
                multiline
            >
                {selectedOption ? (
                    <SelectOption {...selectedOption} />
                ) : (
                    <Input.Placeholder>Pick value</Input.Placeholder>
                )}
            </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
            <Combobox.Options>
                {assets?.filter(a => !type || a.asset_type == type).map(a => <Combobox.Option value={a.id} key={a.id}>
                    <SelectOption {...a} />
                </Combobox.Option>)}
            </Combobox.Options>
        </Combobox.Dropdown>
    </Combobox>)
}