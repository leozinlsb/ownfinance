import styled from "styled-components";
import Logo from "../Logo";
import Settings from "../../assets/settings.svg";
import ProfilePic from "../../assets/usericon.svg";

const HeaderContainer = styled.header`
    background-color: #1a3c5a;
    display: flex;
    color: white;
    justify-content: space-between;
`
const ProfileContainer = styled.img`
    width: 100px;
    height: 100%;
    object-fit: contain;
    cursor: pointer;
`

const SettingsContainer = styled.img`
    width: 100px;
    height: 100%;
    object-fit: contain;
    cursor: pointer;
`

const UserMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const TabsContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: flex-end;
`

const TabButton = styled.button`
    padding: 12px 40px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    border-radius: 12px 12px 0 0;
    transition: all 0.2s ease-in-out;
    background-color: transparent;
    color: #ffffff;
    opacity: 0.6; 

    &.active {
        background-color: #f4f7f9; 
        color: #1a3c5a; 
        opacity: 1; 
    }
    &:hover {
        opacity: 1;
    }
`


interface HeaderContainerProps {
    activeTab: string;
    setActiveTab: (activeTab: string) => void;
}


function Header({ activeTab, setActiveTab }: HeaderContainerProps) {
    const tabs = ['Lancamentos', 'Analises'];

    return (
        <HeaderContainer>
            <Logo />
            <>
                <TabsContainer>
                    {tabs.map(tab => (
                        <TabButton key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>
                            {tab}
                        </TabButton>
                    ))}
                </TabsContainer>
            </>


            <UserMenu>
                <ProfileContainer src={ProfilePic} alt="Profile Pic" />
                <p>Username</p>
                <SettingsContainer src={Settings} alt="Settings" />
            </UserMenu>
        </HeaderContainer>
    )
}

export default Header;