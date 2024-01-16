import { SettingsContext } from "@/core/utils/settingsContext";
import { Project } from "@/projects/entities/Project";
import { ActionIcon, Autocomplete, Group, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconHomeMove } from "@tabler/icons-react";
import useAxios from "axios-hooks";
import { useContext, useState } from "react";
import { DeleteBtn } from "./delete-btn/DeleteBtn";

type ProjectOperationsProps = {
    project: Project;
    onProjectChange: (p: Project) => void;
}

export function ProjectOprations({ project, onProjectChange }: ProjectOperationsProps) {
    const { local_backend } = useContext(SettingsContext);

    const [path, setPath] = useState(project.path);
    const [{ loading }, moveProject] = useAxios({
        method: 'post',
    }, { manual: true })
    const [{ data: paths, loading: lPaths, error: ePaths }] = useAxios(
        {
            url: `${local_backend}/system/paths`
        }
    )
    const onMoveHandler = () => {
        moveProject({
            url: `${local_backend}/projects/${project.uuid}/move`,
            data: {
                uuid: project.uuid,
                path: path
            }
        }).then(({ data }) => {
            console.log(data);
            setPath(data.path)
            notifications.show({
                title: 'Great Success!',
                message: 'Project moved',
                color: 'indigo',
            })
        })
            .catch((e) => {
                console.log(e)
            });
    }
    return (<>
        <Autocomplete
            label="Move to"
            data={paths}
            value={path}
            onChange={setPath}
            disabled={lPaths}
            rightSection={
                <ActionIcon size={32} color={'blue'} variant="filled" onClick={onMoveHandler} loading={loading}>
                    <IconHomeMove style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                </ActionIcon>
            }
        />
        <Group mt='md' justify="flex-end">
            <DeleteBtn projectUuid={project.uuid} />
        </Group>

    </>)
}