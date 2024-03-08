export type AssetType = 'image' | 'model' | 'file' | 'slice'

export interface Asset {
    id: string
    name: string
    origin: string
    project_uuid: string
    path: string
    mod_time: string
    size: number
    asset_type: AssetType
    extension: string
    mime_type: string
    image_id: string
    properties: any
}
