import {useParams} from "react-router-dom";
import useAxios from "axios-hooks";
import {Project} from "../../entities/Project.ts";
import {useContext, useEffect, useState} from "react";
import {Flex} from "@mantine/core";
import {ProjectAssetsList} from "./parts/project-assets-list/ProjectAssetsList.tsx";
import {ProjectHeader} from "../project-header/ProjectHeader.tsx";
import {baseURL} from "../../../core/config.ts";
import { SettingsContext } from "../../../core/utils/settingsContext.ts";


export function ProjectPage2() {
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
            <ProjectHeader project={project}
                           name={project?.name || ''}
                           description={project?.description || ''}
                           tags={project?.tags || []}
                           imagePath={`${baseURL}/projects/${project?.uuid}/assets/${project?.default_image_path}` || ''}
            />
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