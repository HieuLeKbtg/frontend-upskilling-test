'use client'

import { ParsedFarmProduct } from '@libs/types'
import { AppRoutesWithPort } from '@libs/utils'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

const StyledCardProduct = styled.article`
    flex-basis: calc(33.33% - 16px);
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: all 0.3s;
    cursor: pointer;
    position: relative;
    &:hover {
        transform: scale(1.03);
        border: 1px solid #9bb250;
    }
`

const StyledCardProductName = styled.h3`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #ff7d55;
`

const StyledCardProductPriceSection = styled.div`
    margin-bottom: 8px;
`

const StyledCardProductPrice = styled.h4`
    display: flex;
    font-weight: bold;
`

const StyledCardProductSalePrice = styled.span`
    color: #d70018;
    margin-right: 24px;
`

const StyledCardProductOriginalPrice = styled.span<{ $isSaled: boolean }>`
    text-decoration: ${({ $isSaled }) => ($isSaled ? 'line-through' : 'auto')};
`

// const StyledCardProductDescription = styled.p`
//     margin-bottom: 16px;
// `

const StyledCardProductUnit = styled.p`
    // font-size: 14px;
`

const StyledCardProductTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`

const StyledProductTag = styled.div`
    color: #00b9f2;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
`

const StyledProductQuantity = styled.div`
    font-weight: 500;
    font-style: italic;
    text-transform: capitalize;
    text-align: right;
    margin-top: auto;
    color: #418703;
    position: absolute;
    bottom: 20px;
    right: 20px;
`

type CardProductProps = {
    data: ParsedFarmProduct
}

export function CardProduct(props: CardProductProps) {
    const { data } = props
    const { name, price, sale_price, unit, tags, quantity, _id } = data
    const router = useRouter()

    return (
        <StyledCardProduct
            onClick={() =>
                router.push(`${AppRoutesWithPort.PRODUCT_PAGE}/${_id}`)
            }
        >
            <StyledCardProductName>{name}</StyledCardProductName>

            <StyledCardProductPriceSection>
                <StyledCardProductPrice>
                    {sale_price && (
                        <StyledCardProductSalePrice>
                            {sale_price.currency_symbol}
                            {sale_price.num}
                        </StyledCardProductSalePrice>
                    )}

                    <StyledCardProductOriginalPrice $isSaled={!!sale_price}>
                        {price.currency_symbol}
                        {price.num}
                    </StyledCardProductOriginalPrice>
                </StyledCardProductPrice>
            </StyledCardProductPriceSection>

            <StyledCardProductUnit>
                {unit.num} {unit.description}
            </StyledCardProductUnit>

            <StyledCardProductTags>
                {tags.map((tag, index) => {
                    return (
                        <StyledProductTag key={index}>{tag}</StyledProductTag>
                    )
                })}
            </StyledCardProductTags>

            <StyledProductQuantity>
                {quantity.replace(/_/g, ' ')}
            </StyledProductQuantity>
        </StyledCardProduct>
    )
}
