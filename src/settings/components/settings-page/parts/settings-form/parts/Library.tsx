import { Fieldset, Switch, TagsInput, TextInput } from "@mantine/core";
import { useFormContext } from "../context";

export function Library() {
    const form = useFormContext();
    return (
        <Fieldset legend="Library">
            <TextInput label="Path" {...form.getInputProps(`library.path`)} />
            <TagsInput
                mb="sm"
                label="Blacklist"
                {...form.getInputProps(`library.blacklist`)}
                splitChars={[' ', '|']}
            />
            <Switch mt={'sm'} {...form.getInputProps(`library.ignore_dot_files`, { type: 'checkbox' })} label="Ignore dot Files" />
        </Fieldset>
    )
}