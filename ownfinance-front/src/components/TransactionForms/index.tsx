import styled from "styled-components";
import { Title } from "../Title";
import { FormCard } from "../FormCard"
import { useState } from "react";
import type { Transaction } from "../TransactionHistory"

const FormsContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
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

const RadioContainer = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: row;
`

const RadioOption = styled.div`
    display: flex; 
    gap: 6px;
    align-items: center;
`

const GroupTitle = styled.p`
    font-weight: bold;
`

const StyledLabel = styled.label`
    font-weight: bold;
`

const SubmitButton = styled.button`
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
// Interface used to communicate with parent component
interface TransactionFormsProps {
    onAddTransaction: (newTransaction: Transaction) => void;
}

function TransactionForms({ onAddTransaction }: TransactionFormsProps) {

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        // preventDefault stops the page from reloading when the form is submitted
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        //Creating the transaction object to send it to the backend
        const newTransaction = {
            amount: Number(amount.replace(/\D/g, "")) / 100,
            description: formData.get("description") as string,
            date: formData.get("date") as string,
            category: formData.get("category") as string,
            type: formData.get("transactionType") as string,
            paymentMethod: formData.get("paymentMethod") as string,
            totalInstallment: Number(formData.get("totalInstallment"))
        };

        fetch("http://localhost:8080/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTransaction),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`O servidor recusou a requisição! Status : ${response.status}`);
                }
                return response.json();
            })
            .then(savedTransaction => {
                console.log("Salvo no banco do Java com sucesso: ", savedTransaction)
                onAddTransaction(savedTransaction);
            })
            .catch(error => console.error("Erro ao salvar: ", error));
    }

    //formatting monetary values
    const [amount, setAmount] = useState("");

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value.replace(/\D/g, "");

        if (!rawValue) {
            setAmount("");
            return;
        }

        const numberValue = Number(rawValue) / 100;

        const formattedValue = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(numberValue);

        setAmount(formattedValue);
    };

    const [paymentMethod, setPaymentMethod] = useState("");
    const [transactionType, setTransactionType] = useState("");

    return (
        <FormCard>
            <Title>ADICIONAR NOVA TRANSAÇÃO</Title>
            <FormsContainer onSubmit={handleSubmit}>
                <FormRow>
                    <InputGroup>
                        <StyledLabel htmlFor="description">Descrição</StyledLabel>
                        <StyledInput type="text" id="description" name="description" placeholder="Digite" required/>
                    </InputGroup>
                    <InputGroup>
                        <StyledLabel htmlFor="value">Valor</StyledLabel>
                        <StyledInput type="text" id="value" name="value" placeholder="R$ 0,00" value={amount} onChange={handleAmountChange} required/>
                    </InputGroup>
                </FormRow>
                <FormRow>
                    <InputGroup>
                        <StyledLabel htmlFor="date">Data</StyledLabel>
                        <StyledInput type="date" id="date" name="date" placeholder="Digite a data" required/>
                    </InputGroup>
                    <InputGroup>
                        <StyledLabel htmlFor="category">Categoria</StyledLabel>
                        <StyledSelect id="category" name="category" required>
                            <option value="">Escolha a categoria</option>
                            <option value="alimentacao">Alimentação</option>
                            <option value="transporte">Transporte</option>
                            <option value="moradia">Moradia</option>
                            <option value="lazer">Lazer</option>
                            <option value="saude">Saúde</option>
                            <option value="educacao">Educação</option>
                            <option value="entretenimento">Entretenimento</option>
                            <option value="salario">Salário</option>
                            <option value="outros">Outros</option>
                        </StyledSelect>
                    </InputGroup>
                </FormRow>
                <InputGroup>
                    <GroupTitle>Tipo de transação</GroupTitle>
                    <RadioContainer >
                        <RadioOption>
                            <input type="radio" id="receita" name="transactionType" value="receita" checked={transactionType === "receita"} onChange={(event) => setTransactionType(event.target.value)} required/>
                            <label htmlFor="receita">Receita</label>
                        </RadioOption>
                        <RadioOption>
                            <input type="radio" id="despesa" name="transactionType" value="despesa" checked={transactionType === "despesa"} onChange={(event) => setTransactionType(event.target.value)} required/>
                            <label htmlFor="despesa">Despesa</label>
                        </RadioOption>
                    </RadioContainer>
                </InputGroup>
                {transactionType === "despesa" && (
                    <>
                        <InputGroup>
                            <StyledLabel htmlFor="paymentMethod">Método de Pagamento</StyledLabel>
                            <StyledSelect 
                                id="paymentMethod" 
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={(event) => setPaymentMethod(event.target.value)}
                            >
                                <option value="">Escolha o método</option>
                                <option value="dinheiro">Dinheiro</option>
                                <option value="pix">Pix</option>
                                <option value="credito">Crédito</option>
                                <option value="debito">Débito</option>
                            </StyledSelect>
                        </InputGroup>
                        {paymentMethod === "credito" && (
                            <InputGroup>
                                <StyledLabel htmlFor="totalInstallments">Em quantas parcelas?</StyledLabel>
                                <StyledInput type="number" id="totalInstallments" name="totalInstallments" placeholder="Ex: 10" min="1" max="48" />
                            </InputGroup>
                        )}
                    </>
                )}
                
                <SubmitButton type="submit">Adicionar Transação</SubmitButton>
            </FormsContainer>
        </FormCard>
    )
}

export default TransactionForms;