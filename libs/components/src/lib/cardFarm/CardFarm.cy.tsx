import { MockNextRouter } from '../../../cypress/support/router.cy'
import { CardFarm } from './CardFarm'

const data = {
    _id: '652dcc16174c3b0c628f5112',
    name: 'Mountain View Apiary',
    description:
        'Local honey and beekeeping supplies from a mountain-view location.',
    tags: ['Local Honey', 'Beekeeping', 'Mountain View']
}

describe('Card Farm Rendering', () => {
    it('should  render card farm successfully', () => {
        cy.mount(
            <MockNextRouter>
                <CardFarm data={data} />
            </MockNextRouter>
        )

        cy.get('[data-testid=card-name]').should('have.text', data.name)
        cy.get('[data-testid=card-desc]').should('have.text', data.description)
        cy.get('[data-testid=card-tags]').should(
            'have.text',
            data.tags.join('')
        )
    })

    it('should not render card farm when data is empty', () => {
        const emptyData = {
            _id: '',
            name: '',
            description: '',
            tags: []
        }

        cy.mount(
            <MockNextRouter>
                <CardFarm data={emptyData} />
            </MockNextRouter>
        )

        cy.get('[data-testid=card-name]').should('not.exist')
        cy.get('[data-testid=card-desc]').should('not.exist')
        cy.get('[data-testid=card-tags]').should('not.exist')
    })
})
