import { Card } from '@libs/components'
import { farmServices } from '@libs/services'

import { StyledHomepage } from './_styled/homepage.styled'

type HomepageProps = {
    searchParams: Record<string, string>
}

const Homepage = async (props: HomepageProps) => {
    const { searchParams } = props

    const farmList = await farmServices.genFarms(
        new URLSearchParams(searchParams)
    )

    return (
        <StyledHomepage>
            {farmList.map((farm, index) => {
                return <Card key={index} data={farm} />
            })}
        </StyledHomepage>
    )
}

export default Homepage
