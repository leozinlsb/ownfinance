import styled from "styled-components";

interface TitleProps {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
}

export const Title = styled.h2<TitleProps>`
    font-size: ${props => props.fontSize || 'clamp(16px, 1.5vw, 24px)'};
    font-weight: ${props => props.fontWeight || 'bold'};
    color: ${props => props.color || '#000000'};
`