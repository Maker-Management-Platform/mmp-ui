import { useContext, useEffect, useRef, useState } from "react";
import { Asset } from "../../../entities/Assets.ts";
import { Stack } from "@mantine/core";
import { SettingsContext } from "@/core/settings/settingsContext.ts";
import { Viewer3D, createViewer3D } from './Viewer3D.ts';

type ModelProps = {
    color: string,
    model: Asset,
    projectUuid: string
}

type ModelDetailPaneProps = {
    models: Asset[],
    projectUuid: string,
    onClose: () => void
}

export function ModelDetailPane({ models, projectUuid, onClose }: ModelDetailPaneProps) {
    const parent = useRef<HTMLElement>();
    const { settings } = useContext(SettingsContext);
    const [viewer3D, setViewer3D] = useState<Viewer3D>();
    
    useEffect(()=>{
        if(!parent.current) return;
        if(!viewer3D) return;
        viewer3D.setModels(models);
    }, [models, viewer3D]);

    useEffect(() => {
        if(!parent.current) return;

        let viewer = createViewer3D(parent.current, settings.localBackend);
        setViewer3D(viewer);

        return () => {
            viewer.destroy();
        }
    }, [])


    return (
        <Stack
            h={600}
            bg="var(--mantine-color-body)"
            justify="flex-start"
            ref={parent}
        />
    );
}

function Ground() {
    const gridConfig = {
        cellSize: 0.5,
        cellThickness: 0.5,
        cellColor: '#6f6f6f',
        sectionSize: 3,
        sectionThickness: 1,
        sectionColor: '#9d4b4b',
        fadeDistance: 30,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true
    }
    return <Grid position={[0, 0, 0]} args={[10.5, 10.5]} {...gridConfig} />
}