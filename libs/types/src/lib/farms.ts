import { ObjectId } from 'mongodb'

export type Farm = {
    _id: ObjectId
    name: string
    description: string
    tags: string[]
}

export type ParsedFarm = Omit<Farm, '_id'> & { _id: string }
