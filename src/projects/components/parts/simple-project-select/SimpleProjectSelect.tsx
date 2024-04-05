import { SettingsContext } from "@/core/settings/settingsContext";
import { Project } from "@/projects/entities/Project";
import { Avatar, Box, Combobox, Group, InputBase, Loader, useCombobox, Text } from "@mantine/core";
import useAxios from "axios-hooks";
import { useContext, useRef, useState } from "react";


type SimpleProjectSelectProps = {
    value: string;
    onChange: (arg0: string) => void
} | any;
function getFilteredOptions(data: Project[] | undefined, searchQuery: string, limit: number) {
    if (!data) return [];
    const result: Project[] = [];

    for (const element of data) {
        if (result.length === limit) {
            break;
        }

        if (element.name.toLowerCase().includes(searchQuery.trim().toLowerCase())) {
            result.push(element);
        }
    }

    return result;
}

function SelectOption(p: Project) {
    const { settings } = useContext(SettingsContext);


    return <Group gap="sm">
        <Avatar size={40} src={`${settings.localBackend}/projects/${p?.uuid}/assets/${p?.default_image_id}/file`} radius={40} />
        <Box>
            <Text fz="sm" fw={500}>
                {p.name}
            </Text>
        </Box>
    </Group>
}

export function SimpleProjectSelect({ value: initial, onChange, ...props }: SimpleProjectSelectProps) {
    const reload = useRef(Math.floor(1000 + Math.random() * 9000));
    const { settings } = useContext(SettingsContext);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [search, setSearch] = useState('')

    const [{ data: projects, loading, error: pError }] = useAxios<Project[]>(
        `${settings.localBackend}/projects/list?_=${reload.current}`
    )



    return (<Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
            onChange(val);
            if (projects) {
                setSearch(projects?.find(p => p.uuid == val)?.name ?? '')
            }
            combobox.closeDropdown();
        }}
    >
        <Combobox.Target>
            <InputBase
                label="Project"
                rightSection={
                    loading ? <Loader /> : <Combobox.Chevron />
                }
                value={search}
                onChange={(event) => {
                    combobox.openDropdown();
                    combobox.updateSelectedOptionIndex();
                    setSearch(event.currentTarget.value);
                }}
                onClick={() => combobox.openDropdown()}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => {
                    combobox.closeDropdown();
                }}
                placeholder="Search value"
                rightSectionPointerEvents="none"
                {...props}
            />
        </Combobox.Target>

        <Combobox.Dropdown>
            <Combobox.Options>
                {getFilteredOptions(projects, search, 10).map(p => <Combobox.Option value={p.uuid} key={p.uuid}>
                    <SelectOption {...p} />
                </Combobox.Option>)}
            </Combobox.Options>
        </Combobox.Dropdown>
    </Combobox>)
}