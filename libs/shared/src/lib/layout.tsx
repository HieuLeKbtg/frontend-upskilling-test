import 'normalize.css'

import { ReactNode } from 'react'

import CustomProvider from './customProvider'
import GlobalLayout from './globalLayout'

export async function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='en'>
            <body suppressHydrationWarning>
                <CustomProvider>
                    <GlobalLayout>{children}</GlobalLayout>
                </CustomProvider>
            </body>
        </html>
    )
}
