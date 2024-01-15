import { Autocomplete, AutocompleteProps } from "@mantine/core";

type CostTypeSelectProps = {
    costTypes: CostType[]
    value?: string
    onChange: (v: string) => void
} & AutocompleteProps

export function CostTypeSelect({ costTypes = [], value, onChange, ...props }: CostTypeSelectProps) {
    let selectValues = Array<{
        group: string,
        items: Array<{ label: string, value: string }>
    }>();

    costTypes.forEach((e) => {
        let found = false;
        selectValues.forEach((s) => {
            if (s.group == e.group) {
                s.items = [...s.items, { label: e.name, value: e.name }];
                found = true;
            }
        })
        if (!found) {
            selectValues = [...selectValues, { group: e.group, items: [{ label: e.name, value: e.name }] }]
        }
    })

    return (
        <Autocomplete {...props} placeholder="Type" data={selectValues} onChange={onChange} value={value} />
    )
}