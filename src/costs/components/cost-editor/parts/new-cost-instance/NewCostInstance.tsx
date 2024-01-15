import { Button, Checkbox, Fieldset, Group, NumberInput, Select } from "@mantine/core";
import { CostTypeSelect } from "../cost-type-select/CostTypeSelect";
import { Asset } from "@/assets/entities/Assets";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

type CostTypeSelectProps = {
    costTypes: CostType[]
    assets?: Asset[]
    add: (ce: CostInstance) => void
}

export function NewCostInstance({ costTypes, assets, add }: CostTypeSelectProps) {
    const form = useForm<CostInstance>({
        initialValues: {} as CostInstance,
    });


    const onAdd = () => {
        add(form.values)
        form.setValues({ units: 1, costPerUnit: 0, assetId: null, isTime: false, name: '' } as CostInstance)
    }

    const onAssetChange = (assetId: string | null) => {
        if (!assets) {
            return
        }
        if (!assetId) {
            form.setFieldValue('assetId', "")
            return
        }

        const asset = assets.find((a) => a.id === assetId)
        if (!asset) {
            return
        }

        if (form.values.name == 'fdm' && asset.asset_type == 'slice' && asset.slice?.cost) {
            form.setFieldValue('costPerUnit', asset.slice.cost)
        }

        if (form.values.name == 'power consumption' && asset.asset_type == 'slice' && asset.slice?.duration) {
            console.log("missing power consumption implementation")
        }
        form.setFieldValue('assetId', assetId)
    }

    useEffect(() => {
        onAssetChange(null)
        const type = costTypes.find(ct => ct.name === form.values.name)
        if (type) {
            form.setValues({ ...form.values, ...type } as CostInstance)
        }
    }, [form.values.name])

    return (
        <Fieldset legend="New Cost Instance">
            <Group>
                <CostTypeSelect costTypes={costTypes} {...form.getInputProps(`name`)} />
                {assets && <Select
                    placeholder="Asset"
                    data={assets?.map(a => ({ value: a.id, label: a.name }))}
                    value={form.values.assetId}
                    onChange={onAssetChange}
                    allowDeselect={false}
                    clearable
                />}
                <NumberInput placeholder="Units" {...form.getInputProps(`units`)} />
                <NumberInput placeholder="Cost per Unit" {...form.getInputProps(`costPerUnit`)} />
                <Checkbox label='Is Hourly' {...form.getInputProps(`isTime`, { type: 'checkbox' })} />
                <NumberInput placeholder="Markup" {...form.getInputProps(`markup`)} />
                <Button variant="filled" onClick={onAdd}>Add</Button>
            </Group>
        </Fieldset>
    )
}