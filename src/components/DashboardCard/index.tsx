import styled from "styled-components";

const Card = styled.div`
    background-color: white;
    padding: 30px;
    flex: 1;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
`

const Title = styled.h2`
    font-size: clamp(16px, 1.5vw, 24px);
    font-weight: 600;
    color: #333;
`

const Value = styled.p`
    font-size: clamp(24px, 2.5vw, 36px);
    font-weight: bold;
    color: #000000;
`

const Icon = styled.img`
    width: 100px;
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
        <Card>
            <Icon src={icon} alt="Icon" />
            <div>
                <Title>{title}</Title>
                <Value>{value}</Value>
            </div>
        </Card>
    )
}

export default DashboardCard;