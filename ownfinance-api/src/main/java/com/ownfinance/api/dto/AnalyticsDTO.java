package com.ownfinance.api.dto;

import lombok.Data;

@Data

public class AnalyticsDTO {

    private String category;
    private String type;
    private String month;
    private double total;

    public AnalyticsDTO(String category, String type, String month, double total) {
        this.category = category;
        this.type = type;
        this.month = month;
        this.total = total;
    }

}
