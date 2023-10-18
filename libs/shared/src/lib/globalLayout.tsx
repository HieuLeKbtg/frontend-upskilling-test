import 'normalize.css'

import { ReactNode } from 'react'

type GlobalLayoutProps = {
    children: ReactNode
}

const GlobalLayout = (props: GlobalLayoutProps) => {
    const { children } = props

    return <div id='global-layout'>{children}</div>
}

export default GlobalLayout
