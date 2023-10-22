import { CardProduct } from '@libs/components'
import { farmServices } from '@libs/services'

import { StyledFarmError, StyledFarmPage } from '../_styled/farmpage.styled'

type FarmPageProps = {
    params: Record<string, string>
}

const FarmPage = async (props: FarmPageProps) => {
    const { params } = props
    const { farmId } = params

    const noProducts = (
        <StyledFarmError>
            There is no farm matched your search, please try again
        </StyledFarmError>
    )

    if (!farmId) {
        return noProducts
    }

    const productsByFarmId = await farmServices.genProductsForFarm(farmId)

    if (!productsByFarmId.length) return noProducts

    return (
        <StyledFarmPage>
            {productsByFarmId.map((product) => {
                return <CardProduct key={product._id} data={product} />
            })}
        </StyledFarmPage>
    )
}

export default FarmPage
