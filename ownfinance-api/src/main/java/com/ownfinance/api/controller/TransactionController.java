package com.ownfinance.api.controller;

import com.ownfinance.api.model.Transaction;
import com.ownfinance.api.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

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
    public List<Transaction> save(@RequestBody Transaction transaction) {

        List<Transaction> savedList = new ArrayList<>();

        if (transaction.getTotalInstallments() != null &&  transaction.getTotalInstallments() > 1) { // a single payment means paying in full
            LocalDate initialDate = LocalDate.parse(transaction.getDate()); // parse the string date to a calendar object from Java

            for (int i = 0; i < transaction.getTotalInstallments(); i++) {
                Transaction installment = new Transaction();
                installment.setDescription(transaction.getDescription());
                installment.setCategory(transaction.getCategory());
                installment.setAmount(transaction.getAmount());
                installment.setType(transaction.getType());

                installment.setInstallmentNumber(i + 1);
                installment.setTotalInstallments(transaction.getTotalInstallments());

                installment.setDate(initialDate.plusMonths(i).toString());

                Transaction savedInstallment = repository.save(installment);
                savedList.add(savedInstallment);
            }
            return savedList; //we return the list with all saved installments
        } else {
            if (transaction.getInstallmentNumber() == null) transaction.setInstallmentNumber(1);
            if (transaction.getTotalInstallments() == null) transaction.setTotalInstallments(1);

            Transaction savedSingle = repository.save(transaction);
            savedList.add(savedSingle);

            return savedList;
        }


    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
