import { AssetCardProps } from "../components/AssetCardProps";
import { FileCard } from "../components/file-card/FileCard";
import { ImageCard } from "../components/image-card/ImageCard";
import { ModelCard } from "../components/model/model-card/ModelCard";
import { SliceCard } from "../components/slice/slice-card/SliceCard";
import { IconPhoto, IconFile3d, IconLayersIntersect, IconFile } from "@tabler/icons-react";

export const supportedAssetTypes: { name: string, label: string, icon: JSX.Element }[] = [
    { name: "model", label: "Models", icon: <IconFile3d /> },
    { name: "slice", label: "Slices", icon: <IconLayersIntersect /> },
    { name: "image", label: "Images", icon: <IconPhoto /> },
    { name: "file", label: "Files", icon: <IconFile /> },
]
export const assetTypeMap: Map<string, (props: AssetCardProps) => JSX.Element> = new Map([
    ["image", (props: AssetCardProps) => <ImageCard {...props} />],
    ["model", (props: AssetCardProps) => <ModelCard {...props} />],
    ["slice", (props: AssetCardProps) => <SliceCard {...props} />],
    ["file", (props: AssetCardProps) => <FileCard {...props} />],
    ["other", (props: AssetCardProps) => <FileCard {...props} />],
]);