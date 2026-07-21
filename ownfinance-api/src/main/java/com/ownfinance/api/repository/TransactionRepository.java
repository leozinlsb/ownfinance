package com.ownfinance.api.repository;

import com.ownfinance.api.dto.AnalyticsDTO;
import com.ownfinance.api.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

//interface to handle database operations

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("SELECT new com.ownfinance.api.dto.AnalyticsDTO(SUBSTRING(t.date, 1, 7), t.category, t.type, SUM(t.amount)) " +
    "FROM Transaction t " +
    "GROUP BY SUBSTRING(t.date, 1, 7), t.category, t.type")
    List<AnalyticsDTO> getAnalyticsSumary();
}
