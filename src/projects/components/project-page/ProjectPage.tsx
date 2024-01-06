import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import { Project } from "../../entities/Project.ts";
import { useContext } from "react";
import { ProjectPageBody } from "./parts/project-page-body/ProjectPageBody.tsx";
import { Header } from "@/core/header/Header.tsx";
import { SettingsContext } from "@/core/utils/settingsContext.ts";


export function ProjectPage() {
    const { local_backend } = useContext(SettingsContext);
    const { id } = useParams();

    const [{ data: project, loading, error }, refetch] = useAxios<Project>(
        `${local_backend}/projects/${id}`
    );
    return (
        <>
            <Header
                loading={loading}
                title={project?.name}
                description={project?.description}
                tags={project?.tags}
                imagePath={`${local_backend}/projects/${project?.uuid}/assets/${project?.default_image_id}`}
            />
            {error && <p>Error!</p>}
            {id && <ProjectPageBody projectUuid={id} project={project} onProjectChange={(p) => {
                console.log("onProjectChange", p)
                refetch()
            }} />}
        </>
    )
}