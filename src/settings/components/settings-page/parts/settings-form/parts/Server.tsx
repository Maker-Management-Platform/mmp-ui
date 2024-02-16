import { Fieldset, NumberInput } from "@mantine/core";
import { useFormContext } from "../context";

export function Server() {
    const form = useFormContext();
    return (
        <Fieldset legend="Server">
            <NumberInput label="Port" {...form.getInputProps(`server.port`)} />
        </Fieldset>
    )
}