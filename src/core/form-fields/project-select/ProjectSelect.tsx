import { Project } from "@/projects/entities/Project";
import { CheckIcon, Combobox, ComboboxProps, Group, InputBase, Loader, useCombobox } from "@mantine/core";
import { useEffect, useState } from "react";

type ProjectSelectProps = {
    boosted: string[];
    projects: Project[] | undefined;
    value: string;
    onChange: (p: Project) => void;
    loading: boolean;

} & ComboboxProps

export function ProjectSelect({ boosted, projects, value, onChange, loading, ...props }: ProjectSelectProps) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });
    const [sValue, setSValue] = useState('');
    const [options, setOptions] = useState<Project[]>([])


    useEffect(() => {
        if (!value && projects && boosted.length === 1) {
            const p = projects.find(p => p.uuid === boosted[0])
            if (p) {
                setSValue(p.name);
                onChange(p);
            }
        }
    }, [projects, boosted, value])

    useEffect(() => {
        if (!projects || value === sValue) return;
        const p = projects.find(p => p.name === sValue)
        if (p) {
            onChange(p);
        }
    }, [sValue])

    useEffect(() => {
        if (loading || !projects) return;
        const shouldFilterOptions = !projects.some((item) => item.name === sValue);

        const filteredOptions = shouldFilterOptions
            ? projects.filter((item) => item.name.toLowerCase().includes(sValue.toLowerCase().trim()))
            : projects;

        setOptions(filteredOptions.sort((p1, p2) => {
            if (boosted.includes(p1.uuid)) return -9
            return p1.name.localeCompare(p2.name)
        }))
    }, [loading, projects])



    return (
        <Combobox store={combobox} onOptionSubmit={(optionValue) => {
            setSValue(optionValue)
            combobox.closeDropdown();
        }} {...props}>
            <Combobox.Target>
                <InputBase
                    placeholder="Project"
                    value={sValue}
                    onChange={(event) => {
                        setSValue(event.currentTarget.value)
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                    }}
                    rightSection={loading ? <Loader size={18} /> : <Combobox.Chevron />}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => combobox.closeDropdown()}
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    {options.length > 0 ? options.map((p) => (
                        <Combobox.Option value={p.name} key={p.uuid} active={sValue.includes(p.name)}>
                            <Group gap="sm">
                                {sValue.includes(p.name) ? <CheckIcon size={12} /> : null}
                                <span>{p.name}</span>
                            </Group>
                        </Combobox.Option>
                    )) : <Combobox.Empty>Nothing found...</Combobox.Empty>}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>)
}