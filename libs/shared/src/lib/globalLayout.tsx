import { Footer, Header, Hero } from '@libs/components'
import { ReactNode } from 'react'

import { StyledMain } from './globaLayout.styled'

type GlobalLayoutProps = {
    children: ReactNode
}

const GlobalLayout = (props: GlobalLayoutProps) => {
    const { children } = props

    return (
        <div id='global-layout' style={{ height: '100vh' }}>
            <Header />
            <Hero />
            <StyledMain>{children}</StyledMain>
            `
            <Footer />
        </div>
    )
}

export default GlobalLayout
