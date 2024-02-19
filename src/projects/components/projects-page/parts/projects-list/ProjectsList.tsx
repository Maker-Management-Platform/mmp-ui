import { Container, Flex, Group, Pagination, rem, Select, Skeleton } from "@mantine/core";
import { Filter } from "./parts/project-filter-card/ProjectFilterCard.tsx";
import { ProjectCard } from "./parts/project-card/ProjectCard.tsx";
import useAxios from "axios-hooks";
import { useContext, useEffect, useRef, useState } from "react";
import { Project } from "@/projects/entities/Project.ts";
import { SettingsContext } from "@/core/settings/settingsContext.ts";
import { ProjectFilter } from "./parts/project-filter/ProjectFilter.tsx";

export function ProjectsList() {
    const reload = useRef(Math.floor(1000 + Math.random() * 9000));
    const { settings } = useContext(SettingsContext);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState('20')
    const [projects, setProjects] = useState<Project[]>([])
    const [filter, setFilter] = useState<Filter>({ name: '', tags: [] })
    const size = rem('280px');
    const [{ data, loading, error }] = useAxios(
        `${settings.localBackend}/projects?page=${page - 1}&size=${perPage}${filter.name ? '&name=' + filter.name : ''}${filter.tags.length > 0 ? '&tags=' + filter.tags?.join(",") : ''}&_=${reload.current}`
    );
    useEffect(() => {
        if (!data?.items) return;
        setProjects(data.items)
    }, [data]);

    if (error) return <p>Error!</p>;

    return (
        <Container fluid my='xs'>
            <Group mb="md" >
                <ProjectFilter onChange={setFilter} />
                <Select ml="auto" placeholder="Pick value" data={['10', '20', '50', '100']} value={perPage} onChange={(v) => { if (v) { setPage(1); setPerPage(v) } }} />
                <Pagination total={data?.total_pages} value={data?.page + 1}
                    onChange={setPage}
                    onNextPage={() => { setPage(page + 1) }}
                    onPreviousPage={() => { setPage(page - 1) }} />
            </Group>
            <Flex
                gap="md"
                justify="center"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
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
