import { Container, Flex, Group, Pagination, rem, Select, Skeleton } from "@mantine/core";
import { ProjectFilterCard } from "./parts/project-filter-card/ProjectFilterCard.tsx";
import { ProjectCard } from "./parts/project-card/ProjectCard.tsx";
import { useListState } from "@mantine/hooks";
import useAxios from "axios-hooks";
import { useContext, useEffect, useState } from "react";
import { Project } from "@/projects/entities/Project.ts";
import { SettingsContext } from "@/core/utils/settingsContext.ts";

type ProjectLisItem = { visible: boolean, p: Project }

export function ProjectsList() {
    const { local_backend } = useContext(SettingsContext);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState('20')
    const [projects, setProjects] = useState<Project[]>([])
    const size = rem('280px');
    const [projectList, projectListHandlers] = useListState<ProjectLisItem>([]);
    const [{ data, loading, error }] = useAxios(
        `${local_backend}/projects?page=${page - 1}&size=${perPage}`
    );
    useEffect(() => {
        if (!data?.items) return;
        setProjects(data.items)
    }, [data]);

    if (error) return <p>Error!</p>;

    const onFilterChange = (fn: (p: Project) => boolean) => {
        projectListHandlers.apply((i) => ({ ...i, visible: fn(i.p) }));
    }

    return (
        <Container fluid my='xs'>
            <Group my="sm">
                <Select placeholder="Pick value" data={['10', '20', '50', '100']} value={perPage} onChange={(v) => { if (v) { setPage(1); setPerPage(v) } }} />
                <Pagination total={data?.total_pages} value={data?.page + 1} onChange={setPage}  withEdges onNextPage={() => { setPage(page + 1) }} onPreviousPage={() => { setPage(page - 1) }} />
            </Group>
            <Flex
                gap="md"
                justify="center"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
                <ProjectFilterCard onChange={onFilterChange} projects={projectList.map(i => (i.p))} />
                {loading && Array.from(Array(3))
                    .map((_, i) => <Skeleton
                        style={{ height: size, minHeight: size, minWidth: size, width: size }}
                        key={i}
                        visible={true} />)}
                {!loading && projects.map((i) => <ProjectCard key={i.uuid} project={i} />)}
            </Flex>
        </Container>
    );
}
