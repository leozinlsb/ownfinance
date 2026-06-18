import styled from "styled-components";
import user from '../../assets/usericon.svg';
import settings from '../../assets/settings.svg';

const IconsArray = [user, settings]

const Icones = styled.img`
    margin-right: 40px;
    width: 25px;
    height: 25px; 
    object-fit: contain;
`

const IconContainer = styled.li`
    display: flex;
    align-items: center;
`


function Icons() {
    return (
        <IconContainer>
            {IconsArray.map((icone) => (
                <Icones src={icone} alt='Ícone' />
            ))}
        </IconContainer>
    )
}

export default Icons;
