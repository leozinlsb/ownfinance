package com.ownfinance.api.controller;

import com.ownfinance.api.model.Transaction;
import com.ownfinance.api.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        return repository.save(transaction);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
