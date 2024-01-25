import { Fieldset, Switch, TextInput } from "@mantine/core";
import { useFormContext } from "../context";

export function Core() {
    const form = useFormContext();
    return (
        <Fieldset legend="Core">
            <TextInput label="Log Path" {...form.getInputProps(`core.log.path`)} />
            <Switch mt={'sm'} {...form.getInputProps(`core.log.enable_file`)} label="Log Enable File" />
        </Fieldset>
    )
}