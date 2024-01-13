interface CostType {
    name: string
    group: string
    costPerUnit: number
    units: number
    isTime: boolean
    hasAsset: boolean
}

interface ProjectCosts {
    name: string
    projectUuid: string
    costs: Array<CostInstance>
}

interface CostInstance {
    type: string
    units: number
    isTime: boolean
    value: number
    assetId: string | null
}