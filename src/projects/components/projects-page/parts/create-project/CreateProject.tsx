import { Container } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { ProjectForm } from "@/projects/components/parts/project-form/ProjectForm";
import { Project } from "@/projects/entities/Project.ts";

export function CreateProject() {
    const navigate = useNavigate();
    const project = {
        uuid: "",
        name: "",
        description: "",
        path: "",
        external_link: "",
        tags: [],
        default_image_id: "",
        default_image_name: "",
        initialized: false,
        assets: []
    };

    const onSave = (project: Project) => {
        console.log(project)

        navigate(`/projects/${project.uuid}`)
    }

    return (
        <Container>
            <ProjectForm project={project} onProjectChange={onSave} withUpload={true} />
        </Container>
    );
}
