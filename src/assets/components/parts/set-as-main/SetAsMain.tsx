import { Settings, SettingsContext } from "@/core/utils/settingsContext";
import { Menu, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconHeart } from "@tabler/icons-react";
import useAxios from "axios-hooks";
import { useCallback, useContext } from "react";

export type SetAsMainProps = {
    projectUuid: string;
    assetId?: string;
    onChange: () => void;
}

export function SetAsMain({ projectUuid, assetId, onChange }: SetAsMainProps) {
    const { local_backend } = useContext<Settings>(SettingsContext);
    const [{ }, callSetMainImage] = useAxios(
        {
            url: `${local_backend}/projects/${projectUuid}/image`,
            method: 'POST'
        },
        { manual: true }
    );
    const setMainImage = useCallback(() => {

        callSetMainImage({
            data: {
                uuid: projectUuid,
                default_image_id: assetId
            }
        })
            .then(({ data }) => {
                console.log(data);
                notifications.show({
                    title: 'Great Success!',
                    message: 'Project main image updated!',
                    color: 'indigo',
                })
                onChange()
            })
            .catch((e) => {
                console.log(e)
            });
    }, [projectUuid]);

    if (!assetId) return null;

    return (<Menu.Item onClick={setMainImage} leftSection={<IconHeart style={{ width: rem(14), height: rem(14) }} />}>
        Set as main image
    </Menu.Item>)
}