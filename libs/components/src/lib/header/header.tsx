'use client'

import styled from 'styled-components'

const StyledHeader = styled.header`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    background-color: #ddd;
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
    &:hover {
        font-weight: 700;
    }
`

export const Header = () => {
    return (
        <StyledHeader>
            <StyledLogo src='assets/images/logo.png' alt='logo' />
            <StyledLink>Home</StyledLink>
            <StyledLink>Farm</StyledLink>
        </StyledHeader>
    )
}
