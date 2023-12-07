import { Container, Tabs } from "@mantine/core";
import { ProjectForm } from "@/projects/components/parts/project-form/ProjectForm.tsx";
import { Project } from "@/projects/entities/Project.ts";
import { ProjectOprations } from "@/projects/components/parts/project-operations/ProjectOperations.tsx";


type EditProjectProps = {
    project: Project;
    onProjectChange: (p: Project) => void;
}

export function EditProject({ project, onProjectChange }: EditProjectProps) {
    return (
        <>
            <Tabs defaultValue="edit" orientation="vertical" placement="right">
                <Tabs.List>
                    <Tabs.Tab value="edit">Edit</Tabs.Tab>
                    <Tabs.Tab value="operations">Operations</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="edit">
                    <Container>
                        <ProjectForm project={project} onProjectChange={onProjectChange} />
                    </Container>
                </Tabs.Panel>
                <Tabs.Panel value="operations">
                    <Container>
                        <ProjectOprations project={project} onProjectChange={onProjectChange} />
                    </Container>
                </Tabs.Panel>
            </Tabs>
        </>
    );
}
