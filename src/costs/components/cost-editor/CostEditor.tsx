import { Center, Checkbox, Code, Fieldset, Group, NumberInput, Select, Table, Text, TextInput } from "@mantine/core"
import { createFormContext } from "@mantine/form";
import { DragDropContext, Droppable, Draggable, DraggableProvided } from '@hello-pangea/dnd';
import { IconGripVertical } from "@tabler/icons-react";
import { useContext, useEffect } from "react";
import { ProjectSelectLoaded } from "@/core/form-fields/project-select/ProjectSelectLoaded";
import { Project } from "@/projects/entities/Project";
import { SettingsContext } from "@/core/utils/settingsContext";
import useAxios from "axios-hooks";
import { Asset } from "@/assets/entities/Assets";
import { NewCostInstance } from "./parts/new-cost-instance/NewCostInstance";
import { CostTypeSelect } from "./parts/cost-type-select/CostTypeSelect";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


const stdScosts: CostType[] = [{
    name: "fdm",
    group: "printing",
    costPerUnit: 10,
    units: 1,
    isTime: true,
    hasAsset: true
}, {
    name: "power consumption",
    group: "utilities",
    costPerUnit: 0.5,
    units: 1,
    isTime: true,
    hasAsset: true
}, {
    name: "painting",
    group: "manual labour",
    costPerUnit: 10,
    units: 1,
    isTime: true,
    hasAsset: false
}, {
    name: "sanding",
    group: "manual labour",
    costPerUnit: 10,
    units: 1,
    isTime: true,
    hasAsset: false
}, {
    name: "fixtures",
    group: "hardware",
    costPerUnit: 10,
    units: 1,
    isTime: true,
    hasAsset: false
}, {
    name: "paints",
    group: "paints",
    costPerUnit: 10,
    units: 1,
    isTime: true,
    hasAsset: false
}]

const [FormProvider, useFormContext, useForm] = createFormContext<ProjectCosts>();

