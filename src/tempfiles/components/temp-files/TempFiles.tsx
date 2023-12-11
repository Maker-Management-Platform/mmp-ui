import { SettingsContext } from "@/core/utils/settingsContext";
import { TempFile } from "@/tempfiles/entities/TempFile";
import { IconTrash } from "@tabler/icons-react";
import { ActionIcon, Table, Group, Combobox, Input, InputBase, useCombobox } from "@mantine/core";
import useAxios from "axios-hooks";
import { useContext, useEffect, useState } from "react";

export function TempFiles() {
    const { local_backend } = useContext(SettingsContext);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [value, setValue] = useState<string | null>(null);
    const [tempFiles, setTempFiles] = useState<TempFile[]>([]);

    const [{ data, loading, error }] = useAxios(
        `${local_backend}/tempfiles`
    );
    useEffect(() => {
        setTempFiles(data);
    }, [data]);
    return (<>
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Modification Date</Table.Th>
                    <Table.Th>Project</Table.Th>
                    <Table.Th>Actions</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {tempFiles && tempFiles.map((t) => <Table.Tr key={t.uuid}>
                    <Table.Td>{t.name}</Table.Td>
                    <Table.Td>asdsd{value}</Table.Td>
                    <Table.Td>
                        <Combobox
                            store={combobox}
                            onOptionSubmit={(val) => {
                                setValue(val);
                                combobox.closeDropdown();
                            }}
                        >
                            <Combobox.Target>
                                <InputBase
                                    component="button"
                                    type="button"
                                    pointer
                                    rightSection={<Combobox.Chevron />}
                                    rightSectionPointerEvents="none"
                                    onClick={() => combobox.toggleDropdown()}
                                >
                                    {value || <Input.Placeholder>Pick value</Input.Placeholder>}
                                </InputBase>
                            </Combobox.Target>

                            <Combobox.Dropdown>
                                <Combobox.Options>
                                    <Combobox.Group label="Recomended">
                                        {t.matches.map((s) => <Combobox.Option value={s}>🍎 {s}</Combobox.Option>)}
                                    </Combobox.Group>

                                    <Combobox.Option value="🥦 Broccoli">🥦 Broccoli</Combobox.Option>
                                    <Combobox.Option value="🥕 Carrots">🥕 Carrots</Combobox.Option>
                                    <Combobox.Option value="🥬 Lettuce">🥬 Lettuce</Combobox.Option>
                                </Combobox.Options>
                            </Combobox.Dropdown>
                        </Combobox>
                    </Table.Td>
                    <Table.Td>
                        <Group justify="center">
                            <ActionIcon variant="filled" aria-label="Settings">
                                <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                            <ActionIcon variant="filled" aria-label="Settings">
                                <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                    </Table.Td>
                </Table.Tr>)}
            </Table.Tbody>
        </Table>
    </>)
}