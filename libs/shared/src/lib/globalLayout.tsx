import { Footer, Header,Hero } from '@libs/components'
import { ReactNode } from 'react'

type GlobalLayoutProps = {
    children: ReactNode
}

const GlobalLayout = (props: GlobalLayoutProps) => {
    const { children } = props

    return (
        <div id='global-layout' style={{ height: '100vh' }}>
            <Header />
            <Hero />
            {children}
            <Footer />
        </div>
    )
}

export default GlobalLayout