export function CostEditor() {
    const { local_backend } = useContext(SettingsContext);
    const form = useForm({
        initialValues: {
            name: '',
            projectUuid: '',
            costs: [],
        },
    });

    const [{ data: assets, loading, error }, fetchAssets] = useAxios<Asset[]>(
        `${local_backend}/projects/${form.values.projectUuid}/assets`,
        { manual: true }
    );

    useEffect(() => {
        if (!form.values.projectUuid) return;
        fetchAssets();
    }, [form.values.projectUuid])



    return (<>
        <FormProvider form={form}>
            <Group>
                <Fieldset legend="Cost Group">
                    <TextInput label="Name" {...form.getInputProps(`name`)} />
                    <ProjectSelectLoaded label="Project" value={form.values.projectUuid} onChange={(p: Project) => form.setFieldValue('projectUuid', p.uuid)} />
                </Fieldset>
                <Fieldset legend="Overview">
                    <Table>
                        <Table.Thead>
                            <Table.Tr></Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td>Total</Table.Td>
                                <Table.Td>
                                    {form.values.costs
                                        .map(c => (c.value * c.units))
                                        .reduce((a, b) => a + b, 0)}
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td>Hours</Table.Td>
                                <Table.Td>
                                    {form.values.costs
                                        .filter((c) => c.isTime)
                                        .map(c => c.units)
                                        .reduce((a, b) => a + b, 0)}
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Fieldset>
            </Group>
            <NewCostInstance costTypes={stdScosts} assets={assets || []} add={(i) => form.setFieldValue("costs", [...form.values.costs, i])} />
            <DragDropContext
                onDragEnd={({ destination, source }) =>
                    destination?.index !== undefined && form.reorderListItem('costs', { from: source.index, to: destination.index })
                }>
                <Droppable droppableId="dnd-list" direction="vertical">
                    {(provided) => (
                        <Table mt='md'>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th />
                                    <Table.Th>Element</Table.Th>
                                    <Table.Th>Amount</Table.Th>
                                    <Table.Th>Cost per unit</Table.Th>
                                    <Table.Th><Center>Hourly cost</Center></Table.Th>
                                    <Table.Th>Associated Asset</Table.Th>
                                    <Table.Th><Center>Cost</Center></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody {...provided.droppableProps} ref={provided.innerRef}>
                                {form.values.costs.map((_, index) => (
                                    <Draggable key={index} index={index} draggableId={index.toString()}>
                                        {(provided) => (
                                            <CostFragment provided={provided} index={index} assets={assets || []} />
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Table.Tbody>
                        </Table>
                    )}
                </Droppable>
            </DragDropContext>
        </FormProvider >
        <Text size="sm" fw={500} mt="md">
            Form values:
        </Text>
        <Code block>{JSON.stringify(form.values, null, 2)}</Code>
    </>)
}

function CostFragment({ provided, index, assets }: { provided: DraggableProvided, index: number, assets: Asset[] }) {
    const form = useFormContext();
    const typeOnChange = (name: string) => {
        form.setFieldValue(`costs.${index}.type`, name)
        const c = stdScosts.find(e => e.name == name)
        if (c) {
            if (form.values.costs[index].value == 0) {
                form.setFieldValue(`costs.${index}.value`, c.costPerUnit)
                form.setFieldValue(`costs.${index}.hourlyValue`, c.isTime)
            }
        }
    }

    useEffect(() => {
        if (form.values.costs[index].type != 'fdm' && form.values.costs[index].type != 'power consumption') return;

        if (!form.values.costs[index].assetId) return;

        const asset = assets.find(a => a.id == form.values.costs[index].assetId)
        if (!asset) return;



        if (form.values.costs[index].type == 'fdm' && asset.asset_type == 'slice' && asset.slice?.cost) {
            form.setFieldValue(`costs.${index}.value`, asset.slice.cost)
            return
        }
        if (form.values.costs[index].type == 'power consumption' && asset.asset_type == 'slice' && asset.slice?.duration) {
            if (dayjs.isDuration("PT" + asset.slice.duration.toUpperCase())) {
                form.setFieldValue(`costs.${index}.units`, dayjs.duration("PT" + asset.slice.duration.toUpperCase()))
            }
            return
        }

    }, [index, form.values.costs[index].assetId, form.values.costs[index].type])

    return (<>
        <Table.Tr ref={provided.innerRef} {...provided.draggableProps}>
            <Table.Td>
                <Center {...provided.dragHandleProps}>
                    <IconGripVertical size="1.2rem" />
                </Center>
            </Table.Td>
            <Table.Td>
                <CostTypeSelect costTypes={stdScosts} onChange={typeOnChange} value={form.getInputProps(`costs.${index}.type`).value} />
            </Table.Td>
            <Table.Td>
                <NumberInput placeholder="Units" {...form.getInputProps(`costs.${index}.units`)} />
            </Table.Td>
            <Table.Td>
                <NumberInput placeholder="Value" {...form.getInputProps(`costs.${index}.value`)} />
            </Table.Td>
            <Table.Td>
                <Center>
                    <Checkbox {...form.getInputProps(`costs.${index}.hourlyValue`, { type: 'checkbox' })} />
                </Center>
            </Table.Td>
            <Table.Td>
                <Select
                    placeholder="Asset"
                    data={assets?.map(a => ({ value: a.id, label: a.name }))}
                    value={form.getInputProps(`costs.${index}.type`).value ? form.getInputProps(`costs.${index}.assetId`).value : null}
                    onChange={(v) => form.setFieldValue(`costs.${index}.assetId`, v)}
                    allowDeselect={true}
                />
            </Table.Td>
            <Table.Td>
                <Center>
                    {form.values.costs[index].value * form.values.costs[index].units}
                </Center>
            </Table.Td>
        </Table.Tr>
    </>)
}