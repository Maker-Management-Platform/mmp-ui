export interface Printer {
    uuid: string
    name: string
    type: string
    address: string
    status: string
    state: string
    version: string
}

export interface Thermal {
    temperature?: number
    target?: number
}
export interface Job {
    progress: number
}

export const printerTypes = new Map<string, any>([["klipper", { type: 'klipper', name: 'Klipper', logo: 'images/klipper-logo.png' }]])