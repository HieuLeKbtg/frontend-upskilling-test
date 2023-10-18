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

export function Footer() {
    return (
        <StyledFooter>
            <h4>© 2023 Frontend Test By Hieu Le. ALL RIGHTS RESERVED</h4>
        </StyledFooter>
    )
}
