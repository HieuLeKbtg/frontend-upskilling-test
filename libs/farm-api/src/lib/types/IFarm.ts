import { ObjectId } from 'mongodb';

export interface IFarm {
    _id: ObjectId;
    name: string;
    description: string;
    tags: string[];
}