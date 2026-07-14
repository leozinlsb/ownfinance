package com.ownfinance.api.controller;

import com.ownfinance.api.model.Transaction;
import com.ownfinance.api.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionRepository repository;

    @GetMapping
    public List<Transaction> list() {
        return repository.findAll();
    }

    @PostMapping
    public Transaction save(@RequestBody Transaction transaction) {
        if (transaction.getTotalIntallments() != null &&  transaction.getTotalIntallments() > 1) { // a single payment means paying in full
            LocalDate initialDate = LocalDate.parse(transaction.getDate()); // parse the string date to a calendar object from Java

            for (int i = 0; i < transaction.getTotalIntallments(); i++) {
                Transaction installment = new Transaction();
                installment.setDescription(transaction.getDescription());
                installment.setCategory(transaction.getCategory());
                installment.setAmount(transaction.getAmount());
                installment.setType(transaction.getType());

                installment.setInstallmentNumber(i + 1);
                installment.setTotalIntallments(transaction.getTotalIntallments());

                installment.setDate(initialDate.plusMonths(i).toString());

                repository.save(installment);
            }
            return transaction; //we revert the original response to React so it knows it worked
        } else {
            if (transaction.getInstallmentNumber() == null) transaction.setInstallmentNumber(1);
            if (transaction.getTotalIntallments() == null) transaction.setTotalIntallments(1);

            return repository.save(transaction);
        }


    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
