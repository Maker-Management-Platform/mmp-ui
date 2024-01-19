import useAxios from "axios-hooks";
import { useContext, useEffect, useRef } from "react";
import { SettingsContext } from "@/core/utils/settingsContext";
import { Container } from "@mantine/core";
import { Header } from "@/core/header/Header";
import { FormProvider, useForm } from "./context";
import { Core } from "./parts/Core";
import { Library } from "./parts/Library";

export function SettingsPage() {
    const reload = useRef(Math.floor(1000 + Math.random() * 9000));
    const { local_backend } = useContext(SettingsContext);
    const [{ data, loading: cLoading, error }] = useAxios({ url: `${local_backend}/system/settings?_=${reload.current}` })

    const [{ loading: sLoading }, executeSave] = useAxios({
        url: `${local_backend}/system/settings`,
        method: 'POST'
    }, { manual: true })

    const form = useForm({});

    useEffect(() => {
        if (data) {
            form.setValues(data);
        }
    }, [data])

    return (<>
        <Header imagePath={'https://images.unsplash.com/photo-1611117775350-ac3950990985?q=80&w=2000&h=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
        <Container>
            <FormProvider form={form}>
                <Core />
                <Library />
            </FormProvider>
        </Container>
    </>)
}