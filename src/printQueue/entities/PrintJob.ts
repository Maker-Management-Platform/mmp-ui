import { Asset } from "../../assets/entities/Assets.ts";

export interface PrintJob {
    uuid: string
    slice: Asset
    tags: Tag[]
    position: number
}

export interface Tag {
    value: string
}