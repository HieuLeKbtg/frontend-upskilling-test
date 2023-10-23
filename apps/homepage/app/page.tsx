import { CardFarm, CardProduct } from '@libs/components'
import { farmServices } from '@libs/services'

import {
    StyledHeading,
    StyledList,
    StyledListWithPromotionalProduct
} from './_styled/homepage.styled'

type HomepageProps = {
    searchParams: Record<string, string>
}

const Homepage = async (props: HomepageProps) => {
    const { searchParams } = props

    const urlSearchParams = new URLSearchParams(searchParams)

    const farmList = await farmServices.genFarms(urlSearchParams)

    const promotionalfarmList = await farmServices.genPromotionalFarmProducts(
        urlSearchParams
    )

    const posToRenderPromotionalProduct = Math.floor(
        farmList.length / promotionalfarmList.length
    )

    return (
        <>
            <StyledHeading>Farm List</StyledHeading>
            <StyledList>
                {farmList.map((farm, index) => {
                    const currentPosPromotionalProduct = Math.floor(
                        index / posToRenderPromotionalProduct
                    )

                    if (
                        index > 0 &&
                        index % posToRenderPromotionalProduct === 0 &&
                        promotionalfarmList[currentPosPromotionalProduct]
                    ) {
                        return (
                            <StyledListWithPromotionalProduct key={index}>
                                <CardProduct
                                    data={
                                        promotionalfarmList[
                                            Math.floor(
                                                index /
                                                    posToRenderPromotionalProduct
                                            )
                                        ]
                                    }
                                />
                                <CardFarm data={farm} />
                            </StyledListWithPromotionalProduct>
                        )
                    }
                    return <CardFarm key={index} data={farm} />
                })}
            </StyledList>
        </>
    )
}

export default Homepage
