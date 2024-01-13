import { Button, Fieldset, Group, Select } from "@mantine/core";
import { CostTypeSelect } from "../cost-type-select/CostTypeSelect";
import { useState } from "react";
import { Asset } from "@/assets/entities/Assets";

type CostTypeSelectProps = {
    costTypes: CostType[]
    assets: Asset[]
    add: (ce: CostInstance) => void
}

export function NewCostInstance({ costTypes, assets = [], add }: CostTypeSelectProps) {
    const [costInstance, setCostInstance] = useState<CostInstance>({ units: 1, value: 0 } as CostInstance)

    const onAdd = () => {
        add(costInstance)
        setCostInstance({ units: 1, value: 0, assetId: null, type: '' } as CostInstance)
    }

    return (
        <Fieldset legend="New Cost Instance">
            <Group>
                <CostTypeSelect costTypes={costTypes} value={costInstance?.type} onChange={(v) => setCostInstance({ ...costInstance, type: v })} />
                <Select
                    placeholder="Asset"
                    data={assets?.map(a => ({ value: a.id, label: a.name }))}
                    value={costInstance.assetId}
                    onChange={(v) => setCostInstance({ ...costInstance, assetId: v || "" })}
                    allowDeselect={false}
                />
                <Button variant="filled" onClick={onAdd}>Add</Button>
            </Group>
        </Fieldset>
    )
}