import { SettingsContext } from "@/core/settings/settingsContext";
import { Printer, printerTypes } from "@/printers/entities/Printer";
import { ActionIcon, Button, Group, Input, Select, TextInput } from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconPlugConnected } from "@tabler/icons-react";
import useAxios from "axios-hooks";
import { useContext, useEffect } from "react";

type PrinterFormProps = {
    printer?: Printer
    onPrinterChange: (p: any) => void
}

export function PrinterForm({ printer, onPrinterChange }: PrinterFormProps) {
    const { settings } = useContext(SettingsContext);
    const form = useForm({
        initialValues: {
            name: '',
            type: '',
            address: '',
        },
        validate: {
            name: hasLength({ min: 3 }, "Use at least 3 characters"),
            type: isNotEmpty("You must select a printer type."),
            address: hasLength({ min: 8 }, "You must insert an address (with http://)")
        },
    });
    const [{ loading }, executeSave] = useAxios({ method: 'POST' }, { manual: true })
    const [{ loading: cLoading }, executTest] = useAxios({ method: 'POST', url: `${settings.localBackend}/printers/test` }, { manual: true })
    useEffect(() => {
        if (!printer) return;
        form.setValues(printer)
    }, [printer])
    const onSave = () => {
        const url = `${settings.localBackend}/printers${printer?.uuid ? '/' + printer.uuid : ''}`
        executeSave({
            url,
            data: {
                ...form.values,
            }
        })
            .then(({ data }) => {
                onPrinterChange(data)
                notifications.show({
                    title: 'Great Success!',
                    message: 'Project updated',
                    color: 'indigo',
                })
            })
            .catch((e) => {
                console.log(e)
            });
    };

    const connect = () => {
        if (form.values.address != '' && form.values.type != '') {
            const tyype = printerTypes.get(form.values.type)
            if (!tyype) return;
            executTest({ data: form.values })
                .then(({ data }) => {
                    form.setFieldValue('version', data.version)
                    form.setFieldValue('state', data.state)
                    form.setFieldValue('status', data.status)
                })
                .catch((e) => {
                    console.log(e)
                });
        }

    }

    return (
        <form onSubmit={form.onSubmit(onSave)}>
            <TextInput
                mb="sm"
                label="Name"
                {...form.getInputProps('name')}
            />
            <Select
                mb="sm"
                label="Type"
                {...form.getInputProps('type')}
                data={Array.from(printerTypes.values()).map(t => t.type)} />

            {form.values.type === 'octoPrint' && <Input.Wrapper label="Api Key">
                <Input
                    placeholder=""
                    mb="sm"
                    {...form.getInputProps('apiKey')}
                />
            </Input.Wrapper>}
            <Input.Wrapper label="Address">
                <Input
                    placeholder="http://192.168.0.123"
                    rightSectionPointerEvents="all"
                    mb="sm"
                    {...form.getInputProps('address')}
                    rightSection={
                        <ActionIcon variant="filled" aria-label="Connect" onClick={connect} loading={cLoading}>
                            <IconPlugConnected style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    }
                />
            </Input.Wrapper>
            {form.values.version && <TextInput
                mb="sm"
                label="Status"
                disabled
                {...form.getInputProps('status')}
            />}
            {form.values.version && <TextInput
                mb="sm"
                label="Version"
                disabled
                {...form.getInputProps('version')}
            />}
            {form.values.version && <TextInput
                mb="sm"
                label="State"
                disabled
                {...form.getInputProps('state')}
            />}
            <Group justify="flex-end" mt="md">
                <Button type="submit" loading={loading}>Save</Button>
            </Group>
        </form>
    )
}