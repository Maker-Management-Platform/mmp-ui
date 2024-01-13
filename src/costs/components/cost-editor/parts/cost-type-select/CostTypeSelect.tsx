import { Autocomplete } from "@mantine/core";

type CostTypeSelectProps = {
    costTypes: CostType[]
    value: string
    onChange: (v: string) => void
}

export function CostTypeSelect({ costTypes = [], value, onChange }: CostTypeSelectProps) {
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
        <Autocomplete placeholder="Type" data={selectValues} onChange={onChange} value={value} />
    )
}