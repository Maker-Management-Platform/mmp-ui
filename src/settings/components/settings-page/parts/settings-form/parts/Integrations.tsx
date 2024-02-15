import { Fieldset, TextInput } from "@mantine/core";
import { useFormContext } from "../context";

export function Integrations() {
    const form = useFormContext();
    return (
        <Fieldset legend="Thingiverse">
            <TextInput label="Token" {...form.getInputProps(`integrations.thingiverse.toke`)} />
        </Fieldset>
    )
}