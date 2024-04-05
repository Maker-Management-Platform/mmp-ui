import { Grid } from "@mantine/core";
import { QueueList } from "./parts/queue-list/QueueList";
import { JobForm } from "./parts/job-form/JobForm";

export function PrintQueuePage() {

    return (
        <Grid >
            <Grid.Col span={8}>
                <JobForm />
            </Grid.Col>
            <Grid.Col span={4}>
                <QueueList />
            </Grid.Col>
        </Grid>
    )
}