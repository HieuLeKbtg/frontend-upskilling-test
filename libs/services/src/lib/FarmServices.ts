import { APIConfig, Farm, FarmProduct, ParsedFarm } from '@libs/types'
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
    landingPageFarmsPageSize: 10,
    numPromotionalProductsSectionParam: 'promo_num',
    numPromotionalProductsSectionSize: 4,
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

    public async genFarmById(id: string): Promise<Farm | null> {
        const farmsColl = await this.genFarmsCollection()
        return farmsColl.findOne({
            _id: new ObjectId(id)
        })
    }

    public async genProductsForFarm(farmId: string): Promise<FarmProduct[]> {
        const farmProductsColl = await this.genFarmProductsCollection()
        return farmProductsColl
            .find({ farm_id: new ObjectId(farmId) })
            .toArray()
    }

    public async genPromotionalFarmProducts(
        urlParams: URLSearchParams
    ): Promise<FarmProduct[]> {
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
        return farmProductsColl
            .find({ $or: tagFilters })
            .skip(skip)
            .limit(pageSize)
            .toArray()
    }

    private async genFarmsCollection(): Promise<Collection<Farm>> {
        return (await this.mongoClient).db().collection<Farm>('farms')
    }

    private async genFarmProductsCollection(): Promise<
        Collection<FarmProduct>
    > {
        return (await this.mongoClient).db().collection<FarmProduct>('products')
    }
}

export const farmServices: FarmServices = new FarmServices()
