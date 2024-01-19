import { Fieldset, TextInput } from "@mantine/core";
import { useFormContext } from "../context";

export function Core() {
    const form = useFormContext();
    return (
        <Fieldset legend="Core">
            <TextInput label="Log Path" {...form.getInputProps(`core.log.path`)} />
            <TextInput label="Log Enable File" {...form.getInputProps(`core.log.enable_file`)} />
        </Fieldset>
    )
}