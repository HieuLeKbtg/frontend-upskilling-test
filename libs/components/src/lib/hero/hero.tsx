'use client'

import { ParsedFarm } from '@libs/types'
import styled from 'styled-components'

export type HeroProps = {
    farmData: ParsedFarm | null
}

const StyledHero = styled.section`
    width: 100%;
    height: 400px;
    background-color: #777;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const StyledHeroHeader = styled.h3`
    font-size: 48px;
    font-weight: 500;
    color: #ff7d55;
    margin-bottom: 16px;
`

const StyledHeroDesc = styled.p`
    font-size: 24px;
    color: #fff;
    margin-bottom: 16px;
`

export const Hero = (props: HeroProps) => {
    const { farmData } = props

    return (
        <StyledHero>
            <StyledHeroHeader>{farmData?.name || 'AgriCart'}</StyledHeroHeader>
            <StyledHeroDesc>
                {farmData?.description ||
                    'AgriCart is a startup building a platform that enables people to explore and order fresh produce from local farms.'}
            </StyledHeroDesc>
        </StyledHero>
    )
}
