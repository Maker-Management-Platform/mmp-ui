import { Asset } from "../../assets/entities/Assets.ts";

export interface PrintJob {
    uuid: string

    slices: Asset
    tags: Tag[]
}

export interface Tag {
    value: string
}