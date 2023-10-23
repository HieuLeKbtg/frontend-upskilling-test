'use client'

import { ParsedFarm } from '@libs/types'
import { AppRoutesWithPort } from '@libs/utils'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

type CardFarmProps = {
    data: ParsedFarm
}

const StyledCardFarm = styled.article`
    flex-basis: calc(33.33% - 16px);
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
        transform: scale(1.03);
        border: 1px solid #9bb250;
    }
`

const StyledCardFarmName = styled.h3`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #ff7d55;
`

const StyledCardFarmDescription = styled.p`
    margin-bottom: 16px;
`

const StyledCardFarmTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`

const StyledFarmTag = styled.div`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
`

export function CardFarm(props: CardFarmProps) {
    const { data } = props
    const { name, description, tags, _id } = data
    const router = useRouter()

    // TODO: we could out-source this check empty function to a utils file
    const isDataEmpty =
        !data ||
        Object.keys(data).length === 0 ||
        Object.values(data).every((value) => {
            if (typeof value === 'string') {
                return !value
            }
            if (Array.isArray(value)) {
                return !(value.length > 0)
            }
            return false
        })

    if (isDataEmpty) return null

    return (
        <StyledCardFarm
            onClick={() => router.push(`${AppRoutesWithPort.FARM_PAGE}/${_id}`)}
            data-testid='card-farm'
        >
            <StyledCardFarmName data-testid='card-name'>
                {name}
            </StyledCardFarmName>
            <StyledCardFarmDescription data-testid='card-desc'>
                {description}
            </StyledCardFarmDescription>
            <StyledCardFarmTags data-testid='card-tags'>
                {tags.map((tag, index) => {
                    return <StyledFarmTag key={index}>{tag}</StyledFarmTag>
                })}
            </StyledCardFarmTags>
        </StyledCardFarm>
    )
}
