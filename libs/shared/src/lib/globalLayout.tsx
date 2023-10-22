import { Footer, Header, Hero } from '@libs/components'
import { farmServices } from '@libs/services'
import { ParsedFarm } from '@libs/types'
import { ReactNode } from 'react'

import { StyledMain } from './globaLayout.styled'

type GlobalLayoutProps = {
    children: ReactNode
    params: Record<string, string>
}

const GlobalLayout = async (props: GlobalLayoutProps) => {
    const { children, params } = props
    const { farmId } = params

    let farmData: ParsedFarm | null = null

    if (farmId) {
        farmData = await farmServices.genFarmById(farmId)
    }

    return (
        <div id='global-layout' style={{ height: '100vh' }}>
            <Header />
            <Hero farmData={farmData} />
            <StyledMain>{children}</StyledMain>
            <Footer />
        </div>
    )
}

export default GlobalLayout
