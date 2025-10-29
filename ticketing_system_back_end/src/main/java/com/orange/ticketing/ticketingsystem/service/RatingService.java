package com.orange.ticketing.ticketingsystem.service;

import com.orange.ticketing.ticketingsystem.entity.Rating;
import com.orange.ticketing.ticketingsystem.entity.Ticket;
import com.orange.ticketing.ticketingsystem.entity.User;
import com.orange.ticketing.ticketingsystem.repository.RatingRepository;
import com.orange.ticketing.ticketingsystem.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RatingService {
    
    private final RatingRepository ratingRepository;
    private final TicketRepository ticketRepository;
    
    public Rating rateTicket(Long ticketId, Integer rating, String feedback, User user) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        
        // Only ticket creator can rate
        if (!ticket.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("Only ticket creator can rate");
        }
        
        // Check if ticket is resolved or closed
        if (ticket.getStatus().name().equals("OPEN") || ticket.getStatus().name().equals("IN_PROGRESS")) {
            throw new RuntimeException("Can only rate resolved or closed tickets");
        }
        
        Rating ticketRating = new Rating();
        ticketRating.setRating(rating);
        ticketRating.setFeedback(feedback);
        ticketRating.setTicket(ticket);
        ticketRating.setCreatedBy(user);
        
        return ratingRepository.save(ticketRating);
    }
}