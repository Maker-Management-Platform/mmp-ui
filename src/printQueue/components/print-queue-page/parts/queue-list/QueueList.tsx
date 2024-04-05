import { Avatar, Box, Group, Text, Center, Stack, Paper, ActionIcon, rem } from "@mantine/core"
import { DragDropContext, Droppable, Draggable, DraggableProvided } from '@hello-pangea/dnd';
import { IconGripVertical, IconTrash } from "@tabler/icons-react";


const printJobs = [
    {
        id: 1,
        slice: {
            name: 'Slice 1',
            properties: {
                name: 'Slice 1',
                color: 'red',
            }
        }
    }, {
        id: 2,
        slice: {
            name: 'Slice 2',
            properties: {
                name: 'Slice 1',
                color: 'red',
            }
        }
    }, {
        id: 3,
        slice: {
            name: 'Slice 3',
            properties: {
                name: 'Slice 1',
                color: 'red',
            }
        }
    }, {
        id: 4,
        slice: {
            name: 'Slice 4',
            properties: {
                name: 'Slice 1',
                color: 'red',
            }
        }
    },
]

export function QueueList() {


    return <DragDropContext
        onDragEnd={({ destination, source }) =>
            console.log(destination, source)
        }>
        <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
                <Stack gap="xs" mt='sm' {...provided.droppableProps} ref={provided.innerRef}>
                    {printJobs.map(job => (
                        <Draggable key={job.id} index={job.id} draggableId={job.id.toString()}>
                            {(provided) => (
                                <JobFragment provided={provided} index={job.id} job={job} remove={console.log} />
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </Stack>
            )}
        </Droppable>
    </DragDropContext>

}

function JobFragment({ provided, index, job, remove }: { provided: DraggableProvided, index: number, job: any, remove: () => void }) {

    return (
        <Paper shadow="xs" radius="xs" withBorder p="sm" component={Group} ref={provided.innerRef} bg="var(--mantine-color-body)" {...provided.draggableProps}>
            <Box>
                <Center {...provided.dragHandleProps}>
                    <IconGripVertical size="1.2rem" />
                </Center>
            </Box>
            <Group gap="sm">
                <Avatar size={40} src={job.slice.name} radius={40} />
                <Box>
                    <Text fz="sm" fw={500}>
                        {job.slice.name}
                    </Text>
                    <Text fz="xs" c="dimmed">
                        {job.slice.properties.color}
                    </Text>
                </Box>
            </Group>
            <Group gap="sm" ml="auto">
                <Box>
                    <Text fz="sm" fw={500}>
                        Target
                    </Text>
                    <Center fz="xs" c="dimmed">
                        {job.slice.properties.color}
                    </Center>
                </Box>
            </Group>
            <Group gap="sm">
                <Box>
                    <Text fz="sm" fw={500}>
                        Starts in
                    </Text>
                    <Center fz="xs" c="dimmed">
                        {job.slice.properties.color}
                    </Center>
                </Box>
            </Group>
            <Group gap="sm">
                <Box>
                    <Text fz="sm" fw={500}>
                        ETA
                    </Text>
                    <Center fz="xs" c="dimmed">
                        {job.slice.properties.color}
                    </Center>
                </Box>
            </Group>
            <ActionIcon  size={42} variant="default" aria-label="ActionIcon with size as a number">
                <IconTrash style={{ width: rem(24), height: rem(24) }} />
            </ActionIcon>
        </Paper>
    )
}