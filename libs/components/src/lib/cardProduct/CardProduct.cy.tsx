import { ParsedFarmProduct } from '@libs/types'

import { MockNextRouter } from '../../../cypress/support/router.cy'
import { CardProduct } from './CardProduct'

const data: ParsedFarmProduct = {
    _id: '652dcc17174c3b0c628f513a',
    farm_id: '652dcc16174c3b0c628f5112',
    name: 'Peppers',
    price: { num: 12.74, currency: 'USD', currency_symbol: '$' },
    sale_price: { num: 12.49, currency: 'USD', currency_symbol: '$' },
    unit: { num: 3, description: 'ct' },
    tags: ['new'],
    quantity: 'low_stock'
}

describe('Card Product Rendering', () => {
    it('should  render card product successfully', () => {
        cy.mount(
            <MockNextRouter>
                <CardProduct data={data} />
            </MockNextRouter>
        )

        cy.get('[data-testid=card-product-name]').should('have.text', data.name)

        cy.get('[data-testid=card-product-sale-price]')
            .should('exist')
            .should(
                'have.text',
                `${data.sale_price?.currency_symbol}${data.sale_price?.num}`
            )

        cy.get('[data-testid=card-product-original-price]')
            .should(
                'have.text',
                `${data.price.currency_symbol}${data.price.num}`
            )
            .should(
                'have.css',
                'text-decoration',
                'line-through solid rgb(0, 0, 0)'
            )

        cy.get('[data-testid=card-product-unit]').should(
            'have.text',
            `${data.unit.num} ${data.unit.description}`
        )

        cy.get('[data-testid=card-product-tags]').should(
            'have.text',
            data.tags.join('')
        )

        cy.get('[data-testid=card-product-quantity]').should(
            'have.text',
            data.quantity.replace(/_/g, ' ')
        )
    })

    it('should render original price only when sale price is not available', () => {
        const dataWithoutSalePrice: ParsedFarmProduct = {
            ...data,
            sale_price: null
        }

        cy.mount(
            <MockNextRouter>
                <CardProduct data={dataWithoutSalePrice} />
            </MockNextRouter>
        )

        cy.get('[data-testid=card-product-sale-price]').should('not.exist')

        cy.get('[data-testid=card-product-original-price]')
            .should(
                'have.text',
                `${data.price.currency_symbol}${data.price.num}`
            )
            .should('have.css', 'text-decoration', 'none solid rgb(0, 0, 0)')
    })
})
