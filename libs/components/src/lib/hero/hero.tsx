'use client'

import styled from 'styled-components'

export interface HeroProps {}

const StyledHero = styled.section`
    width: 100%;
    height: 400px;
    background-color: #888;
`

export const Hero = () => {
    return <StyledHero>Hero Section here</StyledHero>
}
