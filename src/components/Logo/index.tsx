import logoSvg from '../../assets/logo.svg'
import styled from 'styled-components';

const LogoImg = styled.img`
    height: 100px;
    width: auto; 
    object-fit: contain;
    margin-right: 10px;
`

const LogoContainer = styled.div`
    display: flex;
`

function Logo() {
    return (
        <LogoContainer>
            <LogoImg src={logoSvg} alt='Logo Own Finance' />
        </LogoContainer>

    )
}

export default Logo;