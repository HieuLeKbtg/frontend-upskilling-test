'use client'

import styled from 'styled-components'

export const StyledList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 64px;
`

export const StyledHeading = styled.h1`
    font-size: 48px;
    font-weight: 700;
    color: #00205c;
    margin-bottom: 32px;
`

export const StyledListWithPromotionalProduct = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    flex-basis: calc(66.66666667% - 16px);
    article {
        flex-basis: calc(50% - 8px);
    }
`
