export type AssetType = 'image' | 'model' | 'file' | 'slice'

export interface Asset {
    sha1: string
    name: string
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
    image_sha1: string
}

export interface ProjectImage {
}

export interface ProjectFile {
    sha1: string
    name: string
    project_uuid: string
    path: string
    asset_type: string
    extension: string
    mime_type: string
}

export interface Slice {
    image_sha1: string
    slicer: string
    filament: Filament
    cost: number
    layer_count: number
    duration: string
}

export interface Image {
    sha1: string
    name: string
    project_uuid: string
    path: string
    asset_type: string
    extension: string
    mime_type: string
    model: any
    project_image: ProjectImage2
    project_file: any
    slice: any
}

export interface ProjectImage2 {
}

export interface Filament {
    length: number
    mass: number
    weight: number
}
