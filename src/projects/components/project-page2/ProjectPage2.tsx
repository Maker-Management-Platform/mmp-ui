import {useParams} from "react-router-dom";
import useAxios from "axios-hooks";
import {Project} from "../../entities/Project.ts";
import {useEffect, useState} from "react";
import {Flex} from "@mantine/core";
import {ProjectAssetsList} from "./parts/project-assets-list/ProjectAssetsList.tsx";


export function ProjectPage2() {
    const {id} = useParams();
    const [project, setProject] = useState<Project>();

    const [{data, loading, error}] = useAxios(
        `/projects/${id}`
    );

    useEffect(() => {
        setProject(data);
    }, [data]);

    return (
        <>
            {project?.name}
            {project?.tags.map(s => <span>{s}</span>)}
            {error && <p>Error!</p>}
            {loading && <p>Loading...</p>}
            <Flex
                mih={50}
                gap="md"
                justify="flex-start"
                align="center"
                direction="column"
                wrap="wrap"
            >
                {id && <ProjectAssetsList projectUuid={id}/>}
            </Flex>
        </>
    )
}