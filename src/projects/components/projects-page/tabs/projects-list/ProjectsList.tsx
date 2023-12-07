import {Container, Flex, rem, Skeleton} from "@mantine/core";
import {ProjectFilterCard} from "@/projects/components/project-filter-card/ProjectFilterCard.tsx";
import {ProjectCard} from "@/projects/components/project-card/ProjectCard.tsx";
import {useListState} from "@mantine/hooks";
import useAxios from "axios-hooks";
import {useContext, useEffect} from "react";
import {Project} from "@/projects/entities/Project.ts";
import { SettingsContext } from "@/core/utils/settingsContext.ts";

type ProjectLisItem = { visible: boolean, p: Project }

export function ProjectsList() {
    const {local_backend} = useContext(SettingsContext);
    const size = rem('280px');
    const [projectList, projectListHandlers] = useListState<ProjectLisItem>([]);
    const [{data, loading, error}] = useAxios(
        `${local_backend}/projects`
    );
    useEffect(() => {
        if (!data) return;
        projectListHandlers.remove(0, projectList.length);
        data
            .map((p: Project) => {
                return {
                    visible: true, p
                }
            })
            .forEach((i: ProjectLisItem) => projectListHandlers.append(i))
    }, [data]);

    if (error) return <p>Error!</p>;

    const onFilterChange = (fn) => {
        projectListHandlers.apply((i) => ({...i, visible: fn(i.p)}));
    }

    return (
        <Container fluid my='xs'>
            <Flex
                gap="md"
                justify="center"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
                {loading && Array.from(Array(50))
                    .map((_, i) => <Skeleton
                        style={{height: size, minHeight: size, minWidth: size, width: size}}
                        key={i}
                        visible={true}/>)}
                <ProjectFilterCard onChange={onFilterChange} projects={projectList.map(i => (i.p))}/>
                {!loading && projectList
                    .filter((i) => i.visible)
                    .map((i) => <ProjectCard key={i.p.uuid} project={i.p}/>)}
            </Flex>
        </Container>
    );
}
