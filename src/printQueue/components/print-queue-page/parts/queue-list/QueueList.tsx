import { Avatar, Box, Group, Text, Center, Stack, Paper, ActionIcon, rem, Tooltip } from "@mantine/core"
import { DragDropContext, Droppable, Draggable, DraggableProvided } from '@hello-pangea/dnd';
import { IconGripVertical, IconTrash } from "@tabler/icons-react";
import { useContext, useEffect, useId, useRef, useState } from "react";
import { SettingsContext } from "@/core/settings/settingsContext";
import useAxios from "axios-hooks";
import { PrintJob } from "@/printQueue/entities/PrintJob";
import SSEContext from "@/core/sse/SSEContext";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export function QueueList() {
    const { settings } = useContext(SettingsContext);
    const [printJobs, setPrintJobs] = useState<PrintJob[]>([])
    const [{ loading: mLoading }, move] = useAxios<PrintJob[]>(
        `${settings.localBackend}/printqueue/move`,
        { manual: true }
    )

    const subscriberId = useId();
    const { connected, subscribe, unsubscribe } = useContext(SSEContext)
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!connected) return;
        setPrintJobs([]);
        subscribe({
            subscriberId,
            provider: `printqueue`,
            event: `printQueue.queue.update`,
            callback: (s) => { console.log(s); setPrintJobs(s) }
        }).catch(setError);
        return () => {
            unsubscribe(subscriberId)
        }
    }, [connected])


    return <DragDropContext
        onDragEnd={({ destination, source }) => {
            console.log(destination, source)
            const job = printJobs?.find(job => job.position === source.index)
            console.log(job)
            if (job && destination) {
                move({
                    url: `${settings.localBackend}/printqueue/move?jobUuid=${job.uuid}&position=${destination.index}`
                })
            }

        }
        }>
        <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
                <Stack gap="xs" mt='sm' {...provided.droppableProps} ref={provided.innerRef}>
                    {printJobs?.map(job => (
                        <Draggable key={job.position} index={job.position} draggableId={job.position.toString()}>
                            {(provided) => (
                                <JobFragment provided={provided} index={job.position} job={job} remove={console.log} />
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
    const { settings } = useContext(SettingsContext);
    const subscriberId = useId();
    const { connected, subscribe, unsubscribe } = useContext(SSEContext)
    const [error, setError] = useState<Error | null>(null);
    const [status, SetStatus] = useState<any>({});

    useEffect(() => {
        if (!connected) return;
        subscribe({
            subscriberId,
            provider: `printqueue`,
            event: `printQueue.job.update.${job.uuid}`,
            callback: (s) => { console.log(s); SetStatus(s) }
        }).catch(setError);
        return () => {
            unsubscribe(subscriberId)
        }
    }, [job, connected])
    return (
        <Paper shadow="xs" radius="xs" withBorder p="sm" component={Group} ref={provided.innerRef} bg="var(--mantine-color-body)" {...provided.draggableProps}>
            <Box>
                <Center {...provided.dragHandleProps}>
                    <IconGripVertical size="1.2rem" />
                </Center>
            </Box>
            <Group gap="sm">
                <Avatar size={40} src={`${settings.localBackend}/projects/${job.slice.project_uuid}/assets/${job.slice.image_id}/file`} radius={40} />
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
                        <Tooltip label={dayjs(status?.startAt).toString()}>
                            {dayjs(status?.startAt).fromNow()}
                        </Tooltip>
                    </Center>
                </Box>
            </Group>
            <Group gap="sm">
                <Box>
                    <Text fz="sm" fw={500}>
                        ETA
                    </Text>
                    <Center fz="xs" c="dimmed">
                        {dayjs(status?.endAt).fromNow()}
                    </Center>
                </Box>
            </Group>
            <ActionIcon size={42} variant="default" aria-label="ActionIcon with size as a number">
                <IconTrash style={{ width: rem(24), height: rem(24) }} />
            </ActionIcon>
        </Paper>
    )
}