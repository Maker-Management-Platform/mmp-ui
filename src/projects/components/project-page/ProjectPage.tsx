import { useNavigate, useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import { Project } from "../../entities/Project.ts";
import { useContext } from "react";
import { ProjectPageBody } from "./parts/project-page-body/ProjectPageBody.tsx";
import { Header } from "@/core/header/Header.tsx";
import { SettingsContext } from "@/core/settings/settingsContext.ts";


export function ProjectPage() {
    const navigate = useNavigate();
    const { settings } = useContext(SettingsContext);
    const { id } = useParams();

    const [{ data: project, loading, error }, refetch] = useAxios<Project>(
        `${settings.localBackend}/projects/${id}`
    );
    return (
        <>
            <Header
                loading={loading}
                title={project?.name}
                description={project?.description}
                tags={project?.tags}
                link={project?.external_link}
                imagePath={`${settings.localBackend}/projects/${project?.uuid}/assets/${project?.default_image_id}`}
                onTagClick={(t) => navigate(`/projects/list?filter=${JSON.stringify({ tags: [t.value] })}`)}
            />
            {error && <p>Error!</p>}
            {id && <ProjectPageBody projectUuid={id} project={project} onProjectChange={(p) => {
                console.log("onProjectChange", p)
                refetch()
            }} />}
        </>
    )
}