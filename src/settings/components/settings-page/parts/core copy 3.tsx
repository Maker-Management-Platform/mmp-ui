import { Fieldset, TextInput } from "@mantine/core";
import { useFormContext } from "../context";

export function Core() {
    const form = useFormContext();
    return (
        <Fieldset legend="Cost Core">
            <TextInput label="Name" {...form.getInputProps(`name`)} />
        </Fieldset>
    )
}