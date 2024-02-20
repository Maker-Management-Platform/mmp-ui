import { SettingsContext } from "@/core/settings/settingsContext";
import { TempFile } from "@/tempfiles/entities/TempFile";
import { IconTrash, IconFileArrowRight } from "@tabler/icons-react";
import { ActionIcon, Table, Group, Center, Skeleton } from "@mantine/core";
import useAxios from "axios-hooks";
import { useContext, useEffect, useRef, useState } from "react";
import { ProjectSelect } from "./parts/project-select/ProjectSelect";
import { Project } from "@/projects/entities/Project";
import { Header } from "@/core/header/Header";
import { notifications } from "@mantine/notifications";

export function TempFiles() {
    const reload = useRef(Math.floor(1000 + Math.random() * 9000));
    const { settings } = useContext(SettingsContext);
    const [tempFiles, setTempFiles] = useState<TempFile[]>([]);
    const [actionLoading, setActionLoading] = useState(false);
    const [{ }, callSendToProject] = useAxios({ url: `${settings.localBackend}/tempfiles/xxx`, method: 'post' }, { manual: true })
    const [{ }, callDeleteTemp] = useAxios({ url: `${settings.localBackend}/tempfiles/xxx/delete`, method: 'post' }, { manual: true })
    const [{ data, loading, error }] = useAxios(
        `${settings.localBackend}/tempfiles?_=${reload.current}`
    );
    useEffect(() => {
        setTempFiles(data);
    }, [data]);

    const [{ data: projects, loading: pLoading, error: pError }] = useAxios<Project[]>(
        `${settings.localBackend}/projects/list?_=${reload.current}`
    );

    const setProjectUUID = (i: number, p: Project) => {
        const copy = [...tempFiles]
        copy[i].project_uuid = p.uuid
        setTempFiles(copy)
    }

    const sendToProject = (i: number) => {
        if (!tempFiles[i].project_uuid) return;
        setActionLoading((s)=>!s)
        callSendToProject({
            url: `${settings.localBackend}/tempfiles/${tempFiles[i].uuid}`,
            data: tempFiles[i]
        })
            .then(({ data }) => {
                console.log(data);
                const copy = [...tempFiles]
                copy.splice(i, 1)
                setTempFiles(copy)
                notifications.show({
                    title: 'Great Success!',
                    message: 'Tempory moved do project!',
                    color: 'indigo',
                })
                setActionLoading((s)=>!s)
            })
            .catch((e) => {
                console.log(e)
                setActionLoading((s)=>!s)
            });

    }

    const deleteTemp = (i: number) => {
        setActionLoading((s)=>!s)
        callDeleteTemp({
            url: `${settings.localBackend}/tempfiles/${tempFiles[i].uuid}/delete`
        })
            .then(({ data }) => {
                console.log(data);
                const copy = [...tempFiles]
                copy.splice(i, 1)
                setTempFiles(copy)
                notifications.show({
                    title: 'Great Success!',
                    message: 'Tempory sucessfuly deleted!',
                    color: 'indigo',
                })
                setActionLoading((s)=>!s)
            })
            .catch((e) => {
                console.log(e)
                setActionLoading((s)=>!s)
            });
    }

    return (<>
        <Header imagePath={'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2000&h=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Modification Date</Table.Th>
                    <Table.Th>Project</Table.Th>
                    <Table.Th><Center>Actions</Center></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {tempFiles && tempFiles.map((t, i) => <Table.Tr key={t.uuid}>
                    <Table.Td>{t.name}</Table.Td>
                    <Table.Td>{t.project_uuid}</Table.Td>
                    <Table.Td>
                        <ProjectSelect boosted={t.matches} projects={projects} onChange={(p) => { setProjectUUID(i, p) }} loading={pLoading} value={t.project_uuid} />
                    </Table.Td>
                    <Table.Td>
                        <Group justify="center">
                            <ActionIcon variant="filled" aria-label="Send to project" onClick={() => sendToProject(i)} loading={actionLoading}>
                                <IconFileArrowRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                            <ActionIcon variant="filled" color='red' aria-label="Delete" onClick={() => deleteTemp(i)} loading={actionLoading}>
                                <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                    </Table.Td>
                </Table.Tr>)}
                {loading && Array.from(Array(10))
                    .map((_, i) => <Table.Tr key={i}>
                        <Table.Td><Skeleton height={30} radius="xl" /></Table.Td>
                        <Table.Td><Skeleton height={30} radius="xl" /></Table.Td>
                        <Table.Td><Skeleton height={30} radius="xl" /></Table.Td>
                        <Table.Td><Skeleton height={30} radius="xl" /></Table.Td>
                    </Table.Tr>)}
            </Table.Tbody>
        </Table>
    </>)
}