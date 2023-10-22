import 'normalize.css'

import { ReactNode } from 'react'

import CustomProvider from './customProvider'
import GlobalLayout from './globalLayout'

type RootLayoutProps = {
    children: ReactNode
    params: Record<string, string>
}

export function RootLayout(props: RootLayoutProps) {
    const { children, params } = props

    return (
        <html lang='en'>
            <body suppressHydrationWarning>
                <CustomProvider>
                    <GlobalLayout params={params}>{children}</GlobalLayout>
                </CustomProvider>
            </body>
        </html>
    )
}
