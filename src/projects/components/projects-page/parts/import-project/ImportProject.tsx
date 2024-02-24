import { Anchor, Button, Container, Group, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import useAxios from "axios-hooks";
import { useContext } from "react";
import { SettingsContext } from "@/core/settings/settingsContext";

export function ImportProject() {
    const { settings } = useContext(SettingsContext);
    const [{ loading, error }, fetchProject] = useAxios({
        url: `${settings.localBackend}/downloader/fetch`,
        method: 'post',
    }, { manual: true })
    const form = useForm({
        initialValues: {
            urls: '',
        },
        validate: {
            urls: (value) => (value.length < 2 ? 'Too short name' : null),
        },
    });
    const onFetch = () => {
        const urls = form.values.urls.split('\n');
        fetchProject({
            data: {
                url: urls.join(',')
            }
        }).then(({ data }) => {
            console.log(data);
        })
    }
    return (
        <>
            <Container>
                <h1>Import Project</h1>
                <form onSubmit={form.onSubmit(onFetch)}>
                    <Textarea
                        placeholder={'https://www.thingiverse.com/thing:2631794\nthing:4739346'}
                        mb="sm"
                        label="Thingiverse urls"
                        {...form.getInputProps('urls')}
                    />
                    <Text>Check out <Anchor href="https://github.com/Maker-Management-Platform/mmp-companion">MMP Companion</Anchor> to import from more platforms.</Text>
                    <Group justify="flex-end" mt="md">
                        <Button type="submit" loading={loading}>Submit</Button>
                    </Group>
                </form>
            </Container>
        </>
    );
}
