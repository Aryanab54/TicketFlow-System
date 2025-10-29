package com.orange.ticketing.ticketingsystem.service;

import com.orange.ticketing.ticketingsystem.dto.CommentRequest;
import com.orange.ticketing.ticketingsystem.entity.Comment;
import com.orange.ticketing.ticketingsystem.entity.Role;
import com.orange.ticketing.ticketingsystem.entity.Ticket;
import com.orange.ticketing.ticketingsystem.entity.User;
import com.orange.ticketing.ticketingsystem.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    
    private final CommentRepository commentRepository;
    private final TicketService ticketService;
    
    public Comment addComment(Long ticketId, CommentRequest request, User user) {
        Ticket ticket = ticketService.getTicketById(ticketId);
        
        // Check if user can comment on this ticket
        if (!canCommentOnTicket(ticket, user)) {
            throw new RuntimeException("Access denied");
        }
        
        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setTicket(ticket);
        comment.setCreatedBy(user);
        
        return commentRepository.save(comment);
    }
    
    public List<Comment> getTicketComments(Long ticketId, User user) {
        Ticket ticket = ticketService.getTicketById(ticketId);
        
        // Check if user can view comments on this ticket
        if (!canViewTicketComments(ticket, user)) {
            throw new RuntimeException("Access denied");
        }
        
        return commentRepository.findByTicketOrderByCreatedAtAsc(ticket);
    }
    
    private boolean canCommentOnTicket(Ticket ticket, User user) {
        return user.getRole() == Role.ADMIN ||
               user.getRole() == Role.SUPPORT_AGENT ||
               ticket.getCreatedBy().getId().equals(user.getId()) ||
               (ticket.getAssignedTo() != null && ticket.getAssignedTo().getId().equals(user.getId()));
    }
    
    private boolean canViewTicketComments(Ticket ticket, User user) {
        return canCommentOnTicket(ticket, user);
    }
}