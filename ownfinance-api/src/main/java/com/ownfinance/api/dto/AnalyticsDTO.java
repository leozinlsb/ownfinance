package com.ownfinance.api.dto;

import lombok.Data;

@Data

public class AnalyticsDTO {

    private String category;
    private String type;
    private String month;
    private double total;

    public AnalyticsDTO(String month, String category, String type, double total) {
        this.month = month;
        this.category = category;
        this.type = type;
        this.total = total;
    }

}
