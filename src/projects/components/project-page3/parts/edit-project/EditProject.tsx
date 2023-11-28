import {Container} from "@mantine/core";
import {ProjectForm} from "../../../project-form/ProjectForm.tsx";
import {Project} from "../../../../entities/Project.ts";
import useAxios from "axios-hooks";
import { useContext } from "react";
import { SettingsContext } from "../../../../../core/utils/settingsContext.ts";


type EditProjectProps = {
    project: Project;
}

export function EditProject({project}: EditProjectProps) {
    const {local_backend} = useContext(SettingsContext);
    const [{loading, error: eMove}, save] = useAxios({
        method: 'post',
    }, {manual: true})
    const onSave = (project: Project) => {
        save({
            url: `${local_backend}/projects/${project.uuid}`,
            data: {
                ...project,
            }
        }).then(({data}) => console.log(data));
    };

    return (
        <>
            <Container>
                <ProjectForm project={project} loading={loading} onSave={onSave}/>
            </Container>
        </>
    );
}
