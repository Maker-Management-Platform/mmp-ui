import {Alert, Grid, Input} from "@mantine/core";
import {Project} from "../../../projects/entities/Project.ts";
import {Asset} from "../../entities/Assets.ts";

type SliceDetailPaneProps = {
    project: Project;
    asset: Asset;
    onClose: () => void;
}

export function SliceDetailPane({asset, onClose}: SliceDetailPaneProps) {
    console.log(asset.name);
    return (
        <>
            <Alert variant="filled" color="gray" withCloseButton title={asset.name} onClose={onClose}>
                <Grid mt='sm'>
                    <Grid.Col span={{base: 12, xs: 6}}>
                        {asset.slice?.duration &&
                            <Input.Wrapper label="Duration">
                                <Input disabled value={asset.slice?.duration}/>
                            </Input.Wrapper>
                        }
                    </Grid.Col>
                    <Grid.Col span={{base: 12, xs: 6}}>
                        {asset.slice?.layer_count &&
                            <Input.Wrapper label="Layer count">
                                <Input disabled value={asset.slice?.layer_count}/>
                            </Input.Wrapper>
                        }
                    </Grid.Col>
                    <Grid.Col span={{base: 12, xs: 6}}>
                        {asset.slice?.cost &&
                            <Input.Wrapper label="Cost">
                                <Input disabled value={asset.slice?.cost}/>
                            </Input.Wrapper>
                        }
                    </Grid.Col>
                    <Grid.Col span={{base: 12, xs: 6}}>
                        {asset.slice?.filament.length &&
                            <Input.Wrapper label="Filament Length">
                                <Input disabled value={asset.slice?.filament.length}/>
                            </Input.Wrapper>
                        }
                    </Grid.Col>
                </Grid>

            </Alert>
        </>
    );
}
