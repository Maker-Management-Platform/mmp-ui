import { ActionIcon, Center, Checkbox, Code, Fieldset, Group, NumberInput, Select, Table, Text, TextInput, Textarea } from "@mantine/core"
import { createFormContext } from "@mantine/form";
import { DragDropContext, Droppable, Draggable, DraggableProvided } from '@hello-pangea/dnd';
import { IconGripVertical, IconHeart, IconTrash } from "@tabler/icons-react";
import { useContext, useEffect } from "react";
import { ProjectSelectLoaded } from "@/core/form-fields/project-select/ProjectSelectLoaded";
import { Project } from "@/projects/entities/Project";
import { SettingsContext } from "@/core/utils/settingsContext";
import useAxios from "axios-hooks";
import { Asset } from "@/assets/entities/Assets";
import { NewCostInstance } from "./parts/new-cost-instance/NewCostInstance";


const stdScosts: CostType[] = [{
    name: "fdm",
    group: "printing",
    costPerUnit: 10,
    units: 1,
    isTime: true,
    markup: 0,
    assetId: null
}, {
    name: "power consumption",
    group: "utilities",
    costPerUnit: 0.5,
    units: 1,
    isTime: true,
    markup: 0,
    assetId: null
}, {
    name: "painting",
    group: "manual labour",
    costPerUnit: 10,
    units: 1,
    isTime: true,
    markup: 0,
    assetId: null
}, {
    name: "sanding",
    group: "manual labour",
    costPerUnit: 10,
    units: 1,
    isTime: true,
    markup: 0,
    assetId: null
}, {
    name: "fixtures",
    group: "hardware",
    costPerUnit: 10,
    units: 1,
    isTime: false,
    markup: 0,
    assetId: null
}, {
    name: "paints",
    group: "paints",
    costPerUnit: 10,
    units: 1,
    isTime: true,
    markup: 0,
    assetId: null
}]

const [FormProvider, useFormContext, useForm] = createFormContext<ProjectCosts>();

