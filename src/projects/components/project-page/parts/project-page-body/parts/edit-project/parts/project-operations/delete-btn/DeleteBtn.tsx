import { ConfirmDialog } from "@/core/dialogs/confirm-dialog/ConfirmDialog";
import { SettingsContext } from "@/core/utils/settingsContext";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import useAxios from "axios-hooks";
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DeleteBtnProps {
    projectUuid: string;
}

export function DeleteBtn({ projectUuid }: DeleteBtnProps) {
    const navigate = useNavigate();
    const { local_backend } = useContext(SettingsContext);
    const [isOpen, setIsOpen] = useState(false);
    const [{ loading }, doDelete] = useAxios(
        {
            url: `${local_backend}/projects/${projectUuid}/delete`,
            method: 'post',
        }, { manual: true })

    const onOk = useCallback(() => {
        setIsOpen(false);
        doDelete()
            .then(({ data }) => {
                console.log(data);
                notifications.show({
                    title: 'Great Success!',
                    message: 'Project deleted',
                    color: 'indigo',
                })

                navigate(`/projects?tab=list`)
            })
            .catch((e) => {
                console.log(e)
            });
    }, [doDelete])

    return (<>
        <Button color="red" onClick={() => setIsOpen(true)} loading={loading}>Delete Project</Button>
        <ConfirmDialog opened={isOpen} onOk={onOk} onCancel={() => setIsOpen(false)} />
    </>
    )
}