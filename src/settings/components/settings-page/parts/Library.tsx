import { Fieldset, TextInput } from "@mantine/core";
import { useFormContext } from "../context";

export function Library() {
    const form = useFormContext();
    return (
        <Fieldset legend="Library">
            <TextInput label="Path" {...form.getInputProps(`library.path`)} />
            <TextInput label="blacklist" {...form.getInputProps(`library.blacklist`)} />
            <TextInput label="ignore_dot_files" {...form.getInputProps(`library.ignore_dot_files`)} />
        </Fieldset>
    )
}