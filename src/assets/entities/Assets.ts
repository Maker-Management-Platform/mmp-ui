
export interface Asset {
    id: string
    name: string
    label: string
    origin: string
    project_uuid: string
    path: string
    mod_time: string
    size: number
    asset_type: string
    extension: string
    mime_type: string
    image_id: string
    properties: any
}

export interface AssetType {
    name: string
    label: string
    extensions: string[]
    order: number
}