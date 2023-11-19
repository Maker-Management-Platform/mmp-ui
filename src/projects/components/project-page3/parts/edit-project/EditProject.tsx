import {Container} from "@mantine/core";
import {ProjectForm} from "../../../project-form/ProjectForm.tsx";
import {Project} from "../../../../entities/Project.ts";


type EditProjectProps = {
    project: Project;
}

export function EditProject({project}: EditProjectProps) {
    return (
        <>
            <Container>
                <ProjectForm project={project} onSave={(p: Project) => console.log(p)}/>
            </Container>
        </>
    );
}
