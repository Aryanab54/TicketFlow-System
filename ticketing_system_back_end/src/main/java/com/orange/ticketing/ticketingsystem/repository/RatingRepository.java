package com.orange.ticketing.ticketingsystem.repository;

import com.orange.ticketing.ticketingsystem.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
}