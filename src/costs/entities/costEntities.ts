interface CostType {
    name: string
    group: string
    costPerUnit: number
    units: number
    markup: number
    isTime: boolean
    assetId: string | null
}

interface CostInstance extends CostType {
    cost: number
    value: number
}

interface ProjectCosts {
    name: string
    description: string
    projectUuid: string
    costs: Array<CostInstance>
    globalMarkup: number
    totalCost: number
    totalValue: number
    totalHours: number
    producedUnits: number
    valuePerUnit: number
    costPerUnit: number
}
