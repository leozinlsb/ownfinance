import styled from "styled-components";
import { Title } from "../Title";


const FormCard = styled.div`
    background-color: white;
    padding: 30px;
    flex: 1;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: block;
    margin: 20px;
`
const FormsContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;ss
`
const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`

const FormRow = styled.div`
    display: flex;
    gap: 20px;
    width: 100%;
`

const StyledInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
`

const StyledSelect = styled.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
`

function TransactionForms() {
    return (
        <FormCard>
            <Title>ADICIONAR NOVA TRANSAÇÃO</Title>
            <FormsContainer>
                <FormRow>
                    <InputGroup>
                        <label htmlFor="description">Descrição</label>
                        <StyledInput type="text" id="description" name="description" placeholder="Digite aqui" />
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="value">Valor</label>
                        <StyledInput type="number" id="value" name="value" placeholder="Digite o valor" />
                    </InputGroup>
                </FormRow>
                <FormRow>
                    <InputGroup>
                        <label htmlFor="date">Data</label>
                        <StyledInput type="date" id="date" name="date" placeholder="Digite a data" />
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="category">Categoria</label>
                        <StyledSelect id="category" name="category">
                            <option value="">Escolha a categoria</option>
                            <option value="alimentacao">Alimentação</option>
                            <option value="transporte">Transporte</option>
                            <option value="moradia">Moradia</option>
                            <option value="lazer">Lazer</option>
                            <option value="saude">Saúde</option>
                            <option value="educacao">Educação</option>
                            <option value="outros">Outros</option>
                        </StyledSelect>
                    </InputGroup>
                </FormRow>
            </FormsContainer>
        </FormCard>
    )
}

export default TransactionForms;