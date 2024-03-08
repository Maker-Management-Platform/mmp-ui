import { Asset } from "@/assets/entities/Assets";
import { Grid, Group, Input, ScrollArea, Tabs } from "@mantine/core";
import dayjs from 'dayjs'
import { useEffect, useState } from "react";

type AssetDetailsProps = {
    asset: Asset;
}


export function AssetDetails({ asset }: AssetDetailsProps) {
    const [tab, setTab] = useState<string | null>('file')
    const [propFilter, setPropFilter] = useState("")

    useEffect(() => {
        if (asset && Object.keys(asset.properties).length > 0) {
            setTab('properties')
        } else {
            setTab('file')
        }
    }, [asset])
    const formatBytes = (bytes: number, decimals: number) => {
        if (bytes == 0) return '0 Bytes';
        const k = 1024,
            dm = decimals || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    return (
        <Tabs value={tab} onChange={setTab}>
            <Tabs.List>
                {asset && Object.keys(asset.properties).length > 0 && <Tabs.Tab value="properties">
                    Properties
                </Tabs.Tab>}
                <Tabs.Tab value="file">
                    File
                </Tabs.Tab>
            </Tabs.List>

            {asset && Object.keys(asset.properties).length > 0 && <Tabs.Panel value="properties">
                <Input mt='xs' placeholder="Filter" value={propFilter} onChange={(e) => setPropFilter(e.target.value)} />
                <ScrollArea.Autosize mah={800} mx="auto">
                    {Object.keys(asset.properties).filter(k => k.includes(propFilter)).map((k: any) =>
                        <Group grow justify="center" mt='xs' key={k}><Input disabled value={k} /><Input disabled value={asset.properties[k]} /></Group>
                    )}
                </ScrollArea.Autosize>

            </Tabs.Panel>}

            <Tabs.Panel value="file">
                <Grid mt='sm'>
                    {asset.mod_time && <Grid.Col span={{ base: 12, xs: 6 }}>
                        <Input.Wrapper label="Last Modified">
                            <Input disabled value={dayjs(asset.mod_time).toString()} />
                        </Input.Wrapper>
                    </Grid.Col>}
                    {asset.size && <Grid.Col span={{ base: 12, xs: 6 }}>
                        <Input.Wrapper label="Size">
                            <Input disabled value={formatBytes(asset.size, 2)} />
                        </Input.Wrapper>
                    </Grid.Col>}
                    {asset.extension && <Grid.Col span={{ base: 12, xs: 6 }}>
                        <Input.Wrapper label="Extension">
                            <Input disabled value={asset.extension} />
                        </Input.Wrapper>
                    </Grid.Col>}
                    {asset.mime_type && <Grid.Col span={{ base: 12, xs: 6 }}>
                        <Input.Wrapper label="Mime type">
                            <Input disabled value={asset.mime_type} />
                        </Input.Wrapper>
                    </Grid.Col>}
                </Grid>
            </Tabs.Panel>
        </Tabs>
    )

}