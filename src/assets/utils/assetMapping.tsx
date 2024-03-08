import { IconPhoto, IconFile3d, IconLayersIntersect, IconFile } from "@tabler/icons-react";

export const supportedAssetTypes: { name: string, label: string, icon: JSX.Element }[] = [
    { name: "model", label: "Models", icon: <IconFile3d /> },
    { name: "slice", label: "Slices", icon: <IconLayersIntersect /> },
    { name: "image", label: "Images", icon: <IconPhoto /> },
    { name: "file", label: "Files", icon: <IconFile /> },
]