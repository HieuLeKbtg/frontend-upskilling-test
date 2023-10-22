'use client'

import { AppRoutesWithPort } from '@libs/utils'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

const StyledHeader = styled.header`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    background: linear-gradient(
        270deg,
        rgb(0, 90, 255) 0%,
        rgb(0, 23, 68) 100%
    );
    padding: 0 16px;
`

const StyledLogo = styled.img`
    width: 64px;
    height: 64px;
    cursor: pointer;
`

const StyledLink = styled.a`
    font-weight: 500;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
    margin-left: 16px;
    letter-spacing: 0.1em;
    &:hover {
        text-shadow: 0px 0px 1px #fff;
    }
`

export const Header = () => {
    const router = useRouter()
    return (
        <StyledHeader>
            <StyledLogo src='assets/images/logo.png' alt='logo' />
            <StyledLink onClick={() => router.push(AppRoutesWithPort.HOME)}>
                Home
            </StyledLink>
        </StyledHeader>
    )
}
