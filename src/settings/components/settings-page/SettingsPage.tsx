import useAxios from "axios-hooks";
import { useContext, useEffect, useRef } from "react";
import { SettingsContext } from "@/core/utils/settingsContext";
import { Button, Container, Fieldset, Group } from "@mantine/core";
import { FormProvider, useForm } from "./context";
import { Core } from "./parts/Core";
import { Library } from "./parts/Library";
import { Server } from "./parts/Server";
import { Render } from "./parts/Render";
import { Integrations } from "./parts/Integrations";
import { Form } from "react-router-dom";
import { AgentSettings } from "@/settings/entities/AgentSettings";
import { notifications } from "@mantine/notifications";

export function SettingsPage() {
    const reload = useRef(Math.floor(1000 + Math.random() * 9000));
    const { local_backend } = useContext(SettingsContext);
    const [{ data, loading: cLoading, error }] = useAxios({ url: `${local_backend}/system/settings?_=${reload.current}` })

    const [{ loading: sLoading }, executeSave] = useAxios({
        url: `${local_backend}/system/settings`,
        method: 'POST'
    }, { manual: true })

    const form = useForm({
        initialValues: {
            "core": {
                "log": {
                    "enable_file": false,
                    "path": ""
                }
            },
            "server": {
                "port": 0
            },
            "library": {
                "path": "",
                "blacklist": [],
                "ignore_dot_files": false
            },
            "render": {
                "max_workers": 0,
                "model_color": "",
                "background_color": ""
            },
            "integrations": {
                "thingiverse": {
                    "token": ""
                }
            }
        }
    });

    useEffect(() => {
        if (data) {
            form.setInitialValues(data);
            form.setValues(data);
        }
    }, [data])

    const onSave = (settings: AgentSettings) => {
        executeSave({
            data: settings
        })
            .then(({ data }) => {
                notifications.show({
                    title: 'Great Success!',
                    message: 'Settings updated',
                    color: 'indigo',
                })
            })
            .catch((e) => {
                console.log(e)
            });
    };

    return (
        <Container>
            <FormProvider form={form}>
                <Form onSubmit={form.onSubmit(onSave)}>
                    <Server />
                    <Core />
                    <Library />
                    <Render />
                    <Integrations />
                    <Fieldset legend="Commit">
                        <Group justify="flex-end">
                            <Button type="submit" loading={sLoading || cLoading} color="red">Save</Button>
                            <Button type="reset" onClick={form.reset}>Reset</Button>
                        </Group>
                    </Fieldset>
                </Form>
            </FormProvider>
        </Container>
    )
}