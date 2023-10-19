import { Card } from '@libs/components'
import { farmServices } from '@libs/services'
import { Farm } from '@libs/types'

import { StyledFarmGrid, StyledHomepage } from './_styled/homepage.styled'

type HomepageProps = {
    searchParams: Record<string, string>
}

const Homepage = async (props: HomepageProps) => {
    const { searchParams } = props

    let farmList: Farm[] = await farmServices.genFarms(
        new URLSearchParams(searchParams)
    )

    // default _id form mongoDB is object, we need to convert it to string
    farmList = farmList.map((farm) => {
        return { ...farm, _id: farm._id.toString() }
    })

    return (
        <StyledHomepage>
            <StyledFarmGrid>
                {farmList.map((farm, index) => {
                    return <Card key={index} data={farm} />
                })}
            </StyledFarmGrid>
        </StyledHomepage>
    )
}

export default Homepage
