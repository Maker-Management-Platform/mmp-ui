import { Fieldset, TextInput } from "@mantine/core";
import { useFormContext } from "../context";

export function Core() {
    const form = useFormContext();
    return (
        <Fieldset legend="Server">
            <TextInput label="POrt" {...form.getInputProps(`name`)} />
        </Fieldset>
    )
}