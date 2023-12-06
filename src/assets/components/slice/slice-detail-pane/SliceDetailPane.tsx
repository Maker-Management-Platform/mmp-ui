import {Grid, Input } from "@mantine/core";
import { Project } from "@/projects/entities/Project.ts";
import { Asset } from "@/assets/entities/Assets.ts";

type SliceDetailPaneProps = {
    project: Project;
    asset: Asset;
}

export function SliceDetailPane({ asset }: SliceDetailPaneProps) {
    console.log(asset.name);
    return (
        <>
            <Grid mt='sm'>
                <Grid.Col span={{ base: 12, xs: 6 }}>
                    {asset.slice?.duration &&
                        <Input.Wrapper label="Duration">
                            <Input disabled value={asset.slice?.duration} />
                        </Input.Wrapper>
                    }
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6 }}>
                    {asset.slice?.layer_count &&
                        <Input.Wrapper label="Layer count">
                            <Input disabled value={asset.slice?.layer_count} />
                        </Input.Wrapper>
                    }
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6 }}>
                    {asset.slice?.cost &&
                        <Input.Wrapper label="Cost">
                            <Input disabled value={asset.slice?.cost} />
                        </Input.Wrapper>
                    }
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6 }}>
                    {asset.slice?.filament.length &&
                        <Input.Wrapper label="Filament Length">
                            <Input disabled value={asset.slice?.filament.length} />
                        </Input.Wrapper>
                    }
                </Grid.Col>
            </Grid>
        </>
    );
}
