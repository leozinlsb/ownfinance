import styled from "styled-components";
import Logo from "../Logo";
import Icons from "../Icons";

const HeaderContainer = styled.header`
    background-color: #1a3c5a;
    display: flex;
    color: white;
    justify-content: space-between;
    align-items: center;
`
const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
    gap: 10px;
`

function Header() {
    return (
        <HeaderContainer>
            <Logo />
            <ProfileContainer>
                <Icons />
                <p>Usuário</p>
            </ProfileContainer>
        </HeaderContainer>
    )
}

export default Header;