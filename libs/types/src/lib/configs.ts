import { FarmProductTag } from './product'

export interface APIConfig {
    landingPageFarmsPageParam: string
    landingPageFarmsPageSize: number
    numPromotionalProductsSectionParam: string
    numPromotionalProductsSectionSize: number
    promotionalProductTags: FarmProductTag[]
}
