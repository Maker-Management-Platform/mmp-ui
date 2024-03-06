import { ColorInput, DEFAULT_THEME, Fieldset, NumberInput, TextInput } from "@mantine/core";
import { useFormContext } from "../context";

export function Render() {
    const form = useFormContext();
    return (
        <Fieldset legend="Render">
            <NumberInput label="Max workers" {...form.getInputProps(`render.max_workers`)} />
            <ColorInput
                label="Model color"
                description="Input description"
                withEyeDropper={false}
                swatchesPerRow={10}
                swatches={[
                    ...DEFAULT_THEME.colors.red,
                    ...DEFAULT_THEME.colors.green,
                    ...DEFAULT_THEME.colors.blue,
                  ]}
                {...form.getInputProps(`render.model_color`)}
            />
            <ColorInput
                label="Background color"
                description="Input description"
                withEyeDropper={false}
                {...form.getInputProps(`render.background_color`)}
            />
        </Fieldset>
    )
}