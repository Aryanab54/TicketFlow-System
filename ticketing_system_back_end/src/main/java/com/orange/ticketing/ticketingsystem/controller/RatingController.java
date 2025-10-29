package com.orange.ticketing.ticketingsystem.controller;

import com.orange.ticketing.ticketingsystem.entity.Rating;
import com.orange.ticketing.ticketingsystem.entity.User;
import com.orange.ticketing.ticketingsystem.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets/{ticketId}/rating")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class RatingController {
    
    private final RatingService ratingService;
    
    @PostMapping
    public ResponseEntity<Rating> rateTicket(@PathVariable Long ticketId,
                                           @RequestParam Integer rating,
                                           @RequestParam(required = false) String feedback,
                                           @AuthenticationPrincipal User user) {
        try {
            Rating ticketRating = ratingService.rateTicket(ticketId, rating, feedback, user);
            return ResponseEntity.ok(ticketRating);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}