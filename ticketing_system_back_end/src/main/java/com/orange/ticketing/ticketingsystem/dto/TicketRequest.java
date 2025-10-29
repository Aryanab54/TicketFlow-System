package com.orange.ticketing.ticketingsystem.dto;

import com.orange.ticketing.ticketingsystem.entity.Priority;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TicketRequest {
    @NotBlank
    private String subject;
    
    @NotBlank
    private String description;
    
    private Priority priority = Priority.MEDIUM;
}