'use client'

import styled from 'styled-components'

const StyledFooter = styled.footer`
    background: #555;
    width: 100%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    margin-top: auto;
`

const StyledFooterContent = styled.h4`
    color: #fff;
    font-weight: 500;
    text-transform: uppercase;
`

export function Footer() {
    return (
        <StyledFooter>
            <StyledFooterContent>
                © 2023 Frontend Test By Hieu Le. ALL RIGHTS RESERVED
            </StyledFooterContent>
        </StyledFooter>
    )
}
