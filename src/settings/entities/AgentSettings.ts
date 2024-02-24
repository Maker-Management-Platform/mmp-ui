export interface AgentSettings {
    core: Core
    server: Server
    library: Library
    render: Render
    integrations: Integrations
}

export interface Core {
    log: Log
}

export interface Log {
    enable_file: boolean
    path: string
}

export interface Server {
    port: number
}

export interface Library {
    path: string
    blacklist: string[]
    ignore_dot_files: boolean
}

export interface Render {
    max_workers: number
    model_color: string
    background_color: string
}

export interface Integrations {
    thingiverse: Thingiverse
}

export interface Thingiverse {
    token: string
}