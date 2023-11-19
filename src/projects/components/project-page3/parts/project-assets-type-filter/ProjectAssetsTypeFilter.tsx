import {SegmentedControl} from "@mantine/core";
import {useEffect, useState} from "react";
import {Asset} from "../../../../../assets/entities/Assets.ts";

type ProjectAssetsTypeFilterProps = {
    value: string;
    onChange: (arg0: string) => void;
    assetList: { asset: Asset, selected: boolean }[];
}

export function ProjectAssetsTypeFilter({assetList, value, onChange}: ProjectAssetsTypeFilterProps) {
    const [assetTypes, setAssetTypes] = useState<{ label: string, value: string }[]>([{value: '', label: ''}]);
    useEffect(() => {
        const t = new Set<string>();
        t.add('all');
        assetList.forEach(a => t.add(a.asset.asset_type));
        setAssetTypes([...t.values()].map(a => {
            return {label: a.toUpperCase(), value: a}
        }));

    }, [assetList]);

    return (
        <>
            <SegmentedControl mt={'sm'} size="md" radius="xl" data={assetTypes} value={value} onChange={onChange}/>
        </>
    );
}
