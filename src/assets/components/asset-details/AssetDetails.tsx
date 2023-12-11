import { Asset, AssetType } from "@/assets/entities/Assets";
import { Grid, Input, Tabs } from "@mantine/core";
import { SliceDetailPane } from "../slice/slice-detail-pane/SliceDetailPane";
import * as dayjs from 'dayjs'

type AssetDetailsProps = {
    asset: Asset;
}

const assetTypeMap: Map<AssetType, (asset: Asset) => JSX.Element> = new Map([
    ["slice", (asset: Asset) => <SliceDetailPane asset={asset} />],
]);

export function AssetDetails({ asset }: AssetDetailsProps) {
    const a = assetTypeMap.get(asset.asset_type);
    const formatBytes = (bytes: number, decimals: number) => {
        if (bytes == 0) return '0 Bytes';
        var k = 1024,
            dm = decimals || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    return (<>
        <Tabs value={a ? 'details' : 'file'}>
            <Tabs.List>
                {a && <Tabs.Tab value="details">
                    Details
                </Tabs.Tab>}
                <Tabs.Tab value="file">
                    File
                </Tabs.Tab>
            </Tabs.List>

            {a && <Tabs.Panel value="details">
                {a(asset)}
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
    </>)

}