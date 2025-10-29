package com.orange.ticketing.ticketingsystem.repository;

import com.orange.ticketing.ticketingsystem.entity.Priority;
import com.orange.ticketing.ticketingsystem.entity.Ticket;
import com.orange.ticketing.ticketingsystem.entity.TicketStatus;
import com.orange.ticketing.ticketingsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByCreatedBy(User user);
    List<Ticket> findByAssignedTo(User user);
    List<Ticket> findByStatus(TicketStatus status);
    List<Ticket> findByPriority(Priority priority);
    List<Ticket> findByCreatedByAndStatus(User user, TicketStatus status);
    
    @Query("SELECT t FROM Ticket t WHERE " +
           "LOWER(t.subject) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.createdBy.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.createdBy.lastName) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Ticket> searchTickets(@Param("search") String search);
    
    List<Ticket> findByStatusAndPriority(TicketStatus status, Priority priority);
    List<Ticket> findByAssignedToAndStatus(User assignedTo, TicketStatus status);
    
    @Query("SELECT t FROM Ticket t ORDER BY " +
           "CASE t.priority " +
           "WHEN 'URGENT' THEN 1 " +
           "WHEN 'HIGH' THEN 2 " +
           "WHEN 'MEDIUM' THEN 3 " +
           "WHEN 'LOW' THEN 4 END, t.createdAt DESC")
    List<Ticket> findAllOrderByPriorityAndDate();
}