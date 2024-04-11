import { SimpleAssetSelect } from "@/assets/components/simple-asset-select/SimpleAssetSelect";
import { SettingsContext } from "@/core/settings/settingsContext";
import { PrinterSelect } from "@/printers/components/parts/printer-select/PrinterSelect";
import { SimpleProjectSelect } from "@/projects/components/parts/simple-project-select/SimpleProjectSelect";
import { Button, Fieldset, Group, NumberInput, TagsInput, TextInput } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import useAxios from "axios-hooks";
import { useContext, useRef } from "react";

interface PrintJobRequest {
    sliceId: string;
    projectUuid: string;
    instances: number;
    printerUuid: string;
    tags: string[];
}

export function JobForm() {
    const { settings } = useContext(SettingsContext);
    const openRef = useRef<() => void>(null);
    const [{ data, loading, error }, executeSave] = useAxios(
        {
            url: `${settings.localBackend}/printqueue/enqueue`,
            method: 'POST'
        },
        { manual: true }
    )
    const form = useForm<PrintJobRequest>({
        initialValues: {
            instances: 1,
            projectUuid: '',
            sliceId: '',
            printerUuid: '',
            tags: []
        },
        validate: {
            instances: (value) => (value < 1 ? 'Instances needs to be at least 1' : null),
        },
    });

    const onSave = (job: PrintJobRequest) => {
        const formData = new FormData();
        formData.append("payload", JSON.stringify(job))
        /*if (files.length > 0) {
            files.forEach((file) => formData.append("files", file));
        }*/
        executeSave({
            data: formData
        })
            .then(({ data }) => {
                notifications.show({
                    title: 'Great Success!',
                    message: 'Project created',
                    color: 'indigo',
                })
            })
            .catch((e) => {
                console.log(e)
            });
    }
    return (
        <form onSubmit={form.onSubmit(onSave)}>
            <Fieldset legend="Job">
                <SimpleProjectSelect {...form.getInputProps('projectUuid')} />
                <SimpleAssetSelect type="slice" projectUuid={form.values.projectUuid} {...form.getInputProps('sliceId')} />
                <Dropzone openRef={openRef} onDrop={() => { }} activateOnClick={false} mt="sm">
                    <Group justify="center">
                        <Button onClick={() => openRef.current?.()} style={{ pointerEvents: 'all' }}>
                            Select GCode
                        </Button>
                    </Group>
                </Dropzone>
                <NumberInput label="Number of instances" mt="sm" {...form.getInputProps('instances')} />
                <Group mt="sm" grow>
                    <PrinterSelect {...form.getInputProps('printerUuid')}/>
                    <TagsInput
                        label="Tags"
                        placeholder="Pick tag from list"
                        data={['React', 'Angular', 'Svelte']}
                    />
                </Group>
                <Group justify="flex-end" mt="sm">
                    <Button type="submit" loading={loading}>Submit</Button>
                    <Button variant="default">Cancel</Button>
                </Group>
            </Fieldset>
        </form>
    )
}