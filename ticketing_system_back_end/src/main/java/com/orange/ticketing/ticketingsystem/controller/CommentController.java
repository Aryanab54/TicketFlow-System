package com.orange.ticketing.ticketingsystem.controller;

import com.orange.ticketing.ticketingsystem.dto.CommentRequest;
import com.orange.ticketing.ticketingsystem.entity.Comment;
import com.orange.ticketing.ticketingsystem.entity.User;
import com.orange.ticketing.ticketingsystem.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets/{ticketId}/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {
    
    private final CommentService commentService;
    
    @PostMapping
    public ResponseEntity<Comment> addComment(@PathVariable Long ticketId,
                                              @Valid @RequestBody CommentRequest request,
                                              @AuthenticationPrincipal User user) {
        try {
            Comment comment = commentService.addComment(ticketId, request, user);
            return ResponseEntity.ok(comment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long ticketId,
                                                     @AuthenticationPrincipal User user) {
        try {
            List<Comment> comments = commentService.getTicketComments(ticketId, user);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}