export function CostEditor() {
    const { local_backend } = useContext(SettingsContext);
    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            projectUuid: '',
            globalMarkup: 0,
            producedUnits: 1,
            costs: [],
            totalCost: 0,
            totalValue: 0,
            totalHours: 0,
            valuePerUnit: 0,
            costPerUnit: 0
        },
        transformValues: (values) => ({
            ...values,
            costs: values.costs.map(c => ({
                ...c,
                cost: c.value * c.units,
                value: (c.value * c.units) + ((c.value * c.units) * c.markup)
            }))
        }),
    });

    useEffect(() => {
        form.setFieldValue('totalHours', form.values.costs
            .filter((c) => c.isTime)
            .map(c => c.units)
            .reduce((a, b) => a + b, 0));

        const tCost = form.values.costs
            .map(c => (c.value * c.units))
            .reduce((a, b) => a + b, 0);
        let tValue = form.values.costs
            .map(c => (c.value * c.units))
            .reduce((a, b) => a + b, 0);
        tValue += (tValue * form.values.globalMarkup)

        form.setFieldValue('totalCost', tCost);
        form.setFieldValue('totalValue', tValue);


        form.setFieldValue('costPerUnit', (tCost / form.values.producedUnits));
        form.setFieldValue('valuePerUnit', (tValue / form.values.producedUnits));


    }, [form.values.costs, form.values.producedUnits, form.values.globalMarkup])

    const [{ data: assets, loading, error }, fetchAssets] = useAxios<Asset[]>(
        `${local_backend}/projects/${form.values.projectUuid}/assets`,
        { manual: true }
    );

    useEffect(() => {
        if (!form.values.projectUuid) return;
        fetchAssets();
    }, [form.values.projectUuid])



    function removeRow(index: number): void {
        form.setFieldValue('costs', form.values.costs.filter((_, i) => i !== index));
    }

    return (<>
        <FormProvider form={form}>
            <Group>
                <Fieldset legend="Cost Group">
                    <TextInput label="Name" {...form.getInputProps(`name`)} />
                    <Textarea label="Description" maxRows={4} {...form.getInputProps(`description`)} />
                    <ProjectSelectLoaded label="Project" value={form.values.projectUuid} onChange={(p: Project) => form.setFieldValue('projectUuid', p.uuid)} />
                    <NumberInput label="Markup" {...form.getInputProps(`globalMarkup`)} />
                    <NumberInput label="Produced Units" {...form.getInputProps(`producedUnits`)} />
                </Fieldset>
                <Fieldset legend="Overview">
                    <Table>
                        <Table.Thead>
                            <Table.Tr></Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td>totalCost</Table.Td>
                                <Table.Td>
                                    {form.values.totalCost}
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td>totalValue</Table.Td>
                                <Table.Td>
                                    {form.values.totalValue}
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td>Hours</Table.Td>
                                <Table.Td>
                                    {form.values.totalHours}
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td>costPerUnit</Table.Td>
                                <Table.Td>
                                    {form.values.costPerUnit}
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td>valuePerUnit</Table.Td>
                                <Table.Td>
                                    {form.values.valuePerUnit}
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Fieldset>
            </Group>
            <NewCostInstance costTypes={stdScosts} assets={assets} add={(i) => form.setFieldValue("costs", [...form.values.costs, i])} />
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
                                    <Table.Th>Markup</Table.Th>
                                    <Table.Th><Center>Hourly cost</Center></Table.Th>
                                    <Table.Th>Associated Asset</Table.Th>
                                    <Table.Th><Center>Cost</Center></Table.Th>
                                    <Table.Th><Center>Value</Center></Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody {...provided.droppableProps} ref={provided.innerRef}>
                                {form.values.costs.map((_, index) => (
                                    <Draggable key={index} index={index} draggableId={index.toString()}>
                                        {(provided) => (
                                            <CostFragment provided={provided} index={index} assets={assets ?? []} remove={()=>removeRow(index)}/>
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

function CostFragment({ provided, index, assets, remove }: { provided: DraggableProvided, index: number, assets: Asset[], remove: () => void }) {
    const form = useFormContext();

    useEffect(() => {
        form.setFieldValue(`costs.${index}.cost`, form.values.costs[index].costPerUnit * form.values.costs[index].units)
        form.setFieldValue(`costs.${index}.value`, (form.values.costs[index].costPerUnit * form.values.costs[index].units)
            + ((form.values.costs[index].costPerUnit * form.values.costs[index].units) * form.values.costs[index].markup))

    }, [index, form.values.costs[index].costPerUnit, form.values.costs[index].units, form.values.costs[index].markup])

    return (
        <Table.Tr ref={provided.innerRef} {...provided.draggableProps}>
            <Table.Td>
                <Center {...provided.dragHandleProps}>
                    <IconGripVertical size="1.2rem" />
                </Center>
            </Table.Td>
            <Table.Td>
                <TextInput placeholder="Name" {...form.getInputProps(`costs.${index}.name`)} />
            </Table.Td>
            <Table.Td>
                <NumberInput placeholder="Units" {...form.getInputProps(`costs.${index}.units`)} />
            </Table.Td>
            <Table.Td>
                <NumberInput placeholder="Value" {...form.getInputProps(`costs.${index}.costPerUnit`)} />
            </Table.Td>
            <Table.Td>
                <NumberInput placeholder="Markup" {...form.getInputProps(`costs.${index}.markup`)} />
            </Table.Td>
            <Table.Td>
                <Center>
                    <Checkbox {...form.getInputProps(`costs.${index}.isTime`, { type: 'checkbox' })} />
                </Center>
            </Table.Td>
            <Table.Td>
                {assets.filter(a => a.id == form.values.costs[index].assetId).map(a => a.name)}
            </Table.Td>
            <Table.Td>
                <Center>
                    {(form.values.costs[index].cost)}
                </Center>
            </Table.Td>
            <Table.Td>
                <Center>
                    {(form.values.costs[index].value)}
                </Center>
            </Table.Td>
            <Table.Td>
                <Center>
                    <ActionIcon size="sm" onClick={remove}>
                        <IconTrash />
                    </ActionIcon>
                </Center>
            </Table.Td>
        </Table.Tr>
    )
}