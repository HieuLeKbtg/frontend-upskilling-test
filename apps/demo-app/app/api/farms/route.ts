import { APIFarmDataService, connectToMongoClient } from '@libs/farm-api'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const url = new URL(request.url)
    const urlParams = url.searchParams

    const mongoClient = await connectToMongoClient
    const apiService = new APIFarmDataService(mongoClient)
    const farms = await apiService.genFarms(urlParams)
    return NextResponse.json(farms)
}
