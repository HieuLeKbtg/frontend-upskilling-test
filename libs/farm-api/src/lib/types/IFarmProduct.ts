import { ObjectId } from 'mongodb';

export interface IFarmProductPrice {
    num: number;
    currency: string;
    currency_symbol: string;
}

export interface IFarmProductUnit {
    num: number;
    description: string;
}

export type TFarmProductQuantity = 'in_stock' | 'low_stock' | 'out_of_stock';

export type TFarmProductTag = 'hot' | 'new';

export interface IFarmProduct {
    _id: ObjectId;
    farm_id: ObjectId;
    name: string;
    price: IFarmProductPrice;
    sale_price: IFarmProductPrice | null;
    unit: IFarmProductUnit;
    tags: TFarmProductTag[];
    quantity: TFarmProductQuantity;
}