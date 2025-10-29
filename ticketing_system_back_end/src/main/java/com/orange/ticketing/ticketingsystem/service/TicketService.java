package com.orange.ticketing.ticketingsystem.service;

import com.orange.ticketing.ticketingsystem.dto.TicketRequest;
import com.orange.ticketing.ticketingsystem.entity.*;
import com.orange.ticketing.ticketingsystem.repository.TicketRepository;
import com.orange.ticketing.ticketingsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TicketService {
    
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    
    public Ticket createTicket(TicketRequest request, User user) {
        Ticket ticket = new Ticket();
        ticket.setSubject(request.getSubject());
        ticket.setDescription(request.getDescription());
        ticket.setPriority(request.getPriority());
        ticket.setCreatedBy(user);
        ticket.setStatus(TicketStatus.OPEN);
        
        Ticket savedTicket = ticketRepository.save(ticket);
        
        // Send email notification
        try {
            log.info("=== EMAIL DEBUG START ===");
            log.info("User object: {}", user);
            log.info("User email: {}", user != null ? user.getEmail() : "USER IS NULL");
            log.info("EmailService: {}", emailService);
            log.info("Ticket ID: {}, Subject: {}", savedTicket.getId(), savedTicket.getSubject());
            
            if (user != null && user.getEmail() != null && emailService != null) {
                log.info("Calling emailService.sendTicketCreated...");
                emailService.sendTicketCreated(user.getEmail(), savedTicket.getId(), savedTicket.getSubject());
                log.info("Email service call completed");
            } else {
                log.error("Cannot send email - user: {}, email: {}, emailService: {}", 
                    user, user != null ? user.getEmail() : "null", emailService);
            }
            log.info("=== EMAIL DEBUG END ===");
        } catch (Exception e) {
            log.error("Failed to send email notification for ticket #{}: {}", savedTicket.getId(), e.getMessage(), e);
        }
        
        return savedTicket;
    }
    
    public List<Ticket> getUserTickets(User user) {
        if (user.getRole() == Role.ADMIN || user.getRole() == Role.SUPPORT_AGENT) {
            return ticketRepository.findAll(); // Support agents and admins see all tickets
        }
        return ticketRepository.findByCreatedBy(user); // Regular users see only their tickets
    }
    
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }
    
    public List<Ticket> getAssignedTickets(User user) {
        return ticketRepository.findByAssignedTo(user);
    }
    
    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
    }
    
    public Ticket updateTicketStatus(Long ticketId, TicketStatus status, User user) {
        Ticket ticket = getTicketById(ticketId);
        
        // Check permissions
        if (!canModifyTicket(ticket, user)) {
            throw new RuntimeException("Access denied");
        }
        
        ticket.setStatus(status);
        ticket.setUpdatedAt(LocalDateTime.now());
        
        if (status == TicketStatus.RESOLVED || status == TicketStatus.CLOSED) {
            ticket.setResolvedAt(LocalDateTime.now());
        }
        
        Ticket savedTicket = ticketRepository.save(ticket);
        
        // Send email notifications
        try {
            log.info("=== STATUS UPDATE EMAIL DEBUG ===");
            log.info("Status changed to: {}, User email: {}", status, ticket.getCreatedBy().getEmail());
            
            if (status == TicketStatus.RESOLVED) {
                log.info("Sending resolution email...");
                emailService.sendTicketResolved(ticket.getCreatedBy().getEmail(), ticket.getId(), ticket.getSubject());
            } else {
                log.info("Sending status change email...");
                emailService.sendTicketStatusChanged(ticket.getCreatedBy().getEmail(), ticket.getId(), ticket.getSubject(), status.toString());
            }
            log.info("=== STATUS UPDATE EMAIL DEBUG END ===");
        } catch (Exception e) {
            log.error("Failed to send status update email: {}", e.getMessage(), e);
        }
        
        return savedTicket;
    }
    
    public Ticket assignTicket(Long ticketId, Long assigneeId, User user) {
        Ticket ticket = getTicketById(ticketId);
        User assignee = userRepository.findById(assigneeId)
                .orElseThrow(() -> new RuntimeException("Assignee not found"));
        
        // Check permissions
        if (!canAssignTicket(ticket, user)) {
            throw new RuntimeException("Access denied");
        }
        
        ticket.setAssignedTo(assignee);
        ticket.setUpdatedAt(LocalDateTime.now());
        
        Ticket savedTicket = ticketRepository.save(ticket);
        
        // Send email notification to assignee
        try {
            log.info("=== ASSIGNMENT EMAIL DEBUG ===");
            log.info("Assigning ticket #{} to: {} ({})", ticket.getId(), assignee.getUsername(), assignee.getEmail());
            emailService.sendTicketAssigned(assignee.getEmail(), ticket.getId(), ticket.getSubject());
            log.info("Assignment email sent successfully");
            log.info("=== ASSIGNMENT EMAIL DEBUG END ===");
        } catch (Exception e) {
            log.error("Failed to send assignment email: {}", e.getMessage(), e);
        }
        
        return savedTicket;
    }
    

    
    private boolean canModifyTicket(Ticket ticket, User user) {
        return user.getRole() == Role.ADMIN || 
               user.getRole() == Role.SUPPORT_AGENT ||
               ticket.getCreatedBy().getId().equals(user.getId());
    }
    
    private boolean canAssignTicket(Ticket ticket, User user) {
        return user.getRole() == Role.ADMIN || user.getRole() == Role.SUPPORT_AGENT;
    }
    
    public List<Ticket> searchTickets(String search, User user) {
        List<Ticket> allResults = ticketRepository.searchTickets(search);
        
        if (user.getRole() == Role.ADMIN || user.getRole() == Role.SUPPORT_AGENT) {
            return allResults;
        }
        
        return allResults.stream()
                .filter(ticket -> ticket.getCreatedBy().getId().equals(user.getId()))
                .toList();
    }
    
    public List<Ticket> getTicketsByPriority(Priority priority, User user) {
        if (user.getRole() == Role.ADMIN || user.getRole() == Role.SUPPORT_AGENT) {
            return ticketRepository.findByPriority(priority);
        }
        
        return ticketRepository.findByCreatedBy(user).stream()
                .filter(ticket -> ticket.getPriority() == priority)
                .toList();
    }
}