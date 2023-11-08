import {AspectRatio, ScrollArea, SimpleGrid, Skeleton} from "@mantine/core";
import {ModelCard} from "../model-card/ModelCard.tsx";
import {Project} from "../../../projects/entities/Project.ts";

type ModelsPageProps = {
    project?: Project,
    loading: boolean
}

export function ModelsPage({project, loading}: ModelsPageProps) {
    return (<>
        <SimpleGrid cols={{base: 1, sm: 2}} spacing="md">
            <ScrollArea w={280}>
                {!loading && project && project?.assets
                    && project.assets.filter(a => a.asset_type === 'model')
                        .map(m => <ModelCard model={m} onSelect={console.log}/>)}
            </ScrollArea>
            <AspectRatio ratio={1}>
                <Skeleton radius="md" animate={loading}/>
            </AspectRatio>
        </SimpleGrid>
    </>);
}
