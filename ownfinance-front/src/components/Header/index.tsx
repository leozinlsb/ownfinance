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
                <div>
                    {tabs.map(tab => (
                        <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>
                            {tab}
                        </button>
                    ))}
                </div>
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