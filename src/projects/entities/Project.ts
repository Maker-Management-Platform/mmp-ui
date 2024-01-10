import { Asset } from "../../assets/entities/Assets.ts";

export interface Project {
    uuid: string
    name: string
    description: string
    path: string
    external_link: string
    tags: Tag[]
    default_image_id: string
    default_image_name: string
    initialized: boolean
    assets: Array<Asset>
}

export interface Tag {
    value: string
}