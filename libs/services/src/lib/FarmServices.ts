import {
    APIConfig,
    Farm,
    FarmProduct,
    ParsedFarm,
    ParsedFarmProduct
} from '@libs/types'
import { Collection, MongoClient, ObjectId } from 'mongodb'

import connectToMongoClient from './connectToMongo'

function deriveKeyValueMapFromSearchParams(
    searchParams: URLSearchParams
): Map<string, string> {
    const map = new Map<string, string>()

    for (const [key, value] of searchParams.entries()) {
        map.set(key, value)
    }
    return map
}

function deriveQuerySkipFromURLParam(
    pageNumParam: string | undefined,
    pageSize: number
): number {
    const pageNum = Math.max(Number(pageNumParam ?? null), 1)
    const skip = (pageNum - 1) * pageSize
    return skip
}

const API_CONFIG: APIConfig = {
    landingPageFarmsPageParam: 'page_num',
    landingPageFarmsPageSize: 15,
    numPromotionalProductsSectionParam: 'promo_num',
    numPromotionalProductsSectionSize: 5,
    promotionalProductTags: ['hot', 'new']
}

class FarmServices {
    private mongoClient: Promise<MongoClient>
    constructor() {
        this.mongoClient = this._ConnectMogoDb()
    }

    private async _ConnectMogoDb() {
        return connectToMongoClient
    }

    private async genFarmsCollection(): Promise<Collection<Farm>> {
        return (await this.mongoClient).db().collection<Farm>('farms')
    }

    private async genFarmProductsCollection(): Promise<
        Collection<FarmProduct>
    > {
        return (await this.mongoClient).db().collection<FarmProduct>('products')
    }

    public async genFarms(urlParams: URLSearchParams): Promise<ParsedFarm[]> {
        const queryParamsMap = deriveKeyValueMapFromSearchParams(urlParams)
        const pageSize = API_CONFIG.landingPageFarmsPageSize
        const skip = deriveQuerySkipFromURLParam(
            queryParamsMap.get(API_CONFIG.landingPageFarmsPageParam),
            pageSize
        )

        const farmsColl = await this.genFarmsCollection()
        const farmList = farmsColl.find().skip(skip).limit(pageSize).toArray()

        // default _id form mongoDB is object, we need to convert it to string
        const parsedFarmList = (await farmList).map((farm) => {
            return { ...farm, _id: farm._id.toString() }
        })

        return parsedFarmList
    }

    public async genFarmById(id: string): Promise<ParsedFarm | null> {
        const farmsColl = await this.genFarmsCollection()
        const farmById = await farmsColl.findOne({
            _id: new ObjectId(id)
        })
        return farmById ? { ...farmById, _id: farmById._id.toString() } : null
    }

    public async genProductsForFarm(
        farmId: string
    ): Promise<ParsedFarmProduct[]> {
        const farmProductsColl = await this.genFarmProductsCollection()
        const productsForFarm = farmProductsColl
            .find({ farm_id: new ObjectId(farmId) })
            .toArray()

        const parsedProductsForFarm = (await productsForFarm).map((product) => {
            return {
                ...product,
                _id: product._id.toString(),
                farm_id: product.farm_id.toString()
            }
        })

        return parsedProductsForFarm
    }

    public async genPromotionalFarmProducts(
        urlParams: URLSearchParams
    ): Promise<ParsedFarmProduct[]> {
        const queryParamsMap = deriveKeyValueMapFromSearchParams(urlParams)
        const pageSize = API_CONFIG.numPromotionalProductsSectionSize
        const skip = deriveQuerySkipFromURLParam(
            queryParamsMap.get(API_CONFIG.numPromotionalProductsSectionParam),
            pageSize
        )

        const farmProductsColl = await this.genFarmProductsCollection()
        const tagFilters = API_CONFIG.promotionalProductTags.map((tag) => ({
            tags: tag
        }))
        const promotionalFarmList = await farmProductsColl
            .find({ $or: tagFilters })
            .skip(skip)
            .limit(pageSize)
            .toArray()

        const parsedPromotionalFarmList = promotionalFarmList.map((item) => {
            return {
                ...item,
                _id: item._id.toString(),
                farm_id: item.farm_id.toString()
            }
        })

        return parsedPromotionalFarmList
    }
}

export const farmServices: FarmServices = new FarmServices()
