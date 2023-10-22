import { ObjectId } from 'mongodb'

export interface FarmProductPrice {
    num: number
    currency: string
    currency_symbol: string
}

export interface FarmProductUnit {
    num: number
    description: string
}

export type FarmProductQuantity = 'in_stock' | 'low_stock' | 'out_of_stock'

export type FarmProductTag = 'hot' | 'new'

export interface FarmProduct {
    _id: ObjectId
    farm_id: ObjectId
    name: string
    price: FarmProductPrice
    sale_price: FarmProductPrice | null
    unit: FarmProductUnit
    tags: FarmProductTag[]
    quantity: FarmProductQuantity
}

export type ParsedFarmProduct = Omit<FarmProduct, '_id' | 'farm_id'> & {
    _id: string
    farm_id: string
}
