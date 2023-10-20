'use client'

import { ParsedFarm } from '@libs/types'
import styled from 'styled-components'

export type CardProps = {
    data: ParsedFarm
}

const StyledCard = styled.article`
    flex-basis: calc(33.33% - 15px);
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

const StyledCardName = styled.h3`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #ff7d55;
`

const StyledCardDescription = styled.p`
    margin-bottom: 16px;
`

const StyledCardTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`

const StyledTag = styled.div`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
`

export function Card(props: CardProps) {
    const { name, description, tags } = props.data

    return (
        <StyledCard>
            <StyledCardName>{name}</StyledCardName>
            <StyledCardDescription>{description}</StyledCardDescription>
            <StyledCardTags>
                {tags.map((tag, index) => {
                    return <StyledTag key={index}>{tag}</StyledTag>
                })}
            </StyledCardTags>
        </StyledCard>
    )
}
