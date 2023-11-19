import {useParams} from "react-router-dom";
import useAxios from "axios-hooks";
import {Project} from "../../entities/Project.ts";
import {useEffect, useState} from "react";
import {ProjectPageBody} from "./parts/project-page-body/ProjectPageBody.tsx";
import {ProjectHeader} from "../project-header/ProjectHeader.tsx";
import {baseURL} from "../../../core/config.ts";


export function ProjectPage3() {
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
            <ProjectHeader
                name={project?.name || ''}
                description={project?.description || ''}
                tags={project?.tags || []}
                imagePath={`${baseURL}/projects/${project?.uuid}/assets/${project?.default_image_path}` || ''}
            />
            {error && <p>Error!</p>}
            {loading && <p>Loading...</p>}
            {id && <ProjectPageBody projectUuid={id} project={project}/>}
        </>
    )
}