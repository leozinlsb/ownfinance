package com.ownfinance.api.repository;

import com.ownfinance.api.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

//interface to handle database operations

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
