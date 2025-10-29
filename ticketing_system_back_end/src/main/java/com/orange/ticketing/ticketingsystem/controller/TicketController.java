package com.orange.ticketing.ticketingsystem.controller;

import com.orange.ticketing.ticketingsystem.dto.TicketRequest;
import com.orange.ticketing.ticketingsystem.entity.Priority;
import com.orange.ticketing.ticketingsystem.entity.Rating;
import com.orange.ticketing.ticketingsystem.entity.Ticket;
import com.orange.ticketing.ticketingsystem.entity.TicketStatus;
import com.orange.ticketing.ticketingsystem.entity.User;
import com.orange.ticketing.ticketingsystem.service.TicketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TicketController {
    
    private final TicketService ticketService;
    
    @PostMapping
    public ResponseEntity<Ticket> createTicket(@Valid @RequestBody TicketRequest request,
                                               @AuthenticationPrincipal User user) {
        System.out.println("=== TICKET CREATION DEBUG ===");
        System.out.println("User: " + (user != null ? user.getUsername() + " (" + user.getEmail() + ")" : "null"));
        System.out.println("Request: " + request.getSubject());
        System.out.println("About to call ticketService.createTicket...");
        
        Ticket ticket = ticketService.createTicket(request, user);
        
        System.out.println("Created ticket ID: " + ticket.getId());
        System.out.println("=== END DEBUG ===");
        
        return ResponseEntity.ok(ticket);
    }
    
    @GetMapping
    public ResponseEntity<List<Ticket>> getTickets(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        try {
            List<Ticket> tickets = ticketService.getUserTickets(user);
            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    
    @GetMapping("/my")
    public ResponseEntity<List<Ticket>> getMyTickets(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        try {
            List<Ticket> tickets = ticketService.getUserTickets(user);
            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    
    @GetMapping("/assigned")
    public ResponseEntity<List<Ticket>> getAssignedTickets(@AuthenticationPrincipal User user) {
        List<Ticket> tickets = ticketService.getAssignedTickets(user);
        return ResponseEntity.ok(tickets);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicket(@PathVariable Long id,
                                            @AuthenticationPrincipal User user) {
        try {
            Ticket ticket = ticketService.getTicketById(id);
            return ResponseEntity.ok(ticket);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Ticket> updateTicketStatus(@PathVariable Long id,
                                                     @RequestParam TicketStatus status,
                                                     @AuthenticationPrincipal User user) {
        try {
            Ticket ticket = ticketService.updateTicketStatus(id, status, user);
            return ResponseEntity.ok(ticket);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}/assign")
    public ResponseEntity<Ticket> assignTicket(@PathVariable Long id,
                                               @RequestParam Long assigneeId,
                                               @AuthenticationPrincipal User user) {
        try {
            Ticket ticket = ticketService.assignTicket(id, assigneeId, user);
            return ResponseEntity.ok(ticket);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Ticket>> searchTickets(@RequestParam String q,
                                                     @AuthenticationPrincipal User user) {
        try {
            List<Ticket> tickets = ticketService.searchTickets(q, user);
            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<Ticket>> getTicketsByPriority(@PathVariable Priority priority,
                                                           @AuthenticationPrincipal User user) {
        try {
            List<Ticket> tickets = ticketService.getTicketsByPriority(priority, user);
            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{id}/rating")
    public ResponseEntity<Rating> getTicketRating(@PathVariable Long id) {
        try {
            Ticket ticket = ticketService.getTicketById(id);
            if (ticket.getRating() != null) {
                return ResponseEntity.ok(ticket.getRating());
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    

    

}