import { Asset } from "../entities/Assets";

export type AssetCardProps = {
    projectUuid: string;
    asset: Asset;
    selected: boolean;
    onSelectChange: (arg0: boolean) => void;
    view3d?: boolean,
    onView3dChange?: (arg0: boolean) => void;
    onDelete: (projectUuid: string, sha1: string) => void;
}