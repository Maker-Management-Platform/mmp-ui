export type AssetType = 'image' | 'model' | 'file' | 'slice'

export interface Asset {
    id: string
    name: string
    generated: boolean
    project_uuid: string
    path: string
    mod_time: string
    size: number
    asset_type: AssetType
    extension: string
    mime_type: string
    model?: Model
    project_image?: ProjectImage
    project_file?: ProjectFile
    slice?: Slice
}

export interface Model {
    image_id: string
}

export interface ProjectImage {
}

export interface ProjectFile {
}

export interface Slice {
    image_id: string
    slicer: string
    filament: Filament
    cost: number
    layer_count: number
    duration: string
}

export interface Image {
}

export interface Filament {
    length: number
    mass: number
    weight: number
}
