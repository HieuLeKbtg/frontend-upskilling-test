import { TFarmProductTag } from './IFarmProduct';

export interface IAPIConfig {
    landingPageFarmsPageParam: string;
    landingPageFarmsPageSize: number,
    numPromotionalProductsSectionParam: string;
    numPromotionalProductsSectionSize: number;
    promotionalProductTags: TFarmProductTag[];
}