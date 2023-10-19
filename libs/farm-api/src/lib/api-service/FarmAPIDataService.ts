import { Collection, MongoClient, ObjectId } from 'mongodb'

import { IAPIConfig } from '../types/IAPIConfig'
import { IFarm } from '../types/IFarm'
import { IFarmProduct } from '../types/IFarmProduct'

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

const API_CONFIG: IAPIConfig = {
    landingPageFarmsPageParam: 'page_num',
    landingPageFarmsPageSize: 10,
    numPromotionalProductsSectionParam: 'promo_num',
    numPromotionalProductsSectionSize: 4,
    promotionalProductTags: ['hot', 'new']
}

export class APIFarmDataService {
    constructor(protected mongoClient: MongoClient) {}

    public async genFarms(urlParams: URLSearchParams): Promise<IFarm[]> {
        const queryParamsMap = deriveKeyValueMapFromSearchParams(urlParams)
        const pageSize = API_CONFIG.landingPageFarmsPageSize
        const skip = deriveQuerySkipFromURLParam(
            queryParamsMap.get(API_CONFIG.landingPageFarmsPageParam),
            pageSize
        )

        const farmsColl = await this.genFarmsCollection()
        return farmsColl.find().skip(skip).limit(pageSize).toArray()
    }

    public async genFarmById(id: string): Promise<IFarm | null> {
        const farmsColl = await this.genFarmsCollection()
        return farmsColl.findOne({
            _id: new ObjectId(id)
        })
    }

    public async genProductsForFarm(farmId: string): Promise<IFarmProduct[]> {
        const farmProductsColl = await this.genFarmProductsCollection()
        return farmProductsColl
            .find({ farm_id: new ObjectId(farmId) })
            .toArray()
    }

    public async genPromotionalFarmProducts(
        urlParams: URLSearchParams
    ): Promise<IFarmProduct[]> {
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

    private async genFarmsCollection(): Promise<Collection<IFarm>> {
        return this.mongoClient.db().collection<IFarm>('farms')
    }

    private async genFarmProductsCollection(): Promise<
        Collection<IFarmProduct>
    > {
        return this.mongoClient.db().collection<IFarmProduct>('products')
    }
}
