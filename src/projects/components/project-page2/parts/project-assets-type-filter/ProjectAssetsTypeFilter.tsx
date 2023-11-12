import {SegmentedControl} from "@mantine/core";
import {useEffect, useState} from "react";
import {Asset} from "../../../../../assets/entities/Assets.ts";

type ProjectAssetsTypeFilterProps = {
    value: string;
    onChange: (arg0: string) => void;
    assets: Asset[];

}

export function ProjectAssetsTypeFilter({assets, value, onChange}: ProjectAssetsTypeFilterProps) {
    const [assetTypes, setAssetTypes] = useState<{ label: string, value: string }[]>([{value: '', label: ''}]);
    useEffect(() => {
        if (!assets) return;
        const t = new Set<string>();
        t.add('all');
        assets.forEach(a => t.add(a.asset_type));
        setAssetTypes([...t.values()].map(a => {
            return {label: a.toUpperCase(), value: a}
        }));
    }, [assets]);

    return (
        <SegmentedControl size="md" radius="xl" data={assetTypes} value={value || 'all'} onChange={onChange}/>
    );
}
