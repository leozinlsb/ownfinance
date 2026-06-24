import styled from "styled-components";

const CardContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

const Card = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 10px;
    display: flex;
    align-items: center;
`

const Title = styled.h2`
    font-size: 24px;
    font-weight: 600;
    color: #333;
`

const Value = styled.p`
    font-size: 36px;
    font-weight: bold;
    color: #000000;
`

const Icon = styled.img`
    width: 100px;
    height: 100px;
    object-fit: contain;
    display: flex;
    align-items: center;
    justify-content: center;
`

interface DashboardCardProps {
    title: string;
    value: string;
    icon: string;
}

function DashboardCard({ title, value, icon }: DashboardCardProps) {
    return (
        <CardContainer>
            <Card>
                <Icon src={icon} alt="Icon" />
                <div>
                    <Title>{title}</Title>
                    <Value>{value}</Value>
                </div>
            </Card>
        </CardContainer>
    )
}

export default DashboardCard;