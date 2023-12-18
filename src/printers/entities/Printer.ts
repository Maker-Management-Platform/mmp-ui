export interface Printer {
    uuid: string
    name: string
    type: string
    address: string
    status: string
    state: string
    version: string
}

export const printerTypes = new Map<string, any>([["klipper", { type: 'klipper', name: 'Klipper', logo: 'images/klipper-logo.png' }]])