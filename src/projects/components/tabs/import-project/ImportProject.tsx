import {Button, Container, Group, Textarea} from "@mantine/core";
import {useForm} from "@mantine/form";
import useAxios from "axios-hooks";
import { useContext } from "react";
import { SettingsContext } from "../../../../core/utils/settingsContext";

export function ImportProject() {
    const {local_backend} = useContext(SettingsContext);
    const [{loading, error}, fetchProject] = useAxios({
        url:  `${local_backend}/downloader/fetch`,
        method: 'post',
    }, {manual: true})
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
        }).then(({data}) => {
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
                        label="Urls"
                        {...form.getInputProps('urls')}
                    />
                    <Group justify="flex-end" mt="md">
                        <Button type="submit" loading={loading}>Submit</Button>
                    </Group>
                </form>
            </Container>
        </>
    );
}
