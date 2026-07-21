import styled from "styled-components";

export const StyledSelect = styled.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
`

export const StyledLabel = styled.label`
    font-weight: bold;
`

export const StyledInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
`

export const SubmitButton = styled.button`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    &:hover {
        background-color: #007bff;
        color: white;
    }
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`