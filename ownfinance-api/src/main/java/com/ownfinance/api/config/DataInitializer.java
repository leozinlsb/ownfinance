package com.ownfinance.api.config;

import com.ownfinance.api.model.Transaction;
import com.ownfinance.api.repository.TransactionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(TransactionRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                List<Transaction> seedTransactions = List.of(
                        // === MÊS 05 (MAIO) ===
                        new Transaction(null, "Supermercado", "Alimentação", 450.0, "Cartão de Crédito", 1, 1, "2026-05-10", "despesa"),
                        new Transaction(null, "Aluguel", "Moradia", 1200.0, "PIX", 1, 1, "2026-05-05", "despesa"),
                        new Transaction(null, "Cinema e Jantar", "Lazer", 200.0, "Cartão de Crédito", 1, 1, "2026-05-15", "despesa"),
                        new Transaction(null, "Salário Mensal", "Salário", 5000.0, "PIX", 1, 1, "2026-05-01", "receita"),
                        // === MÊS 06 (JUNHO) ===
                        new Transaction(null, "Feira Semanal", "Alimentação", 600.0, "Cartão de Crédito", 1, 1, "2026-06-12", "despesa"),
                        new Transaction(null, "Aluguel", "Moradia", 1200.0, "PIX", 1, 1, "2026-06-05", "despesa"),
                        new Transaction(null, "Parque de Diversões", "Lazer", 150.0, "PIX", 1, 1, "2026-06-20", "despesa"),
                        new Transaction(null, "Salário Mensal", "Salário", 5000.0, "PIX", 1, 1, "2026-06-01", "receita"),
                        // === MÊS 07 (JULHO) ===
                        new Transaction(null, "Restaurantes", "Alimentação", 520.0, "Cartão de Crédito", 1, 1, "2026-07-08", "despesa"),
                        new Transaction(null, "Aluguel", "Moradia", 1200.0, "PIX", 1, 1, "2026-07-05", "despesa"),
                        new Transaction(null, "Show de Música", "Lazer", 300.0, "Cartão de Crédito", 1, 1, "2026-07-18", "despesa"),
                        new Transaction(null, "Combustível", "Transporte", 250.0, "Cartão de Débito", 1, 1, "2026-07-22", "despesa"),
                        new Transaction(null, "Salário Mensal", "Salário", 5500.0, "PIX", 1, 1, "2026-07-01", "receita")
                );

                repository.saveAll(seedTransactions);
                System.out.println("Banco falso populado com sucesso");
            }
        };
    }
}
