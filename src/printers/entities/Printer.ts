export interface Printer {
    uuid: string
    name: string
    type: string
    camera_url: string
    address: string
    status: string
    state: string
    version: string
    apiKey?: string
}

export interface Thermal {
    temperature?: number
    target?: number
}
export interface Job {
    progress: number
    message: string,
    fileName: string,
}

export const printerTypes = new Map<string, any>([["klipper", { type: 'klipper', name: 'Klipper', logo: 'images/klipper-logo.png' }], ["octoPrint", { type: 'octoPrint', name: 'op', logo: 'images/octoprint-logo.png' }]])


