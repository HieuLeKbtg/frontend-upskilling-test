import {
    AppRouterContext,
    AppRouterInstance
} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { NextRouter } from 'next/router'
import { ReactNode } from 'react'

interface MockNextRouterProps extends Partial<AppRouterInstance> {
    children: ReactNode
}

const createRouter = (params: Partial<NextRouter>) => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '',
    back: cy.spy().as('back'),
    refresh: cy.spy().as('refresh'),
    beforePopState: cy.spy().as('beforePopState'),
    forward: cy.spy().as('forward'), // <---------- added `forward`
    prefetch: cy.stub().as('prefetch').resolves(),
    push: cy.spy().as('push'),
    reload: cy.spy().as('reload'),
    replace: cy.spy().as('replace'),
    events: {
        emit: cy.spy().as('emit'),
        off: cy.spy().as('off'),
        on: cy.spy().as('on')
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    isPreview: false,
    ...params
})

export const MockNextRouter = ({ children, ...props }: MockNextRouterProps) => {
    const router = createRouter(props as unknown) as AppRouterInstance

    return (
        <AppRouterContext.Provider value={router}>
            {children}
        </AppRouterContext.Provider>
    )
}
