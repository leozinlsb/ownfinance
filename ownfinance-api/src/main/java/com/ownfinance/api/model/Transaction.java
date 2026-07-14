package com.ownfinance.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // turn it into a table in the Database

@Data // automatically creates Getters and Setters

@NoArgsConstructor // create an empty constructor

@AllArgsConstructor // creates a constructor with all fields filled

public class Transaction {
    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment
    private Long id;

    private String description;

    private String category;

    private double amount;

    private String paymentMethod;

    private Integer installmentNumber;

    private Integer totalIntallments;

    private String date;

    private String type;
}
