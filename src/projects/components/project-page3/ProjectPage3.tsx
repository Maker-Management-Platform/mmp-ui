import {useParams} from "react-router-dom";
import useAxios from "axios-hooks";
import {Project} from "../../entities/Project.ts";
import {useContext, useEffect, useState} from "react";
import {ProjectPageBody} from "./parts/project-page-body/ProjectPageBody.tsx";
import {ProjectHeader} from "../project-header/ProjectHeader.tsx";
import { SettingsContext } from "../../../core/utils/settingsContext.ts";


export function ProjectPage3() {
    const {local_backend} = useContext(SettingsContext);
    const {id} = useParams();
    const [project, setProject] = useState<Project>();

    const [{data, loading, error}] = useAxios(
        `${local_backend}/projects/${id}`
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
                imagePath={`${local_backend}/projects/${project?.uuid}/assets/${project?.default_image_path}` || ''}
            />
            {error && <p>Error!</p>}
            {loading && <p>Loading...</p>}
            {id && <ProjectPageBody projectUuid={id} project={project}/>}
        </>
    )
}